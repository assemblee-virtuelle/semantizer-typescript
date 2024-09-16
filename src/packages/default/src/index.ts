import dataFactory from "@rdfjs/data-model";
import { ConfigurationImpl, DatasetBaseFactoryImpl, MixinFactoryImpl, SemantizerImpl } from "@semantizer/core";
import { DatasetCoreRdfjsImpl } from "@semantizer/core-rdfjs";
import { DatasetMixin } from "@semantizer/mixin-dataset";
import { LoaderRdfjs } from "@semantizer/loader-rdfjs";

const semantizer = new SemantizerImpl(
    new ConfigurationImpl({
        loader: new LoaderRdfjs(),
        datasetImpl: DatasetMixin(DatasetCoreRdfjsImpl),
        rdfModelDataFactory: dataFactory,
        mixinFactoryImpl: MixinFactoryImpl,
        datasetBaseFactoryImpl: DatasetBaseFactoryImpl
    })
);

export default semantizer;