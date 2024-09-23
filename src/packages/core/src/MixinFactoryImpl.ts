import { Constructor, DatasetImplConstructor, DatasetSemantizer, MixinFactory, QuadIterableSemantizer, Semantizer } from "@semantizer/types";

// (TODO move to default ? or to a dedicated package.)
// (Add also a MixinFactoryDatasetCore package ?)
// --> Not necessarily as this does not depend on other packages than types.
export class MixinFactoryImpl<
    TBase extends Constructor, 
    TMixin extends DatasetSemantizer
> implements MixinFactory<TBase, TMixin> {

    private _semantizer: Semantizer;
    private _mixedClass: Constructor<TMixin>;

    constructor(semantizer: Semantizer, mixin: (Base: TBase) => Constructor<TMixin>, baseClass: TBase) {
        this._semantizer = semantizer;
        this._mixedClass = mixin(baseClass);
    }

    /**
     * This method creates a base dataset (Dataset mixin) and passes it to the build method 
     * to get the mixed in resulting dataset.
     * @param resource 
     * @returns 
     */
    public async load(resource: string): Promise<TMixin> {
        const datasetCore = await this._semantizer.getConfiguration().getLoader().load(resource);
        // TODO: resource should be passed below as a URI of a document (without fragment).
        const dataset = new (this._semantizer.getConfiguration().getDatasetImpl())(this._semantizer, resource, datasetCore);
        return this.build(dataset);
    }

    public build(sourceDataset?: QuadIterableSemantizer): TMixin {
        const origin = sourceDataset? sourceDataset.getOrigin(): undefined;
        const dataset = new this._mixedClass(this._semantizer, origin, sourceDataset); // warning: no check on params (TS mixin)
        return dataset;
    }

}