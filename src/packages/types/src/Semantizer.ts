import { BlankNode, DataFactory, NamedNode, Quad } from "@rdfjs/types";
import { QuadIterableSemantizer } from "./Common";
import { DatasetBaseFactory, DatasetSemantizer } from "./Datasets";
import { Loader, LoaderQuadStream } from "./Loader";

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
    
    getMixinFactory<TMixin extends DatasetSemantizer>(mixin: (Base: DatasetImplConstructor) => Constructor<TMixin>): MixinFactory<DatasetImplConstructor, TMixin>;
    getMixinFactory<TBase extends Constructor, TMixin extends DatasetSemantizer>(mixin: (Base: TBase) => Constructor<TMixin>, baseClass: TBase): MixinFactory<TBase, TMixin>;
    getMixinFactory<TBase extends Constructor, TMixin extends DatasetSemantizer>(mixin: (Base: TBase | DatasetImplConstructor) => Constructor<TMixin>, baseClass?: TBase): MixinFactory<DatasetImplConstructor, TMixin> | MixinFactory<TBase, TMixin>;

    load<TBase extends Constructor, TMixin extends DatasetSemantizer>(resource: string): Promise<DatasetSemantizer>;
    load<TBase extends Constructor, TMixin extends DatasetSemantizer>(resource: string, mixinFactoryFunction: MixinFactoryFunction<TBase, TMixin>): Promise<TMixin>;
    load<TBase extends Constructor, TMixin extends DatasetSemantizer>(resource: string, mixinFactoryFunction?: MixinFactoryFunction<TBase, TMixin>): Promise<DatasetSemantizer | TMixin>;

    build<TBase extends Constructor, TMixin extends DatasetSemantizer>(): DatasetSemantizer;
    build<TBase extends Constructor, TMixin extends DatasetSemantizer>(fromDataset: QuadIterableSemantizer): DatasetSemantizer;
    build<TBase extends Constructor, TMixin extends DatasetSemantizer>(mixinFactoryFunction: MixinFactoryFunction<TBase, TMixin>): TMixin;
    build<TBase extends Constructor, TMixin extends DatasetSemantizer>(mixinFactoryFunction: MixinFactoryFunction<TBase, TMixin>, fromDataset?: QuadIterableSemantizer): TMixin;
    build<TBase extends Constructor, TMixin extends DatasetSemantizer>(mixinFactoryFunctionOrDataset?: MixinFactoryFunction<TBase, TMixin> | QuadIterableSemantizer, fromDataset?: QuadIterableSemantizer): DatasetSemantizer | TMixin;

    // TODO: Can be move to another class
    // getContext(): Context | undefined;
    // setContext(context: Context): void;
    // expand(uri: string): string;
    // shorten(uri: string): string;
}

export interface Configuration {
    getLoader(): Loader;
    getLoaderQuadStream(): LoaderQuadStream;
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
    build(dataset?: QuadIterableSemantizer): TMixin;
}

export type MixinFactoryConstructor<
    TBase extends Constructor, 
    TMixin extends DatasetSemantizer
> = new (semantizer: Semantizer, mixin: (Base: TBase) => Constructor<TMixin>, baseClass: TBase) => MixinFactory<TBase, TMixin>;