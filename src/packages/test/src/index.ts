import semantizer from "@semantizer/default";

// import { personFactory } from "@datafoodconsortium/connector-test";
// import { solidWebIdProfileFactory } from "@semantizer/solid-webid";
// import { DatasetImpl } from "@semantizer/dataset-rdfjs";
// import { DatasetWithOriginImpl } from "@semantizer/dataset-origin-rdfjs";
// import { DatasetMixin, datasetFactory } from "@semantizer/mixin-dataset";
import { datasetFactory } from "@semantizer/mixin-dataset";
import { webIdFactory } from "@semantizer/mixin-webid";
 
import dataFactory from "@rdfjs/data-model";

const test = async () => {
    const webId = "http://localhost:8000/lecoqlibre/profile/card#me";

    // const solidProfileDocument = await semantizer.load(webId, solidWebIdProfileFactory);
    // await solidProfileDocument.loadExtendedProfile();
    
    // // if (solidProfile.isTypeOf(connector.TYPES.PERSON)) {
    //     const person = /*connector.createPerson(solidProfileDocument);*/ semantizer.build(personFactory /*connector.getPersonFactory()*/, solidProfileDocument); // WARNING HERE : MUST PASS A DOCUMENT!
    //     console.log(person.getName());
    //     for (const enterprise of person.getAffiliatedEnterprises()) {
    //         await enterprise.load();
    //         await enterprise.loadExtendedProfile(); // load the enterprise extended profile if located elsewhere
    //         // await enterprise.load(loader, enterprise.getPrimaryTopic()); // load the enterprise profile if located elsewhere
    //         console.log(enterprise.getName());
    //         for (const catalog of enterprise.getMaintainedCatalogs()) {
    //             await catalog.load();
    //             console.log(catalog.getName());
    //         }
    //     }
    // // }

    // const DatasetType = DatasetMixin(DatasetImpl);
    // const DatasetWithOriginType = DatasetWithOriginMixin(DatasetMixin(DatasetWithOriginImpl));

    // const dataset = new DatasetType();
    
    // const DatasetWithOriginType = DatasetWithOriginMixin(DatasetMixin(DatasetWithOriginImpl));
    // const datasetWithOrigin = new DatasetWithOriginType("");

    const index = await semantizer.load('https://api.test-inria-index.startinblox.com/fedex/indexes/users/index'); //, datasetFactory); //WithOriginFactory);
    // const solidProfileDocument = await semantizer.load('https://api.test-inria-index.startinblox.com/fedex/profile', webIdFactory); //WithOriginFactory);
    // console.log(solidProfileDocument.getPrimaryTopic());

    // http://xmlns.com/foaf/0.1/primaryTopic
    const obj = index.getLinkedObject(dataFactory.namedNode('https://ns.inria.fr/idx/terms#hasShape'), dataFactory.namedNode('https://api.test-inria-index.startinblox.com/fedex/indexes/users/index#first_name'));
    console.log(obj); // _:b2

    // const obj2 = obj?.getLinkedObjectAll(dataFactory.namedNode('https://www.w3.org/ns/shacl#property'), obj);
    const properties = index.getLinkedObjectAll(dataFactory.namedNode('https://www.w3.org/ns/shacl#property'), obj);
    properties.forEach(o => console.log(o));

}

test();