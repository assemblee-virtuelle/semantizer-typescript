import { Dataset, Quad, Term, DatasetSemantizer, DatasetSemantizerMixinConstructor, Semantizer, Stream } from "@semantizer/types";
import { BlankNode, Literal, NamedNode } from "@rdfjs/types";
import { Index, IndexEntry, IndexShape, IndexShapeProperty } from "./types";
import { DatasetCore } from "@rdfjs/types"; // TODO: PB when removed
import { Transform, Readable } from "stream";

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

        public async loadEntryStream(): Promise<Readable> {
            const quadStream = await this.loadQuadStream();
            const datasets: DatasetSemantizer[] = [];
            const shapes: { [key:string]: NamedNode | BlankNode } = {};
            const properties: { [key:string]: NamedNode | BlankNode } = {};
            const semantizer = this.getSemantizer();

            const indexEntryType = semantizer.getConfiguration().getRdfDataModelFactory().namedNode('https://ns.inria.fr/idx/terms#IndexEntry');
            const shapePropertyPredicate = semantizer.getConfiguration().getRdfDataModelFactory().namedNode('https://www.w3.org/ns/shacl#property');
            const hasShapePredicate = semantizer.getConfiguration().getRdfDataModelFactory().namedNode('https://ns.inria.fr/idx/terms#hasShape');
            const hasTargetPredicate = semantizer.getConfiguration().getRdfDataModelFactory().namedNode('https://ns.inria.fr/idx/terms#hasTarget');
            const hasSubIndexPredicate = semantizer.getConfiguration().getRdfDataModelFactory().namedNode('https://ns.inria.fr/idx/terms#hasSubIndex');

            const entryStream = new Transform({
                objectMode: true,

                transform(quad: Quad, encoding, callback) {
                    if (quad.subject.termType === 'NamedNode' || quad.subject.termType === 'BlankNode') {
                        let dataset = datasets.find(d => d.getOrigin()?.equals(quad.subject));
                        
                        if (!dataset) {
                            dataset= semantizer.build();
                            dataset.setOrigin(quad.subject);
                            datasets.push(dataset);
                        }

                        dataset.add(quad);

                        if (quad.predicate.equals(hasShapePredicate)) {
                            shapes[quad.subject.value] = quad.object as NamedNode | BlankNode;
                        }

                        if (quad.predicate.equals(shapePropertyPredicate)) {
                            properties[quad.subject.value] = quad.object as NamedNode | BlankNode;
                        }

                        // charger les objets liés à l'entry s'ils sont dans le document (named node ou blank node)
                        // si l'entry a un hasSubIndex, le hasValue n'à pas de valeur
                        // si l'entry a un hasTarget, le hasValue doit être présent

                        const isEntry = dataset.isRdfTypeOf(indexEntryType);
                        const hasShape = isEntry && dataset.some(q => q.predicate.equals(hasShapePredicate));
                        const hasSubIndex = hasShape && dataset.some(q => q.predicate.equals(hasSubIndexPredicate));
                        const hasTarget = hasShape && !hasSubIndex && dataset.some(q => q.predicate.equals(hasTargetPredicate));

                        const addLinkedObjects = (d: DatasetSemantizer) => {
                            for (const q of d) {
                                const object = q.object;
                                if (object.termType === 'NamedNode' || object.termType === "BlankNode") {
                                    const objectDataset = datasets.find(d => d.getOrigin()?.equals(object));
                                    if (objectDataset) {
                                        dataset.addAll(objectDataset);
                                        addLinkedObjects(objectDataset);
                                    }
                                }
                            }
                        }

                        if (isEntry && hasShape && (hasSubIndex || hasTarget)) {
                            addLinkedObjects(dataset);
                            const entry = semantizer.build(indexEntryFactory, dataset);
                            this.push(entry);
                        }
                    }
                  callback();
                }
            });

            // @ts-ignore
            return quadStream.pipe(entryStream);
        }

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
                return new Promise<void>(async (resolve, reject) => {
                    if (foundTargetCount < limitCount - 1) {
                        const entryStream = await index.loadEntryStream();

                        entryStream.on('data', async (entry) => {
                            if (foundTargetCount >= limitCount) {
                                entryStream.pause();
                                entryStream.destroy();
                                return;
                            }
                            
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
                                            entryStream.pause();
                                            await execute(subIndex);
                                            entryStream.resume();
                                        }
                                        catch(e) { console.error("Error while loading " + subIndex.getOrigin()?.value + e) }
                                    } else { console.error("No subIndexFound for potencial result source.") }
                                }
                            }

                            else if (comparisonResult === 0 && entry.hasSubIndex()) {
                                if (foundTargetCount < limitCount - 1) {
                                    const subIndex = entry.getSubIndex();
                                    if (subIndex) {
                                        try {
                                            entryStream.pause();
                                            await execute(subIndex);
                                            entryStream.resume();
                                        }
                                        catch(e) { console.warn("Error while loading " + subIndex.getOrigin()?.value) }
                                    }
                                }
                            }
                            
                        });

                        entryStream.on('close', () => resolve()); // handle the call to destroy()
                        entryStream.on('error', (error) => reject(error));
                        entryStream.on('end', () => resolve());
                    }

                    else resolve();
                });
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
            if (!this.getValue())
                throw new Error("This property to compare has no value.");
            return this.getValue()!.equals(other.getValue()); // this.getValue must be checked before
        }

        public equals(other: IndexShapeProperty): boolean {
            return this.hasSamePath(other) && this.hasSameValue(other);
        }
        
        /**
         * @param other 
         * @returns -1 if paths are different or if both paths and values are different, 0 if paths are the same 
         * but `this` property has no value, and 1 if both paths and values are equals.
         */
        public compares(other: IndexShapeProperty): number {
            if (!this.hasSamePath(other)) {
                return -1
            }
          
            if (this.getValue()) {
                return this.hasSameValue(other) ? 1 : -1;
            }
            
            return 0;
        }

    }

}

export function indexShapePropertyFactory(semantizer: Semantizer) {
    return semantizer.getMixinFactory(IndexShapePropertyMixin);
}