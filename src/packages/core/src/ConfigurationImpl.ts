import { Configuration, MixinFactoryConstructor, DataFactory, DatasetBaseFactory, DatasetImplConstructor, Loader, Quad } from "@semantizer/types";

type DatasetBaseFactoryConstructor<TBase extends DatasetImplConstructor> = new(impl: TBase) => DatasetBaseFactory;

interface ConfigurationConstructorParameters {
    loader: Loader;
    rdfModelDataFactory: DataFactory;
    datasetImpl: DatasetImplConstructor;//<SemantizerType>
    mixinFactoryImpl: MixinFactoryConstructor<any, any>;
    datasetBaseFactoryImpl: DatasetBaseFactoryConstructor<any>;

    // datasetSemantizerBaseRdfjsImpl: DatasetSemantizerBaseRdfjsConstructor,
    // datasetMixin?: DatasetSemantizer //DatasetMixin,
    // datasetMixin: (Base: DatasetImpl) => Constructor<DatasetMixin>
}

export class ConfigurationImpl implements Configuration {

    private _loader: Loader;
    private _rdfModelDataFactory: DataFactory;
    private _mixinFactoryImpl: MixinFactoryConstructor<any, any>;
    private _datasetImpl: DatasetImplConstructor;
    private _datasetBaseFactory: DatasetBaseFactory;

    public constructor(params: ConfigurationConstructorParameters) {
        this._loader = params.loader;
        this._datasetImpl = params.datasetImpl;
        this._rdfModelDataFactory = params.rdfModelDataFactory;
        this._mixinFactoryImpl = params.mixinFactoryImpl;
        this._datasetBaseFactory = new (params.datasetBaseFactoryImpl)(params.datasetImpl);
    }

    public getMixinFactoryImpl(): MixinFactoryConstructor<any, any> {
        return this._mixinFactoryImpl;
    }

    public getDatasetBaseFactory(): DatasetBaseFactory {
        return this._datasetBaseFactory;
    }

    public getLoader(): Loader {
        return this._loader;
    }

    public getRdfDataModelFactory(): DataFactory<Quad, Quad> {
        return this._rdfModelDataFactory;
    }

    public getDatasetImpl(): DatasetImplConstructor { 
        return this._datasetImpl;
    }
    
}