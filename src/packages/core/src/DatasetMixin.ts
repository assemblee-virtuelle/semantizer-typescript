import dataFactory from '@rdfjs/data-model';
import { BlankNode, Literal, NamedNode } from "@rdfjs/types";
import { Dataset, DatasetConstructor, DatasetLoadOptions, Semantizer } from '@semantizer/types';

export function DatasetMixin<
    TBase extends DatasetConstructor
>(Base: TBase) {

    return class DatasetMixinImpl extends Base implements Dataset {

        public uri: string = "";

        public isEmpty(): boolean {
            return this.size === 0;
        }

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

        // public getThing(uri: string): Dataset {
        //     const things = this.match(undefined, dataFactory.namedNode(uri));
        //     for (const quad of things) {
        //         const datasetCore = this.match(quad.object);
        //         const DatasetMixinImpl = DatasetMixin(DatasetImpl)
        //         const dataset = new DatasetMixinImpl(datasetCore);
        //         dataset.setUri(quad.object.value); // TODO: only when NamedNode
        //         return dataset;
        //     }
        //     throw new Error("Thing not found.");
        // }

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
        
    }
}

// TODO: Is this really useful?
export function DatasetRdfjsFactory(semantizer: Semantizer) {
    const _DatasetImpl = semantizer.getDatasetImpl();
    return semantizer.getFactory(DatasetMixin, _DatasetImpl);
}

export default DatasetRdfjsFactory;