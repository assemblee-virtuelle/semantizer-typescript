import { PersonFactory } from "@datafoodconsortium/connector-test";
import { DatasetRdfjsFactory, DatasetMixin, DatasetImpl } from "@semantizer/core-rdfjs";
import { LoaderRdfjs } from "@semantizer/loader-rdfjs";
import { SolidWebIdProfileFactory } from "@semantizer/solid-webid";
import Semantizer from "@semantizer/core-default";

// TODO: 
// - add a rdfs-seeAlso mixin
// - use a DatasetExt ?
// - loader VS fetcher ?
// - in mixins, use the loader from semantizer and accept an overload
// - add a core package and use the core-default as a pre-configured installation
// - TO CHECK: construct the person from a profileDocument or profile?
// - add a lastLoaded atribute in dataset ?
// - add loadAndGet() methods? like loadAndGetPrimaryTopic()?
// - add a param (factory: Factory) to get specific concrete types returned from getters (ex: getPrimaryTopic() => Person);
// - [x] add a Semantizer at the Dataset level, to get access to the loader?
// - [x] add a Semantizer class to host the config (loader, DatasetImpl, etc)
// - [x] add a load() method to load the object itself
const test = async () => {
    const loader = new LoaderRdfjs();
    const semantizer = new Semantizer(DatasetMixin(DatasetImpl), loader); // can pass a DatasetFactory instead?

    const webId = "http://localhost:8000/lecoqlibre/profile/card#me";

    const solidProfileDocument = await SolidWebIdProfileFactory(semantizer).load(webId);
    await solidProfileDocument.loadExtendedProfile(loader);
    const solidProfile = solidProfileDocument.getPrimaryTopic(); // if load() returns this, can be done on a single line
    await solidProfile.load(loader); // if primary topic is located elsewhere
    
    // if (solidProfile.isTypeOf(connector.TYPES.PERSON)) {
        const person = PersonFactory(semantizer).build(solidProfileDocument); // WARNING HERE : MUST PASS A DOCUMENT!
        console.log(person.getName());
        for (const enterprise of person.getAffiliatedEnterprises()) {
            await enterprise.load(loader);
            console.log(enterprise.getName());
            for (const catalog of enterprise.getMaintainedCatalogs()) {
                await catalog.load(loader);
                console.log(catalog.getName());
            }
        }
    // }

    /*
    if (extentedProfile.isTypeOf(connector.TYPES.PERSON)) {
        const person = PersonFactory.build(extendedProfile);
        console.log(person.getName());

        for (const enterprise of person.getAffiliatedEnterprises()) {
            // can be in enterprise.autoload()?
            await enterprise.load(enterprise.getDatasetUri(), loader); // load the enterprise if located elsewhere
            await enterprise.load(enterprise.getPrimaryTopic().getDatasetUri(), loader); // load the enterprise profile if located elsewhere
            await enterprise.load(enterprise.getPrimaryTopic().getSeeAlso().getDatasetUri(), loader); // load the enterprise extended profile if located elsewhere
            console.log(enterprise.getName());

            for (const catalog of enterprise.getMaintainedCatalogs()) {
                await catalog.load(catalog.getDatasetUri(), loader);
                console.log(catalog.getName());
            }
        }

    }
    */
}

test();

    // const solidProfileDocument = await SolidWebIdProfileFactory.load(webId, loader, WebIdMixinImpl); // Should pass a DatasetImpl instead
    // semantizer.load(webId, )
    //const solidProfileDocument = await SolidWebIdProfileFactory.loadFrom(webId, loader, DatasetImpl); // 

// ----> pass a DatasetImpl => and get a MixinImpl like WebIdPofileMixin(DatasetMixin(DatasetImpl));

// const DatasetMixinImpl = DatasetMixin(DatasetImpl);
// const WebIdMixinImpl = WebIdProfileMixin(DatasetMixinImpl);
// const SolidWebIdProfileMixinImpl = SolidWebIdProfileMixin(WebIdProfileMixin(DatasetMixin(DatasetImpl)));

// const SolidWebIdProfileMixinImpl = SolidWebIdProfileMixin(WebIdMixinImpl);

// type SolidWebIdMixin<TBase extends WebIdProfileConstructor> = (Base: TBase) => SolidWebIdProfile

// const semantizer = new Semantizer(new LoaderRdfjs); // from @semantizer/core-rdfjs

// import semantizer from "@semantizer/config";
// semantizer.setLoader(new LoaderRdfjs());
// semantizer.setDatasetImpl(DatesetImpl);

// import semantizer

// faire un package factory en plus pour chaque package comme @semantizer/solid-webid-factory-rdfjs

// avoir un constructeur de factory
// const factoryBuilder = new FactoryBuilder(new LoaderRdfjs, DatasetImpl);
// const SolidWebIdProfileFactory = factoryBuilder.build()

// const SolidWebIdProfileFactory = semantizer.makeFactory(WebIdProfileMixin(DatasetMixin(DatasetImpl)), SolidWebIdProfileMixin)
// const SolidWebIdProfileFactory = semantizer.makeFactory(SolidWebIdProfileMixin)

// const enterpriseProfileDocument: Dataset = await loadWithoutSeeAlso(webId, WebIdFactory);
    // const enterpriseProfile: Dataset = await enterpriseProfileDocument.getPrimaryTopic(loadWithSeeAlso, SolidWebIdProfileFactory); // consolidated document / document set / dataset
    // const catalogs = enterpriseProfile.getMaintainedCatalogs(loader, CatalogFactory)
    
    // const profileDocument = await loader.load<WebIdProfile>(webId, new WebIdProfileFactory(DocumentImpl));
    //const webIdProfileFactory = new WebIdProfileFactory(DocumentImpl<Thing, Thing>, new DocumentImplFactoryImpl(ThingImpl, ThingImpl, StatementImpl));
    // const profileDocument = await webIdProfileFactory.load(webId, loader);

    // const mixinFactory = new MixinFactory(DocumentImpl<Thing, Thing>, new DocumentImplFactoryImpl(ThingImpl, ThingImpl, StatementImpl));
    // const profileDocument = await mixinFactory.load<WebIdProfile>(webId, (impl) => WebIdProfileMixin(impl), loader);
    // const profile = profileDocument.getPrimaryTopic(); //getThing(webId);


    /*
PREFIX ex: <http://example.org/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dfc-b: <https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#>

{
    <http://example.org/webId> a foaf:PersonalProfileDocument;
        foaf:primaryTopic <http://example.org/webId#it>.

    <http://example.org/webId#it> a foaf:Person;
        a dfc-b:Person;
        dfc-b:affiliatedBy <http://example.org/enterprise/index#it>;
        rdfs:seeAlso <http://example.org/extentedProfile>.
}

GRAPH <http://example.org/extentedProfile> {
    <http://example.org/webId#it> dfc-b:name "Name of the Person".
}

*/

/*
PREFIX ex: <http://example.org/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dfc-b: <https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#>

{
    <http://example.org/enterprise/index> a foaf:PersonalProfileDocument;
        foaf:primaryTopic <http://example.org/enterprise/index#it>;
        rdfs:seeAlso <http://example.org/anotherWebId>.

    <http://example.org/enterprise/index#it> a foaf:Organization;
        dfc-b:maintains <http://example.org/enterprise/catalog1/index>, 
            <http://example.org/enterprise/catalog2/index>;
        rdfs:seeAlso <http://example.org/enterprise/protected>.
}

GRAPH <http://example.org/enterprise/protected> {
    <http://example.org/enterprise/index#it> dfc-b:maintains <http://example.org/enterprise/catalog3/index>.
}
*/