import { DatasetSemantizer, DatasetSemantizerMixinConstructor, Quad, Semantizer } from "@semantizer/types";
import { Readable, Transform } from "stream";
import { indexEntryFactory } from "./IndexEntryMixin.js";
import { Index, IndexEntry, IndexShape, IndexStrategy } from "./types";

export function IndexMixin<
    TBase extends DatasetSemantizerMixinConstructor
>(Base: TBase) {

    return class IndexMixinImpl extends Base implements Index {

        /**
         * Transforms the quad stream of this dataset into an IndexEntry stream.
         * @returns A Readable stream of IndexEntry with their linked objects (shape and properties).
         */
        public async loadEntryStream(): Promise<Readable> {
            const quadStream = await this.loadQuadStream();

            const semantizer = this.getSemantizer();
            const datasets: DatasetSemantizer[] = []; // stores the datasets of the parsed entry, shape or property

            const indexEntryType = semantizer.getConfiguration().getRdfDataModelFactory().namedNode('https://ns.inria.fr/idx/terms#IndexEntry');
            const hasShapePredicate = semantizer.getConfiguration().getRdfDataModelFactory().namedNode('https://ns.inria.fr/idx/terms#hasShape');
            const hasTargetPredicate = semantizer.getConfiguration().getRdfDataModelFactory().namedNode('https://ns.inria.fr/idx/terms#hasTarget');
            const hasSubIndexPredicate = semantizer.getConfiguration().getRdfDataModelFactory().namedNode('https://ns.inria.fr/idx/terms#hasSubIndex');

            const entryStream = new Transform({
                objectMode: true,

                transform(quad: Quad, encoding, callback) {
                    // TODO: move this into a Strategy?
                    if (quad.subject.termType === 'NamedNode' || quad.subject.termType === 'BlankNode') {
                        let dataset = datasets.find(d => d.getOrigin()?.equals(quad.subject));
                        
                        if (!dataset) {
                            dataset= semantizer.build();
                            dataset.setOrigin(quad.subject);
                            datasets.push(dataset);
                        }

                        dataset.add(quad);

                        const isEntry = dataset.isRdfTypeOf(indexEntryType);
                        const hasShape = isEntry && dataset.some(q => q.predicate.equals(hasShapePredicate));
                        const hasSubIndex = hasShape && dataset.some(q => q.predicate.equals(hasSubIndexPredicate));
                        const hasTarget = hasShape && !hasSubIndex && dataset.some(q => q.predicate.equals(hasTargetPredicate));

                        // This loads the linked objects of the entry. This allows to include the shape and properties 
                        // into the streamed entry dataset (we need it to compare).
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

                        // Here, if we think the entry is complete, we can stream it.
                        // TODO: maybe we can also check the conformance to the targeted shape here?
                        if (isEntry && hasShape && (hasSubIndex || hasTarget)) {
                            // WARNING: in the next line we suppose (no check) we already have parsed the linked objects
                            // (shape and properties)! Maybe we need to enforce the check expecially on the shape properties 
                            // (because these quads could be parsed later - but they should not). 
                            // If so, we need to check that we have a sh:hasValue for a shape of an entry having an hasTarget. 
                            // For an entry with a hasSubIndex, we don't need to check we have something for sh:hasValue.
                            addLinkedObjects(dataset); 

                            const entry = semantizer.build(indexEntryFactory, dataset);
                            this.push(entry);

                            // TODO: here we might remove the already streamed dataset from the datasets array so we can 
                            // enhance the next calls to the find() method on this array.
                        }
                    }
                  callback(); // not sure if this is necessary?
                }
            });

            // @ts-ignore
            return quadStream.pipe(entryStream); // WARNING: the pipe method comes from the implementation of the underlying used parser (it can comes from @rdfjs/common-formats if the package loader-rdfjs is used (which uses @rdfjs/fetch)).
            // TODO: ask @rdfjs/types why the Stream interface does not export a pipe method (and also other methods of streams like pause, resume and destroy).
        }

        public async forEachEntry(callbackfn: (value: IndexEntry, index?: number, array?: IndexEntry[]) => Promise<void>): Promise<void> {
            const indexEntryType = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode('https://ns.inria.fr/idx/terms#IndexEntry');
            this.forEachSubGraph(async (subGraph) => {
                if (subGraph.isRdfTypeOf(indexEntryType)) {
                    await callbackfn(this.getSemantizer().build(indexEntryFactory, subGraph));
                }
            });
        }

        public async findTargetsRecursively(strategy: IndexStrategy, callbackfn: (target: DatasetSemantizer) => void, limit?: number): Promise<void> {
            strategy.setSemantizer(this.getSemantizer());
            await strategy.execute(this, callbackfn, limit);
        }

    }
    
}

export function indexFactory(semantizer: Semantizer) {
    return semantizer.getMixinFactory(IndexMixin);
}