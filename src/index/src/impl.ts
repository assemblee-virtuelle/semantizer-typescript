import { Dataset, Semantizer } from "@semantizer/types";
import { BlankNode, Literal, NamedNode } from "@rdfjs/types";
import { Index, IndexEntry, IndexShape, IndexShapeProperty } from "./types";
import dataFactory from "@rdfjs/data-model"; // should not depend here
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
    TBase extends new(...args: any[]) => Dataset
>(Base: TBase) {

    return class IndexImpl extends Base implements Index {

        public forEachEntry(callbackfn: (value: IndexEntry, index?: number, array?: IndexEntry[]) => void): void {
            this.forEachThing(thing => callbackfn(this.getSemantizer().build(indexEntryFactory, thing)), 'https://ns.inria.fr/idx/terms#IndexEntry');
        }

        public async findTargetsRecursively(shape: IndexShape, callbackfn: (target: Dataset) => void, limit?: number): Promise<void> {
            let foundTargetCount: number = 0;
            const limitCount: number = limit? limit: 30;

            // TODO: move to a Strategy pattern?
            const execute = async (index: Index) => {
                if (foundTargetCount < limitCount - 1) {
                    index.forEachEntry(async (entry) => {
                        // await entry.load(entry.getShape());

                        const comparisonResult = entry.compareShape(shape);

                        if (comparisonResult === 1) {
                            callbackfn(entry.getTarget());
                            foundTargetCount++;
                        }

                        else if (comparisonResult === 0 && entry.hasSubIndex()) {
                            const subIndex = entry.getSubIndex();
                            await subIndex.load(); // can be moved line 1: dataset.load()?
                            await execute(subIndex);
                        }
                    });
                }
            }

            await execute(this);
        }

    }
    
}

export function indexFactory(semantizer: Semantizer) {
    const _DatasetImpl = semantizer.getDatasetImpl();
    return semantizer.getFactory(IndexMixin, _DatasetImpl);
}

export function IndexEntryMixin<
    TBase extends new(...args: any[]) => Dataset
>(Base: TBase) {

    return class IndexEntryImpl extends Base implements IndexEntry {

        public compareShape(shape: IndexShape): number {
            return this.getShape().compares(shape);
        }

        // TODO: rewrite
        public hasSubIndex(): boolean {
            const subIndex = this.getObject('https://ns.inria.fr/idx/terms#hasSubIndex');
            return (subIndex.getUri() !== undefined && subIndex.getUri() !== "");
        }

        public getTarget(): Dataset {
            return this.getObject('https://ns.inria.fr/idx/terms#hasTarget');
        }

        public getSubIndex(): Index {
            const dataset = this.getObject('https://ns.inria.fr/idx/terms#hasSubIndex');
            return this.getSemantizer().build(indexFactory, dataset);
        }

        public getShape(): IndexShape {
            const dataset = this.getObject('https://ns.inria.fr/idx/terms#hasShape');
            return this.getSemantizer().build(indexShapeFactory, dataset);
        }

    }
    
}

export function indexEntryFactory(semantizer: Semantizer) {
    const _DatasetImpl = semantizer.getDatasetImpl();
    return semantizer.getFactory(IndexEntryMixin, _DatasetImpl);
}

export function IndexShapeMixin<
    TBase extends new(...args: any[]) => Dataset
>(Base: TBase) {

    return class IndexEntryShapeImpl extends Base implements IndexShape {

        public getRdfTypeProperty(): IndexShapeProperty {
            for (const p of this.getPropertiesAll()) {
                if (p.getPath().value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') {
                    return p;
                }
            }
            throw new Error("No Rdf type property was found.");
        }
        
        public getFilterProperty(): IndexShapeProperty {
            for (const p of this.getPropertiesAll()) {
                if (p.getPath().value !== 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') {
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
                    dataFactory.namedNode(this.getUri()!),
                    dataFactory.namedNode('https://www.w3.org/ns/shacl#property'), 
                    property
                )
            );
            this.add(
                dataFactory.quad(
                    dataFactory.namedNode(this.getUri()!),
                    dataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), 
                    dataFactory.namedNode("https://www.w3.org/ns/shacl#NodeShape")
                )
            );
        }

        public getPropertiesAll(): IndexShapeProperty[] {
            const properties = this.getObjectAll('https://www.w3.org/ns/shacl#property');
            return properties.map(p => this.getSemantizer().build(indexShapePropertyFactory, p));
        }

    }

}

export function indexShapeFactory(semantizer: Semantizer) {
    const _DatasetImpl = semantizer.getDatasetImpl();
    return semantizer.getFactory(IndexShapeMixin, _DatasetImpl);
}

export function IndexShapePropertyMixin<
    TBase extends new(...args: any[]) => Dataset
>(Base: TBase) {

    return class IndexEntryShapePropertyImpl extends Base implements IndexShapeProperty {
        
        public getValue(): BlankNode | Literal | NamedNode {
            const object = this.getObject("https://www.w3.org/ns/shacl#hasValue")
            return dataFactory.namedNode(object.getUri()!);
        }
        
        public getPath(): NamedNode {
            const object = this.getObject("https://www.w3.org/ns/shacl#path")
            return dataFactory.namedNode(object.getUri()!);
        }

        public hasSamePath(other: IndexShapeProperty): boolean {
            return this.getPath() === other.getPath();
        }
        
        public hasSameValue(other: IndexShapeProperty): boolean {
            return this.getValue() === other.getValue();
        }

        public equals(other: IndexShapeProperty): boolean {
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
    const _DatasetImpl = semantizer.getDatasetImpl();
    return semantizer.getFactory(IndexShapePropertyMixin, _DatasetImpl);
}