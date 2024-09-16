import { DataFactory, NamedNode, Quad, BlankNode } from "@rdfjs/types";
import { Loader } from "./Common";
import { DatasetBaseFactory, DatasetSemantizer } from "./Datasets";

export type Constructor<T = {}> = new (...args: any[]) => T;

export type DatasetImplConstructor = new (semantizer: Semantizer, origin?: NamedNode | BlankNode | string, quads?: Iterable<Quad>) => DatasetSemantizer;

export type DatasetFactoryFunction<
    DatasetImpl extends DatasetImplConstructor,
    DatasetMixin extends DatasetSemantizer
> = (semantizer: Semantizer) => MixinFactory<DatasetImpl, DatasetMixin>;

export type MixinFactoryFunction<
    TBase extends Constructor, 
    TMixin extends DatasetSemantizer
> = (semantizer: Semantizer) => MixinFactory<TBase, TMixin>;

export interface Semantizer {
    getConfiguration(): Configuration;
    setConfiguration(configuration: Configuration): void;
    
    getMixinFactory<TBase extends Constructor, TMixin extends DatasetSemantizer>(mixin: (Base: TBase) => Constructor<TMixin>, baseClass: TBase): MixinFactory<TBase, TMixin>;

    load<TBase extends Constructor, TMixin extends DatasetSemantizer>(resource: string): Promise<DatasetSemantizer>;
    load<TBase extends Constructor, TMixin extends DatasetSemantizer>(resource: string, mixinFactoryFunction: MixinFactoryFunction<TBase, TMixin>): Promise<TMixin>;
    load<TBase extends Constructor, TMixin extends DatasetSemantizer>(resource: string, mixinFactoryFunction?: MixinFactoryFunction<TBase, TMixin>): Promise<DatasetSemantizer | TMixin>;

    build<TBase extends Constructor, TMixin extends DatasetSemantizer>(): DatasetSemantizer;
    build<TBase extends Constructor, TMixin extends DatasetSemantizer>(mixinFactoryFunction: MixinFactoryFunction<TBase, TMixin>): TMixin;
    build<TBase extends Constructor, TMixin extends DatasetSemantizer>(mixinFactoryFunction: MixinFactoryFunction<TBase, TMixin>, fromDataset?: DatasetSemantizer): TMixin;
    build<TBase extends Constructor, TMixin extends DatasetSemantizer>(mixinFactoryFunction?: MixinFactoryFunction<TBase, TMixin>, fromDataset?: DatasetSemantizer): DatasetSemantizer | TMixin;

    // TODO: Can be move to another class
    // getContext(): Context | undefined;
    // setContext(context: Context): void;
    // expand(uri: string): string;
    // shorten(uri: string): string;
}

export interface Configuration {
    getLoader(): Loader;
    getRdfDataModelFactory(): DataFactory;
    getMixinFactoryImpl(): MixinFactoryConstructor<any, any>;
    getDatasetBaseFactory(): DatasetBaseFactory;
    getDatasetImpl(): DatasetImplConstructor;
}

export interface MixinFactory<
    TBase extends Constructor, 
    TMixin extends DatasetSemantizer
> {
    load(resource: string): Promise<TMixin>;
    build(dataset?: DatasetSemantizer): TMixin;
}

export type MixinFactoryConstructor<
    TBase extends Constructor, 
    TMixin extends DatasetSemantizer
> = new (semantizer: Semantizer, mixin: (Base: TBase) => Constructor<TMixin>, baseClass: TBase) => MixinFactory<TBase, TMixin>;