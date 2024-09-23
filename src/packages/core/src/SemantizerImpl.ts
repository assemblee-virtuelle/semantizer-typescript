import { Configuration, Constructor, Semantizer, DatasetSemantizer, MixinFactory, MixinFactoryFunction, DatasetImplConstructor, QuadIterableSemantizer } from "@semantizer/types";
import { MixinFactoryImpl } from "./MixinFactoryImpl.js";

type T = new (...args: any[]) => DatasetSemantizer;

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
    public getMixinFactory<TMixin extends DatasetSemantizer>(mixin: (Base: DatasetImplConstructor) => Constructor<TMixin>): MixinFactory<DatasetImplConstructor, TMixin>;
    public getMixinFactory<TBase extends Constructor, TMixin extends DatasetSemantizer>(mixin: (Base: TBase) => Constructor<TMixin>, baseClass: TBase): MixinFactory<TBase, TMixin>;
    public getMixinFactory<TBase extends Constructor, TMixin extends DatasetSemantizer>(mixin: (Base: TBase | DatasetImplConstructor) => Constructor<TMixin>, baseClass?: TBase): MixinFactory<DatasetImplConstructor, TMixin> | MixinFactory<TBase, TMixin> {
        return baseClass ? new MixinFactoryImpl(this, mixin, baseClass) : new MixinFactoryImpl<DatasetImplConstructor, TMixin>(this, mixin, this.getConfiguration().getDatasetImpl());
    }

    public async load<TBase extends Constructor, TMixin extends DatasetSemantizer>(resource: string): Promise<DatasetSemantizer>;
    public async load<TBase extends Constructor, TMixin extends DatasetSemantizer>(resource: string, mixinFactoryFunction: MixinFactoryFunction<TBase, TMixin>): Promise<TMixin>;
    public async load<TBase extends Constructor, TMixin extends DatasetSemantizer>(resource: string, mixinFactoryFunction?: MixinFactoryFunction<TBase, TMixin>): Promise<DatasetSemantizer | TMixin> {
        return mixinFactoryFunction ? await mixinFactoryFunction(this).load(resource) : this.getConfiguration().getDatasetBaseFactory().load(this, resource);
    }

    public build<TBase extends Constructor, TMixin extends DatasetSemantizer>(): DatasetSemantizer;
    public build<TBase extends Constructor, TMixin extends DatasetSemantizer>(fromDataset: QuadIterableSemantizer): DatasetSemantizer;
    public build<TBase extends Constructor, TMixin extends DatasetSemantizer>(mixinFactoryFunction: MixinFactoryFunction<TBase, TMixin>): TMixin;
    public build<TBase extends Constructor, TMixin extends DatasetSemantizer>(mixinFactoryFunction: MixinFactoryFunction<TBase, TMixin>, fromDataset?: QuadIterableSemantizer): TMixin;
    public build<TBase extends Constructor, TMixin extends DatasetSemantizer>(mixinFactoryFunctionOrDataset?: MixinFactoryFunction<TBase, TMixin> | QuadIterableSemantizer, fromDataset?: QuadIterableSemantizer): DatasetSemantizer | TMixin {
        return mixinFactoryFunctionOrDataset && typeof mixinFactoryFunctionOrDataset === 'function' ? mixinFactoryFunctionOrDataset(this).build(fromDataset) : this.getConfiguration().getDatasetBaseFactory().build(this, mixinFactoryFunctionOrDataset ?? fromDataset);
    }

}