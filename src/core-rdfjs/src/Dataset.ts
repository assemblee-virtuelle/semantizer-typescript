import dataFactory from '@rdfjs/data-model';
import datasetFactory from '@rdfjs/dataset';
import { DatasetCore, NamedNode, Quad, Term } from "@rdfjs/types";
import { Dataset, DatasetConstructor, DatasetLoadOptions, DatasetSemantizer, Loader, Semantizer } from '@semantizer/types';

export class DatasetImpl implements DatasetSemantizer, DatasetCore<Quad, Quad> {

    private _semantizer: Semantizer;
    private _dataset: DatasetCore<Quad, Quad>;
    public size: number;

    public constructor(semantizer: Semantizer, quads?: Iterable<Quad>) {
        this._semantizer = semantizer;
        const quadArray = quads? Array.from(quads) : undefined;
        this._dataset = datasetFactory.dataset(quadArray);
        this.size = this._dataset.size;
    }
    
    public getSemantizer(): Semantizer {
        return this._semantizer;
    }

    public add(quad: Quad): this {
        return this._dataset.add(quad) as this;
    }

    public delete(quad: Quad): this {
        return this._dataset.delete(quad) as this;
    }

    public has(quad: Quad): boolean {
        return this._dataset.has(quad);
    }

    public match(subject?: Term | null | undefined, predicate?: Term | null | undefined, object?: Term | null | undefined, graph?: Term | null | undefined): DatasetCore<Quad, Quad> {
        return this._dataset.match(subject, predicate, object, graph);
    }

    public [Symbol.iterator](): Iterator<Quad> {
        return this._dataset[Symbol.iterator]();
    }

}

export function DatasetMixin<
    TBase extends DatasetConstructor
>(Base: TBase) {

    return class DatasetMixinImpl extends Base implements Dataset {

        public uri: string = "";

        public isEmpty(): boolean {
            return this.size === 0;
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
            throw new Error("Literal not found");
        }
        
        // Warning: concrete implem. used.
        public getStatements(thingUri: string, predicate: string): Dataset {
            //const thing = this.getThing(thingUri);
            const datasetCore = this.match(undefined, dataFactory.namedNode(predicate));
            const DatasetMixinImpl = DatasetMixin(DatasetImpl)
            const dataset = new DatasetMixinImpl(this.getSemantizer(), datasetCore);
            dataset.setUri(thingUri)
            return dataset;
        }

        public getThing(uri: string): Dataset {
            const thing = this.match(dataFactory.namedNode(uri));
            const dataset = new DatasetMixinImpl(thing);
            dataset.setUri(this.getUri());
            return dataset;
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

        public getObject(predicate: string, thingUri?: string): Dataset {
            const subject = thingUri? dataFactory.namedNode(thingUri): undefined;
            const things = this.match(subject, dataFactory.namedNode(predicate));
            for (const quad of things) {
                const datasetCore = this.match(quad.object);
                const dataset = new DatasetMixinImpl(this.getSemantizer(), datasetCore); // WARNING: no params check!
                dataset.setUri(quad.object.value); // TODO: only when NamedNode
                return dataset;
            }
            return new DatasetMixinImpl(); 
        }

        public getObjectAll(predicate: string, thingUri?: string): Dataset[] {
            const datasets: Dataset[] = [];
            const subject = thingUri? dataFactory.namedNode(thingUri): undefined;
            const things = this.match(subject, dataFactory.namedNode(predicate));
            for (const quad of things) {
                const datasetCore = this.match(quad.object);
                const DatasetMixinImpl = DatasetMixin(DatasetImpl)
                const dataset = new DatasetMixinImpl(this.getSemantizer(), datasetCore);
                dataset.setUri(quad.object.value); // TODO: only when NamedNode
                datasets.push(dataset);
            }
            return datasets;
        }
        
    }
}

export function DatasetRdfjsFactory(semantizer: Semantizer) {
    const _DatasetImpl = semantizer.getDatasetImpl();
    return semantizer.getFactory(DatasetMixin, _DatasetImpl);
}

// export class DatasetRdfjsFactory {

//     public static async load(resource: string, loader: Loader): Promise<Dataset> {
//         const dataset = this.build(await loader.load(resource));
//         dataset.setUri(resource);
//         return dataset;
//     }

//     public static build(datasetCore?: DatasetCore): Dataset {
//         const DatasetMixinImpl = DatasetMixin(DatasetImpl);
//         return new DatasetMixinImpl(datasetCore);
//     }

// }

// export const DatasetRdfjsFactory = {
//     build: (datasetCore?: DatasetCore): Dataset => {
//         const DatasetMixinImpl = DatasetMixin(DatasetImpl);
//         return new DatasetMixinImpl(datasetCore);
//     },
//     load: async (resource: string, loader: Loader): Promise<Dataset> => {
//         const dataset = DatasetRdfjsFactory.build(await loader.load(resource));
//         dataset.setUri(resource);
//         return dataset;
//     }
// }

// type Mixin<TBase extends DatasetConstructor> = (Base: TBase) => {
//     new (...args: any[]): DatasetCore<Quad, Quad>;
//     prototype: DatasetCore<Quad, Quad>;
// } & TBase

// function WebIdProfileMixin<TBase extends new (...args: any[]) => Dataset>(Base: TBase): {
//     new (...args: any[]): WebIdProfileImpl;
//     prototype: WebIdProfileMixin<any>.WebIdProfileImpl;
// } & TBase

// type Mixin<TBase extends DatasetConstructor> = (Base: TBase) => {
//     new (quads?: Iterable<Quad>): ThisType<TBase>;
//     prototype: ThisType<TBase>;
// } & TBase;

// export class DatasetRdfjsFactory {

//     public async load<T extends Dataset>(resource: string, loader: Loader, mixin?: Mixin<T>): Promise<T> {
//             const dataset = this.build(await loader.load(resource), mixin);
//             dataset.setUri(resource);
//             return dataset;
//     }

//     public build<T extends DatasetConstructor>(datasetCore?: DatasetCore, mixin?: Mixin<T>): T {
//         const DatasetMixinImpl = mixin? mixin(DatasetImpl): DatasetMixin(DatasetImpl);
//         return new DatasetMixinImpl(datasetCore);
//     }

// }

// const f = new DatasetRdfjsFactory();
// const b = f.build(undefined, DatasetMixin);

export default DatasetRdfjsFactory;