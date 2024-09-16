import { BlankNode, DatasetRdfjs, Literal, NamedNode, DatasetLoadOptions, DatasetSemantizer, GraphWithOrigin, NamedGraphWithOrigin, Resource, Semantizer, WithSemantizer, WithOrigin } from '@semantizer/types';
import { DatasetCore } from "@rdfjs/types"; // PB if deleted

type DatasetSemantizerRdfjsConstructor = new(...args: any[]) => DatasetRdfjs & WithSemantizer & WithOrigin;

export function DatasetMixin<
    TBase extends DatasetSemantizerRdfjsConstructor
>(Base: TBase) {

    return class DatasetMixinImpl extends Base implements DatasetSemantizer {

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
        getNamedGraph(namedGraph: NamedNode): NamedGraphWithOrigin | undefined {
            throw new Error('Method not implemented.');
        }
        getDefaultGraph(): GraphWithOrigin {
            throw new Error('Method not implemented.');
        }
        isDefaultGraphEmpty(): boolean {
            throw new Error('Method not implemented.');
        }
        isNamedGraphEmpty(namedGraph: NamedNode): boolean {
            throw new Error('Method not implemented.');
        }
        getThing(subject: BlankNode | NamedNode, graph?: NamedNode | undefined): GraphWithOrigin | undefined {
            throw new Error('Method not implemented.');
        }
        getThingAll(graph?: NamedNode | undefined): GraphWithOrigin[] {
            throw new Error('Method not implemented.');
        }
        getLiteral(thing: Resource, predicate: Resource, language?: string | undefined, graph?: NamedNode | undefined): Literal | undefined {
            throw new Error('Method not implemented.');
        }
        getLiteralAll(thing: Resource, predicate: Resource, language?: string | undefined, graph?: NamedNode | undefined): Literal[] {
            throw new Error('Method not implemented.');
        }
        
        public getThingLinked(thingOrDataset: Resource | DatasetSemantizer, predicate: Resource, graph?: NamedNode): DatasetSemantizer | undefined {
            const thing = 'getOrigin' in thingOrDataset ? thingOrDataset.getOrigin() : thingOrDataset;
            for (const quad of this.match(thing, predicate, undefined, graph)) {
                const objectDataset = this.match(quad.object);
                // const origin = quad.object.termType === 'BlankNode'? this.getOrigin(): quad.object.value;
                // TODO: add check on the quad.object type (=== NamedNode || BlankNode)
                // The line below use the constructor directly because the factory takes a Dataset and not a DatasetCore (to get the uri)
                const dataset = new DatasetMixinImpl(this.getOriginDocument(), objectDataset); // WARNING: no params check!
                dataset.setOrigin(quad.object as NamedNode | BlankNode);
                if (thing) {
                    dataset.setOriginThing(thing);
                }
                return dataset;
            }
            return undefined;
        }
        
        public getThingLinkedAll(thingOrDataset: Resource | DatasetSemantizer, predicate: Resource, graph?: NamedNode): DatasetSemantizer[] {
            const things: DatasetSemantizer[] = [];
            const thing = 'getOrigin' in thingOrDataset ? thingOrDataset.getOrigin() : thingOrDataset;
            for (const quad of this.match(thing, predicate, undefined, graph)) {
                const objectDataset = this.match(quad.object);
                const dataset = new DatasetMixinImpl(this.getOriginDocument(), objectDataset); // WARNING: no params check!
                dataset.setOrigin(quad.object as NamedNode | BlankNode);
                if (thing) {
                    dataset.setOriginThing(thing);
                }
                things.push(dataset);
            }
            return things;
        }

        forEachThing(callbackfn: (value: GraphWithOrigin, index?: number | undefined, array?: GraphWithOrigin[] | undefined) => void, graph?: NamedNode | undefined): void {
            throw new Error('Method not implemented.');
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
        
        public async load(resource?: string | DatasetSemantizer | NamedNode, options?: DatasetLoadOptions): Promise<void> {
            resource = resource? resource: this;
            if (typeof resource !== 'string' && 'getOrigin' in resource && resource.getOrigin()?.termType === 'NamedNode') { // if the resource to load is a NamedNode (and not a BlankNode which are already loaded)
                const loader = options && options.loader? options.loader: this.getSemantizer().getConfiguration().getLoader();
                const resourceUri = this.getUriOfResource(resource);
                const loaded = await loader.load(resourceUri);
                for (const quad of loaded) {
                    if (this.getOrigin() && this.getOrigin()?.value !== resourceUri) { // load in default graph
                        quad.graph = this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode(resourceUri); // TODO: use the factory from Semantizer
                    }
                    this.add(quad);
                }
            }
        }

    }

}

// TODO: should be removed as this mixin should be constructed with the DatasetBaseFactory.
export function datasetFactory(semantizer: Semantizer) {
    const _DatasetImpl = semantizer.getConfiguration().getDatasetImpl();
    return semantizer.getMixinFactory(DatasetMixin, _DatasetImpl);
}

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