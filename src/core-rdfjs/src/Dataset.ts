import dataFactory from '@rdfjs/data-model';
import toNT from '@rdfjs/to-ntriples';
// import normalize from '@rdfjs/normalize';
import datasetFactory from '@rdfjs/dataset';
import { NamedNode, Quad, Term, Literal, BlankNode, DatasetCore, Dataset as DatasetRdfjs, Stream } from "@rdfjs/types";
import { Dataset, DatasetConstructor, DatasetLoadOptions, DatasetSemantizer, Semantizer } from '@semantizer/types';

export class DatasetImpl implements DatasetSemantizer {

    private _semantizer: Semantizer;
    private _datasetCore: DatasetCore<Quad, Quad>;
    public size: number;

    public constructor(semantizer: Semantizer, quads?: Iterable<Quad>) {
        this._semantizer = semantizer;
        const quadArray = quads? Array.from(quads) : undefined;
        this._datasetCore = datasetFactory.dataset(quadArray) as DatasetRdfjs;
        this.size = this._datasetCore.size;
    }

    public [Symbol.iterator](): Iterator<Quad> {
        return this._getDatasetCore()[Symbol.iterator]();
    }
    
    private _create(quads?: Iterable<Quad>): DatasetImpl {
        return new DatasetImpl(this.getSemantizer(), quads);
    }

    private _getDatasetCore(): DatasetCore<Quad, Quad> {
        return this._datasetCore;
    }

    public add(quad: Quad): this {
        return this._create(this._getDatasetCore().add(quad)) as this;
    }

    public delete(quad: Quad): this {
        return this._create(this._getDatasetCore().delete(quad)) as this;
    }

    public has(quad: Quad): boolean {
        return this._getDatasetCore().has(quad);
    }

    public addAll(quads: Quad[] | DatasetRdfjs<Quad, Quad>): this {
        for (const quad of quads) {
            this.add(quad);
        }
        return this;
    }

    public contains(other: DatasetRdfjs<Quad, Quad>): boolean {
        throw new Error('Method not implemented.');
    }

    public deleteMatches(subject?: Term | undefined, predicate?: Term | undefined, object?: Term | undefined, graph?: Term | undefined): this {
        for (const quad of this.match(subject, predicate, object, graph)) {
            this.delete(quad);
        }
        return this;
    }

    public difference(other: DatasetRdfjs<Quad, Quad>): DatasetRdfjs<Quad, Quad> {
        return this.filter(quad => !other.has(quad));
    }

    public equals(other: DatasetRdfjs<Quad, Quad>): boolean {
        return this.toCanonical() === other.toCanonical();
    }

    public every(iteratee: (quad: Quad, DatasetRdfjs: this) => boolean): boolean {
        return Array.from(this).every(quad => iteratee(quad, this));
    }

    public filter(iteratee: (quad: Quad, DatasetRdfjs: this) => boolean): DatasetRdfjs<Quad, Quad> {
        return this._create(Array.from(this).filter(quad => iteratee(quad, this)));
    }

    public forEach(callback: (quad: Quad, DatasetRdfjs: this) => void): void {
        Array.from(this).forEach(quad => callback(quad, this));
    }

    public import(stream: Stream<Quad>): Promise<this> {
        // import { finished, Readable } from 'readable-stream'

        // stream.on('data', quad => this.add(quad));

        // return new Promise((resolve, reject) => {
        //     finished(stream, err => {
        //         if (err) {
        //         reject(err)
        //         } else {
        //         resolve(this)
        //         }
        //     })
        // })
        throw new Error('Method not implemented.');
    }

    public intersection(other: DatasetRdfjs<Quad, Quad>): DatasetRdfjs<Quad, Quad> {
        return this.filter(quad => other.has(quad));
    }

    public map(iteratee: (quad: Quad, dataset: DatasetRdfjs<Quad, Quad>) => Quad): DatasetRdfjs<Quad, Quad> {
        return this._create(Array.from(this).map(quad => iteratee(quad, this)));
    }

    public reduce<A = any>(callback: (accumulator: A, quad: Quad, dataset: this) => A, initialValue: A): A {
        return Array.from(this).reduce<A>((value, quad, index) => callback(value, quad, this), initialValue);
    }

    public some(iteratee: (quad: Quad, dataset: this) => boolean): boolean {
        return Array.from(this).some(quad => iteratee(quad, this));
    }

    public toArray(): Quad[] {
        return Array.from(this);
    }

    public toCanonical(): string {
        throw new Error('Method not implemented.');
        //return normalize(this);
    }

    public toStream(): Stream<Quad> {
        throw new Error('Method not implemented.');
        // return Readable.from(this)
    }

    public toString(): string {
        return toNT(this);
    }

    public union(quads: DatasetRdfjs<Quad, Quad>): DatasetRdfjs<Quad, Quad> {
        throw new Error('Method not implemented.');
        // return (this.clone()).addAll(other)
    }
    
    public getSemantizer(): Semantizer {
        return this._semantizer;
    }

    public match(subject?: Term | null | undefined, predicate?: Term | null | undefined, object?: Term | null | undefined, graph?: Term | null | undefined): DatasetRdfjs<Quad, Quad> {
        const datasetCore = this._getDatasetCore().match(subject, predicate, object, graph);
        return this._create(datasetCore);
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
            const DatasetMixinImpl = DatasetMixin(DatasetImpl); // TODO: can be deleted?

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

        public getObject(predicate: string, thingUri?: string): Dataset {
            const subject = thingUri? dataFactory.namedNode(thingUri): undefined;
            const things = this.match(subject, dataFactory.namedNode(predicate));
            for (const quad of things) {
                const datasetCore = this.match(quad.object);

                // The line below use the constructor directly because the factory takes a Dataset and not a DatasetCore (to get the uri)
                const dataset = new DatasetMixinImpl(this.getSemantizer(), datasetCore); // WARNING: no params check!
                
                dataset.setUri(quad.object.value); // TODO: only when NamedNode
                return dataset;
            }
            return new DatasetMixinImpl(this.getSemantizer()); // TODO: nor params check
        }

        public getObjectAll(predicate: string, thingUri?: string): Dataset[] {
            const datasets: Dataset[] = [];
            const subject = thingUri? dataFactory.namedNode(thingUri): undefined;
            const things = this.match(subject, dataFactory.namedNode(predicate));
            for (const quad of things) {
                const datasetCore = this.match(quad.object);
                const DatasetMixinImpl = DatasetMixin(DatasetImpl); // TODO: can be deleted?
                
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