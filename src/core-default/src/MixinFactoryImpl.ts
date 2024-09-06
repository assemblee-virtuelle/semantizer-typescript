import { DatasetCore } from "@rdfjs/types";
import { Constructor, Dataset, Semantizer } from "@semantizer/types";

export class MixinFactoryImpl<TBase extends Constructor, TMixin extends Dataset> {

    private _semantizer: Semantizer;
    private _mixedClass: Constructor<TMixin>;

    constructor(semantizer: Semantizer, mixin: (Base: TBase) => Constructor<TMixin>, baseClass: TBase) {
        this._semantizer = semantizer;
        this._mixedClass = mixin(baseClass);
    }

    public async load(resource: string): Promise<TMixin> {
        const datasetCore = await this._semantizer.getLoader().load(resource);
        const dataset = new (this._semantizer.getDatasetImpl())(datasetCore);
        return this.build(dataset);
    }

    // public build(...args: ConstructorParameters<TBase>): TMixin {
    public build(sourceDataset?: Dataset): TMixin {
        const dataset = new this._mixedClass(sourceDataset);
        if (sourceDataset && sourceDataset.getUri()) 
            dataset.setUri(sourceDataset.getUri()!);
        return dataset;
    }

}