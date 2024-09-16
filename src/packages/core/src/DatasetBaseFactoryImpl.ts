import { DatasetImplConstructor, DatasetSemantizer, DatasetBaseFactory, Semantizer } from "@semantizer/types";

// constructs a DatasetRdfjs & WithSemantizer & WithOrigin
export class DatasetBaseFactoryImpl<
    TBase extends DatasetImplConstructor, 
> implements DatasetBaseFactory {

    private _impl: DatasetImplConstructor;

    constructor(impl: TBase) {
        this._impl = impl;
    }

    /**
     * This method creates a base dataset (Dataset mixin) and passes it to the build method 
     * to get the mixed in resulting dataset.
     * @param resource 
     * @returns 
     */
    public async load(semantizer: Semantizer, resource: string): Promise<DatasetSemantizer> {
        const datasetCore = await semantizer.getConfiguration().getLoader().load(resource);
        // TODO: resource should be passed below as a URI of a document (without fragment).
        return new this._impl(semantizer, resource, datasetCore);
    }

    public build(semantizer: Semantizer, sourceDataset?: DatasetSemantizer): DatasetSemantizer {
        const origin = sourceDataset? sourceDataset.getOrigin(): undefined;
        const dataset = new this._impl(semantizer, origin, sourceDataset); // warning: no check on params (TS mixin)
        return dataset;
    }

}