import { Term, BlankNode, Quad, Stream, DefaultGraph, DatasetRdfjs, Literal, NamedNode, DatasetLoadOptions, DatasetSemantizer, GraphSemantizer, NamedGraphSemantizer, Resource, DatasetSemantizerRdfjsMixinConstructor, DatasetQuadStreamOptions } from '@semantizer/types';
import { DatasetCore } from "@rdfjs/types"; // PB if deleted

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

        public isRdfTypeOf(rdfType: NamedNode, ...otherTypes: NamedNode[]): boolean {
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
        getLiteral(thing: Resource, predicate: Resource, language?: string | undefined, graph?: NamedNode | undefined): Literal | undefined {
            throw new Error('Method not implemented.');
        }
        getLiteralAll(thing: Resource, predicate: Resource, language?: string | undefined, graph?: NamedNode | undefined): Literal[] {
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
        public getLinkedObject(predicate: Resource, thingOrDataset?: Resource | DatasetSemantizer, graph?: NamedNode): DatasetSemantizer | undefined {
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
        
        public getLinkedObjectAll(predicate: Resource, thingOrDataset?: Resource | DatasetSemantizer, graph?: NamedNode): DatasetSemantizer[] {
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
        public async forEachSubGraph(callbackfn: (value: DatasetSemantizer, index?: number, array?: DatasetSemantizer[]) => Promise<void>, namedGraph?: NamedNode): Promise<void> {
            const graphDataset = namedGraph ? this.getNamedGraph(namedGraph) : this.getDefaultGraph();
            if (graphDataset) {
                let index = 0;
                const subjects: string[] = [];
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

// TODO: should be removed as this mixin should be constructed with the DatasetBaseFactory.
// export function datasetFactory(semantizer: Semantizer) {
//     const _DatasetImpl = semantizer.getConfiguration().getDatasetImpl();
//     return semantizer.getMixinFactory(DatasetMixin, _DatasetImpl);
// }

/*
public addObject(predicate: NamedNode, value: NamedNode | Literal | BlankNode, thing?: NamedNode): void {
            throw new Error("Not implemented")
        }
    
        public getUriOfResource(resource: string | Dataset | NamedNode): string {
            if (typeof resource === 'string') {
                return resource;
            }
            if ('getUri' in resource) {
                return (resource as Dataset).getUri() as string;
            }
            if ('termType' in resource && resource.termType === 'NamedNode') {
                // TODO : handle blank node!
                return (resource as NamedNode).value;
            }
            throw new Error("The origin uri can't be obtained from the resource.");
        }
    
        // uri: string | Dataset | NamedNode
        public async load(resource?: string | Dataset | NamedNode, options?: DatasetLoadOptions): Promise<void> {
            let loaded, resourceUri = "";
            const loader = options && options.loader? options.loader: this.getSemantizer().getLoader();

            resource = resource? resource: this;

            if (typeof resource === 'string') {
                resourceUri = resource;
                loaded = await loader.load(resourceUri);
            }
            else if ('termType' in resource && resource.termType === 'NamedNode') {
                resourceUri = resource.value;
                loaded = await loader.load(resourceUri);
            }
            else if('getUri' in resource) {
                if ((resource as Dataset).isEmpty()) {
                    resourceUri = resource.getUri() || "";
                    loaded = resource.getUri()? await loader.load(resourceUri!): resource;
                }
            }

            // const uri = this.getUriOfResource(resource);
            // const loaded = await loader.load(uri);
            if (loaded) {
                for (const quad of loaded) {
                    if (this.getUri() && this.getUri() !== resourceUri) { // load in default graph
                        quad.graph = dataFactory.namedNode(resourceUri);
                    }
                    this.add(quad);
                }
            }
        }
    
        // TODO: string | undefined
        public getUri(): string {
            return this.uri;
        }

        public setUri(uri: string): void {
            this.uri = uri;
        }
    
        public getLiteral(thingUri: string, predicateUri: string, language?: string): string {
            const matches = this.match(
                dataFactory.namedNode(thingUri),
                dataFactory.namedNode(predicateUri)
            );
            for (const quad of matches) {
                return quad.object.value;
            }
            throw new Error("Literal not found for thing " + thingUri + " and predicate " + predicateUri);
        }
        
        // Warning: concrete implem. used.
        public getStatements(thingUri: string, predicate: string): Dataset {
            //const thing = this.getThing(thingUri);
            const datasetCore = this.match(undefined, dataFactory.namedNode(predicate));

            // The line below use the constructor directly because the factory takes a Dataset and not a DatasetCore (to get the uri)
            const dataset = new DatasetMixinImpl(this.getSemantizer(), datasetCore); // WARNING: no params check!
            
            dataset.setUri(thingUri)
            return dataset;
        }

        public getThing(uri: string): Dataset {
            const thing = this.match(dataFactory.namedNode(uri));
            
            // The line below use the constructor directly because the factory takes a Dataset and not a DatasetCore (to get the uri)
            const dataset = new DatasetMixinImpl(this.getSemantizer(), thing); // WARNING: no params check!
            
            dataset.setUri(uri); //this.getUri());
            return dataset;
        }

        // TODO: clean
        public isTypeOf(type: string | NamedNode, thing?: string | NamedNode): boolean {
            const thingUri: NamedNode = thing ? (typeof thing === "string"? dataFactory.namedNode(thing): thing) : dataFactory.namedNode(this.getUri());
            return this.match(thingUri, dataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), typeof type === "string"? dataFactory.namedNode(type): type).size > 0;
        }

        public forEachThing(callbackfn: (value: Dataset, index?: number, array?: Dataset[]) => void, thingType?: string | NamedNode): void {
            const subjects: string[] = [];
            let index = 0;
            for (const q of this) {
                const uri = q.subject.value;
                if (!subjects.includes(uri)) {
                    subjects.push(uri); // mark quad as "already treated"
                    const thing = this.getThing(uri);

                    if (thingType && !thing.isTypeOf(thingType, uri)) {
                        continue;
                    }
                    
                    callbackfn(thing, index);
                }
                index++;
            }
        }

        public getObject(predicate: NamedNode, thing?: NamedNode | BlankNode): Dataset | undefined {
            const things = this.match(thing, predicate);
            for (const quad of things) {
                // return this.match(quad.object);
                const objectDataset = this.match(quad.object);

                // The line below use the constructor directly because the factory takes a Dataset and not a DatasetCore (to get the uri)
                const dataset = new DatasetMixinImpl(this.getSemantizer(), objectDataset); // WARNING: no params check!
                
                dataset.setUri(quad.object.value); // TODO: only when NamedNode
                return dataset;
            }
            return undefined;
        }

        public getObjectAll(predicate: string, thingUri?: string): Dataset[] {
            const datasets: Dataset[] = [];
            const subject = thingUri? dataFactory.namedNode(thingUri): undefined;
            const things = this.match(subject, dataFactory.namedNode(predicate));
            for (const quad of things) {
                const datasetCore = this.match(quad.object);
                
                // The line below use the constructor directly because the factory takes a Dataset and not a DatasetCore (to get the uri)
                const dataset = new DatasetMixinImpl(this.getSemantizer(), datasetCore); // WARNING: no params check!
                
                dataset.setUri(quad.object.value); // TODO: only when NamedNode
                datasets.push(dataset);
            }
            return datasets;
        }
            */