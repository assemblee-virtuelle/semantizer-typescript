import { Constructor, Dataset, Loader, MixinFactory, Semantizer } from "@semantizer/types";
import { MixinFactoryImpl } from "./MixinFactoryImpl.js";
import { DatasetCore } from "@rdfjs/types";

export class SemantizerImpl implements Semantizer {

    private _loader: Loader;
    private _datasetImpl: new (...args: any[]) => Dataset;

    public constructor(datasetImpl: new (...args: any[]) => Dataset, loader: Loader) {
        this._loader = loader;
        this._datasetImpl = datasetImpl;
    }

    public getLoader(): Loader {
        return this._loader;
    }

    public getDatasetImpl(): new (...args: any[]) => Dataset {
        return this._datasetImpl;
    }

    public getFactory<TBase extends Constructor, TMixin extends Dataset>(mixin: (Base: TBase) => Constructor<TMixin>, baseClass: TBase): MixinFactory<TBase, TMixin> {
        return new MixinFactoryImpl(this, mixin, baseClass);
    }

    public async load<TBase extends Constructor, TMixin extends Dataset>(resource: string, factory: (semantizer: Semantizer) => MixinFactory<TBase, TMixin>): Promise<TMixin> {
        return await factory(this).load(resource);
    }

    public build<TBase extends Constructor, TMixin extends Dataset>(factory: (semantizer: Semantizer) => MixinFactory<TBase, TMixin>, datasetCore?: DatasetCore): TMixin {
        return factory(this).build(datasetCore);
    }

}