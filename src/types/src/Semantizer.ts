import { DatasetCore } from "@rdfjs/types";
import { Loader } from "./Common";
import { Dataset } from "./Dataset";

export type Constructor<T = {}> = new (...args: any[]) => T;

export interface Semantizer {
    getLoader(): Loader;
    getDatasetImpl(): new (...args: any[]) => Dataset;
    getFactory<TBase extends Constructor, TMixin extends Dataset>(mixin: (Base: TBase) => Constructor<TMixin>, baseClass: TBase): MixinFactory<TBase, TMixin>;
    // getContext(): Context | undefined;
    // setContext(context: Context): void;
    // expand(uri: string): string;
    // shorten(uri: string): string;
}

export interface MixinFactory<TBase extends Constructor, TMixin extends Dataset> {
    load(resource: string): Promise<TMixin>;
    build(datasetCore?: DatasetCore): TMixin;
}