import { Dataset, DatasetSemantizer, DatasetSemantizerMixinConstructor, Semantizer } from "@semantizer/types";
import { BlankNode, Literal, NamedNode } from "@rdfjs/types";
import { Index, IndexEntry, IndexShape, IndexShapeProperty } from "./types";
import { DatasetCore } from "@rdfjs/types"; // TODO: PB when removed

const namespaces = {
    idx: "https://ns.inria.fr/idx/terms#",
    sh: "https://www.w3.org/ns/shacl#"
}

const context = {
    closed: namespaces.sh + 'closed',
    hasShape: namespaces.idx + 'hasShape',
    hasSubIndex: namespaces.idx + 'hasSubIndex'
}

export function IndexMixin<
    TBase extends DatasetSemantizerMixinConstructor
>(Base: TBase) {

    return class IndexMixinImpl extends Base implements Index {

        public async forEachEntry(callbackfn: (value: IndexEntry, index?: number, array?: IndexEntry[]) => Promise<void>): Promise<void> {
            const indexEntryType = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode('https://ns.inria.fr/idx/terms#IndexEntry');
            this.forEachSubGraph(async (subGraph) => {
                if (subGraph.isRdfTypeOf(indexEntryType)) {
                    await callbackfn(this.getSemantizer().build(indexEntryFactory, subGraph));
                }
            });
        }

        public async findTargetsRecursively(shape: IndexShape, callbackfn: (target: DatasetSemantizer) => void, limit?: number): Promise<void> {
            let foundTargetCount: number = 0;
            const limitCount: number = limit? limit: 30;

            // TODO: move to a Strategy pattern?
            const execute = async (index: Index) => {
                if (foundTargetCount < limitCount - 1) {
                    // await index.load();
                    await index.forEachEntry(async (entry) => {
                        if (foundTargetCount < limitCount - 1) {
                        // for await (const entry of index.forEachEntry(async (entry) => {
                            const comparisonResult = entry.compareShape(shape);

                            if (comparisonResult === 1) {
                                const target = entry.getTarget();
                                if (target) {
                                    callbackfn(target);
                                    foundTargetCount++;
                                }
                                else {
                                    const subIndex = entry.getSubIndex();
                                    if (subIndex) {
                                        try {
                                            await subIndex.load();
                                            await execute(subIndex);
                                        }
                                        catch(e) { console.error("Error while loading " + subIndex.getOrigin()?.value) }
                                    } else { console.error("No subIndexFound for potencial result source.") }
                                }
                            }

                            else if (comparisonResult === 0 && entry.hasSubIndex()) {
                                const subIndex = entry.getSubIndex();
                                if (subIndex) {
                                    try {
                                        await subIndex.load(); // can be moved line 1: dataset.load()?
                                        await execute(subIndex);
                                    }
                                    catch(e) { console.warn("Error while loading " + subIndex.getOrigin()?.value) }
                                }
                            }
                        }
                    });
                }
            }

            await execute(this);
        }

    }
    
}

export function indexFactory(semantizer: Semantizer) {
    return semantizer.getMixinFactory(IndexMixin);
}

export function IndexEntryMixin<
    TBase extends DatasetSemantizerMixinConstructor
>(Base: TBase) {

    return class IndexEntryMixinImpl extends Base implements IndexEntry {

        public compareShape(shape: IndexShape): number {
            const thisShape = this.getShape();
            if (!thisShape)
                throw new Error("The entry does not have a shape.");
            return thisShape.compares(shape);
        }

        // TODO: rewrite
        public hasSubIndex(): boolean {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode('https://ns.inria.fr/idx/terms#hasSubIndex');
            return this.getLinkedObject(predicate) !== undefined;
        }

        public getTarget(): DatasetSemantizer | undefined {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode('https://ns.inria.fr/idx/terms#hasTarget');
            return this.getLinkedObject(predicate);
        }

        public getSubIndex(): Index | undefined {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode('https://ns.inria.fr/idx/terms#hasSubIndex');
            const dataset = this.getLinkedObject(predicate);
            return dataset ? this.getSemantizer().build(indexFactory, dataset): undefined;
        }

        public getShape(): IndexShape | undefined {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode('https://ns.inria.fr/idx/terms#hasShape');
            const dataset = this.getLinkedObject(predicate);
            return dataset ? this.getSemantizer().build(indexShapeFactory, dataset) : undefined;
        }

    }
    
}

export function indexEntryFactory(semantizer: Semantizer) {
    return semantizer.getMixinFactory(IndexEntryMixin);
}

export function IndexShapeMixin<
    TBase extends DatasetSemantizerMixinConstructor
>(Base: TBase) {

    return class IndexShapeMixinImpl extends Base implements IndexShape {

        public getRdfTypeProperty(): IndexShapeProperty {
            for (const p of this.getPropertiesAll()) {
                const path = p.getPath();
                if (path && path.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') {
                    return p;
                }
            }
            throw new Error("No Rdf type property was found.");
        }
        
        public getFilterProperty(): IndexShapeProperty {
            for (const p of this.getPropertiesAll()) {
                const path = p.getPath();
                if (path && path.value !== 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') {
                    return p;
                }
            }
            throw new Error("No filter property was found.");
        }

        /**
         * 
         * @param other 
         * @returns -2 if the targeted RDF types are different, -1 if the targeted RDF types 
         * are equals but the targeted values path are different, 0 if the targeted RDF types 
         * are equals and the targeted values path are equals, and 1 if the targeted RDF types 
         * are equals and the targeted values are equals.
         */
        public compares(other: IndexShape): number {
            if (!this.getRdfTypeProperty().equals(other.getRdfTypeProperty())) {
                return -2;
            }
            return this.getFilterProperty().compares(other.getFilterProperty());
        }
        
        public countProperties(): number {
            throw new Error("Method not implemented.");
        }
        
        public forEachProperty(callbackfn: (value: IndexShapeProperty, index?: number | undefined, array?: IndexShapeProperty[] | undefined) => void): void {
            this.getPropertiesAll().forEach(p => callbackfn(p));
        }

        public addProperty(path: NamedNode, value: NamedNode | Literal | BlankNode): void {
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();
            const property = dataFactory.blankNode();
            this.add(
                dataFactory.quad(
                    property,
                    dataFactory.namedNode('https://www.w3.org/ns/shacl#path'),
                    path
                )
            );
            this.add(
                dataFactory.quad(
                    property,
                    dataFactory.namedNode('https://www.w3.org/ns/shacl#hasValue'),
                    value
                )
            );
            this.add(
                dataFactory.quad(
                    this.getOrigin()!,
                    dataFactory.namedNode('https://www.w3.org/ns/shacl#property'), 
                    property
                )
            );
            this.add(
                dataFactory.quad(
                    this.getOrigin()!,
                    dataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), 
                    dataFactory.namedNode("https://www.w3.org/ns/shacl#NodeShape")
                )
            );
        }

        public getPropertiesAll(): IndexShapeProperty[] {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode('https://www.w3.org/ns/shacl#property');
            const properties = this.getLinkedObjectAll(predicate);
            return properties.map(p => this.getSemantizer().build(indexShapePropertyFactory, p));
        }

    }

}

export function indexShapeFactory(semantizer: Semantizer) {
    return semantizer.getMixinFactory(IndexShapeMixin);
}

export function IndexShapePropertyMixin<
    TBase extends DatasetSemantizerMixinConstructor
>(Base: TBase) {

    return class IndexShapePropertyMixinImpl extends Base implements IndexShapeProperty {
        
        public getValue(): BlankNode | Literal | NamedNode | undefined {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode('https://www.w3.org/ns/shacl#hasValue');
            const object = this.getLinkedObject(predicate);
            return object ? object.getOrigin()! : undefined;
        }
        
        // TODO: check return type (no blank node)
        public getPath(): NamedNode | undefined {
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode('https://www.w3.org/ns/shacl#path');
            const object = this.getLinkedObject(predicate)
            return object ? object.getOrigin()! as NamedNode : undefined;
        }

        public hasSamePath(other: IndexShapeProperty): boolean {
            return this.getPath()?.equals(other.getPath()) ?? false;
        }
        
        public hasSameValue(other: IndexShapeProperty): boolean {
            return this.getValue()?.equals(other.getValue()) ?? false;
        }

        public equals(other: IndexShapeProperty): boolean {
            const path = this.hasSamePath(other);
            const value = this.hasSameValue(other);
            return this.hasSamePath(other) && this.hasSameValue(other);
        }
        
        /**
         * 
         * @param other 
         * @returns -1 if both paths and values are different, 0 if paths are the same 
         * but values are different, and 1 if both paths and values are equals.
         */
        public compares(other: IndexShapeProperty): number {
            const result = this.hasSamePath(other)? 0: -1;
            return (result === 0 && this.hasSameValue(other))? 1: result;
        }

    }

}

export function indexShapePropertyFactory(semantizer: Semantizer) {
    return semantizer.getMixinFactory(IndexShapePropertyMixin);
}