import { Configuration, Constructor, Semantizer, DatasetSemantizer, MixinFactory, MixinFactoryFunction } from "@semantizer/types";
import { MixinFactoryImpl } from "./MixinFactoryImpl.js";

export class SemantizerImpl implements Semantizer {

    private _configuration: Configuration;

    public constructor(configuration: Configuration) {
        this._configuration = configuration;
    }
    
    public getConfiguration(): Configuration {
        return this._configuration;
    }

    public setConfiguration(configuration: Configuration): void {
        this._configuration = configuration;
    }

    // don't move mixinFactory into Config because otherwise, config will depend on Semantizer
    public getMixinFactory<TBase extends Constructor, TMixin extends DatasetSemantizer>(mixin: (Base: TBase) => Constructor<TMixin>, baseClass: TBase): MixinFactory<TBase, TMixin> {
        return new MixinFactoryImpl(this, mixin, baseClass);
    }

    public async load<TBase extends Constructor, TMixin extends DatasetSemantizer>(resource: string): Promise<DatasetSemantizer>;
    public async load<TBase extends Constructor, TMixin extends DatasetSemantizer>(resource: string, mixinFactoryFunction: MixinFactoryFunction<TBase, TMixin>): Promise<TMixin>;
    public async load<TBase extends Constructor, TMixin extends DatasetSemantizer>(resource: string, mixinFactoryFunction?: MixinFactoryFunction<TBase, TMixin>): Promise<DatasetSemantizer | TMixin> {
        return mixinFactoryFunction ? await mixinFactoryFunction(this).load(resource) : this.getConfiguration().getDatasetBaseFactory().load(this, resource);
    }

    public build<TBase extends Constructor, TMixin extends DatasetSemantizer>(): DatasetSemantizer;
    public build<TBase extends Constructor, TMixin extends DatasetSemantizer>(mixinFactoryFunction: MixinFactoryFunction<TBase, TMixin>): TMixin;
    public build<TBase extends Constructor, TMixin extends DatasetSemantizer>(mixinFactoryFunction: MixinFactoryFunction<TBase, TMixin>, fromDataset?: DatasetSemantizer): TMixin;
    public build<TBase extends Constructor, TMixin extends DatasetSemantizer>(mixinFactoryFunction?: MixinFactoryFunction<TBase, TMixin>, fromDataset?: DatasetSemantizer): DatasetSemantizer | TMixin {
        return mixinFactoryFunction ? mixinFactoryFunction(this).build(fromDataset) : this.getConfiguration().getDatasetBaseFactory().build(this, fromDataset);
    }

}