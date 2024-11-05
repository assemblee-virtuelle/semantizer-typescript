import { Term, BlankNode, Quad, Stream, DefaultGraph, DatasetRdfjs, Literal, NamedNode, DatasetLoadOptions, DatasetSemantizer, Resource, DatasetSemantizerRdfjsMixinConstructor, DatasetQuadStreamOptions } from '@semantizer/types';
// import { DatasetCore } from "@rdfjs/types"; // PB if deleted

export function DatasetMixin<
    TBase extends DatasetSemantizerRdfjsMixinConstructor // PB: can be impl other than rdfjs
>(Base: TBase) {

    return class DatasetMixinImpl extends Base implements DatasetSemantizer {
        
        // TODO: check matchedQuad type (BlankNode type?)?
        public getRdfTypeAll(namedGraph?: NamedNode): NamedNode[] {
            const results: NamedNode[] = [];
            
            const subject = namedGraph ? namedGraph : this.getOrigin();
            const predicate = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');
            const graph = namedGraph ? namedGraph : this.getSemantizer().getConfiguration().getRdfDataModelFactory().defaultGraph();
            
            if (subject) {   
                for (const matchedQuad of this.match(subject, predicate, undefined, graph)) {
                    results.push(matchedQuad.object as NamedNode);
                }
            }

            return results;
        }

        public isDefaultGraphRdfTypeOf(rdfType: NamedNode, ...otherTypes: NamedNode[]): boolean {
            const thisTypes = this.getRdfTypeAll().map(t => t.value);
            for (const type of [rdfType, ...otherTypes]) {
                if (!thisTypes.includes(type.value)) {
                    return false;
                }
            }
            return true;
        }
        
        public getNamedGraphAll(namedGraph: NamedNode): DatasetSemantizer[] {
            throw new Error('Method not implemented.');
        }

        public count(): number {
            return this.size;
        }

        public isEmpty(): boolean {
            return this.size === 0;
        }
        
        public hasNamedGraph(): boolean {
            for (const quad of this) {
                if (quad.graph) {
                    return true;
                }
            }
            return false;
        }

        countNamedGraph(): number {
            throw new Error('Method not implemented.');
        }
        
        public getNamedGraph(namedGraph: NamedNode): DatasetSemantizer | undefined {
            const matchedDataset = this.matchDatasetSemantizerWithLinkedObjects(namedGraph);
            if (matchedDataset.isEmpty()) {
                return undefined
            } else {
                matchedDataset.setOrigin(namedGraph);
                return matchedDataset;
            }
        }
        
        public getDefaultGraph(): DatasetSemantizer {
            const defaultGraph = this.getSemantizer().getConfiguration().getRdfDataModelFactory().defaultGraph();
            const dataset = this.matchDatasetSemantizerWithLinkedObjects(undefined, undefined, undefined, defaultGraph);
            if (!this.getOriginDocument()) {
                console.warn("Can't set the document origin of the default graph.");
            }
            dataset.setOrigin(this.getOriginDocument()!);
            return dataset;
        }

        isDefaultGraphEmpty(): boolean {
            throw new Error('Method not implemented.');
        }
        isNamedGraphEmpty(namedGraph: NamedNode): boolean {
            throw new Error('Method not implemented.');
        }

        public getSubGraph(subject: BlankNode | NamedNode, namedGraph?: NamedNode): DatasetSemantizer | undefined {
            const defaultGraph = this.getSemantizer().getConfiguration().getRdfDataModelFactory().defaultGraph();
            const datasetRdfjs = this.match(subject, undefined, undefined, namedGraph ?? defaultGraph);
            const dataset = this.getSemantizer().build();
            return dataset.addAll(datasetRdfjs);
        }

        public getSubGraphAll(namedGraph?: NamedNode): DatasetSemantizer[] {
            throw new Error('Method not implemented.');
        }
        
        public getLiteral(thing: Resource, predicate: Resource, graph?: NamedNode | DefaultGraph, language?: string): Literal | undefined {
            const literal = this.match(thing, predicate, graph);
            for (const q of literal) {
                if (q.object.termType === "Literal")
                    return q.object;
            }
            return undefined;
        }
        
        getLiteralAll(thing: Resource, predicate: Resource, graph?: NamedNode | DefaultGraph, language?: string): Literal[] {
            throw new Error('Method not implemented.');
        }

        /**
         * Warning: build without origin. Import also the related blank node.
         * Includes the linked blank nodes and named nodes.
         * @param subject 
         * @param predicate 
         * @param object 
         * @param graph 
         * @returns 
         */
        public matchDatasetSemantizerWithLinkedObjects(subject?: Term, predicate?: Term, object?: Term, graph?: Term): DatasetSemantizer {
            const dataset = this.getSemantizer().getConfiguration().getDatasetBaseFactory().build(this.getSemantizer());
            const matchedDataset = this.match(subject, predicate, object, graph);
            const addQuadWithLinkedObjectsRecursively = (matchedDataset: DatasetRdfjs) => {
                for (const quad of matchedDataset) {
                    dataset.add(quad);
                    if (quad.object.termType === 'BlankNode' || quad.object.termType === 'NamedNode') {
                        const relatedBlankNode = this.match(quad.object);
                        addQuadWithLinkedObjectsRecursively(relatedBlankNode);
                    }
                }
                return dataset;
            }
            return addQuadWithLinkedObjectsRecursively(matchedDataset);
        }
        
        // TODO: handle this != document, get the document first?
        public getLinkedObject(predicate: Resource, thingOrDataset?: Resource | DatasetSemantizer, graph?: NamedNode | DefaultGraph): DatasetSemantizer | undefined {
            const thing = thingOrDataset ? 'getOrigin' in thingOrDataset ? thingOrDataset.getOrigin() : thingOrDataset : undefined;
            for (const quad of this.match(thing, predicate, undefined, graph)) {
                const dataset = this.matchDatasetSemantizerWithLinkedObjects(quad.object);
                dataset.setOrigin(quad.object as NamedNode | BlankNode);
                if (thing) {
                    dataset.setOriginThing(thing);
                }
                return dataset;
            }
            return undefined;
        }
        
        public getLinkedObjectAll(predicate: Resource, thingOrDataset?: Resource | DatasetSemantizer, graph?: NamedNode | DefaultGraph): DatasetSemantizer[] {
            const things: DatasetSemantizer[] = [];
            const thing = thingOrDataset ? 'getOrigin' in thingOrDataset ? thingOrDataset.getOrigin() : thingOrDataset : undefined;
            for (const quad of this.match(thing, predicate, undefined, graph)) {
                const dataset = this.matchDatasetSemantizerWithLinkedObjects(quad.object);
                dataset.setOrigin(quad.object as NamedNode | BlankNode);
                if (thing) {
                    dataset.setOriginThing(thing);
                }
                things.push(dataset);
            }
            return things;
        }

        public async loadQuadStream(resource?: string | DatasetSemantizer | NamedNode, options?: DatasetQuadStreamOptions): Promise<Stream<Quad>> {
            resource = resource? resource: this;
            const resourceUri = this.getUriOfResource(resource);
            const loader = options?.quadStreamLoader ? options.quadStreamLoader : this.getSemantizer().getConfiguration().getLoaderQuadStream();
            return loader.load(resourceUri);
        }

        // TODO: include related blank node into returned dataset
        public async forEachSubGraph(callbackfn: (value: DatasetSemantizer, index?: number, array?: DatasetSemantizer[]) => Promise<void>, graph?: NamedNode | DefaultGraph): Promise<void> {
            let index = 0;
            const subjects: string[] = [];
            
            const processGraph = async (graphDataset: DatasetSemantizer) => {
                for (const quad of graphDataset) {
                    if (quad.subject.termType === 'NamedNode') {
                        if (!subjects.includes(quad.subject.value)) {
                            subjects.push(quad.subject.value); // mark quad as "already treated"
                            const thing = this.getNamedGraph(quad.subject); 
                            if (thing) {
                                await callbackfn(thing, index);
                            }
                        }
                        index++;
                    }
                }
            }

            if (graph) {
                const graphDataset = graph.termType === 'DefaultGraph' ? this.getDefaultGraph() : this.getNamedGraph(graph);
                if (graphDataset) {
                    await processGraph(graphDataset);
                }
            }

            else {
                for (const quad of this) {
                    if (quad.subject.termType === 'NamedNode') {
                        const graphDataset = this.getNamedGraph(quad.subject);
                        if (graphDataset) {
                            await processGraph(graphDataset);
                        }
                    }
                }
            }
        }

        // TODO: move to a Utility class
        public getUriOfResource(resource: string | DatasetSemantizer | NamedNode): string {
            if (typeof resource === 'string') {
                return resource;
            }
            if ('termType' in resource && resource.termType === 'NamedNode') {
                return resource.value;
            }
            if ('getOrigin' in resource) {
                if (resource.getOrigin()) {
                    return resource.getOrigin()!.value;
                }
                else throw new Error("Resource origin is undefined.");
            }
            throw new Error("Can't find the uri of the resource.");
        }
        
        /**
         * 
         * @param resource 
         * @param options 
         */
        public async load(resource?: string | DatasetSemantizer | NamedNode, options?: DatasetLoadOptions): Promise<void> {
            resource = resource? resource: this;
            if (typeof resource !== 'string' && 'getOrigin' in resource && resource.getOrigin()?.termType === 'NamedNode') { // if the resource to load is a NamedNode (and not a BlankNode which are already loaded)
                const loader = options && options.loader? options.loader: this.getSemantizer().getConfiguration().getLoader();
                const resourceUri = this.getUriOfResource(resource);
                const resourceNamedNode = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode(resourceUri);
                const startTime = new Date();
                const loaded = await loader.load(resourceUri);
                const loadingTime = (new Date().getTime() - startTime.getTime()) / 1000;
                console.log("HTTP loading done in ", loadingTime.toString(), "sec.");
                console.log("Start loading in memory of " + resourceUri + "...");
                for (const quad of loaded) {
                    if (this.getOrigin() && this.getOrigin()?.value !== resourceUri) { // load in default graph
                        quad.graph = resourceNamedNode;
                    }
                    this.add(quad);
                }
                const elapsedTime = (new Date().getTime() - startTime.getTime()) / 1000;
                console.log("Finished loading in memory in " + elapsedTime.toString() + "sec of " + resourceUri);
            }
        }

    }

}