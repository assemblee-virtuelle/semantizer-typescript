import semantizer from "@semantizer/core-default";
import { PersonFactory } from "@datafoodconsortium/connector-test";
import { SolidWebIdProfileFactory } from "@semantizer/solid-webid";

// TODO: 
// - add a rdfs-seeAlso mixin
// - use a DatasetExt ?
// - loader VS fetcher ?
// - move the DatasetImpl class to the core package
// - type check the constructor params of datasets (Dataset.getObject, MixinFactory)
// - Ensure the person is builded from a profileDocument.
// - add a lastLoaded atribute in dataset ?
// - add a SPARQL mixin
// - implements access rights   
// - add loadAndGet() methods? like loadAndGetPrimaryTopic()?
// - add a param (factory: Factory) to get specific concrete types returned from getters (ex: getPrimaryTopic() => Person);
// - [x] Add Semantizer:load and Semantizer:build methods
// - [x] in mixins, use the loader from semantizer and accept an overload
// - [x] add a core package and use the core-default as a pre-configured installation
// - [x] add a Semantizer at the Dataset level, to get access to the loader?
// - [x] add a Semantizer class to host the config (loader, DatasetImpl, etc)
// - [x] add a load() method to load the object itself
const test = async () => {
    const webId = "http://localhost:8000/lecoqlibre/profile/card#me";

    const solidProfileDocument = await semantizer.load(webId, SolidWebIdProfileFactory);
    await solidProfileDocument.loadExtendedProfile();
    const solidProfile = solidProfileDocument.getPrimaryTopic(); // if load() returns this, can be done on a single line
    await solidProfile.load(); // if primary topic is located elsewhere
    
    // if (solidProfile.isTypeOf(connector.TYPES.PERSON)) {
        const person = semantizer.build(PersonFactory, solidProfileDocument); // WARNING HERE : MUST PASS A DOCUMENT!
        console.log(person.getName());
        for (const enterprise of person.getAffiliatedEnterprises()) {
            await enterprise.load();
            await enterprise.loadExtendedProfile(); // load the enterprise extended profile if located elsewhere
            // await enterprise.load(loader, enterprise.getPrimaryTopic()); // load the enterprise profile if located elsewhere
            console.log(enterprise.getName());
            for (const catalog of enterprise.getMaintainedCatalogs()) {
                await catalog.load();
                console.log(catalog.getName());
            }
        }
    // }

}

test();

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