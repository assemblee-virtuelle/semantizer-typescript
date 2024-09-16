import semantizer from "@semantizer/default";

// import { personFactory } from "@datafoodconsortium/connector-test";
// import { solidWebIdProfileFactory } from "@semantizer/solid-webid";
// import { DatasetImpl } from "@semantizer/dataset-rdfjs";
// import { DatasetWithOriginImpl } from "@semantizer/dataset-origin-rdfjs";
// import { DatasetMixin, datasetFactory } from "@semantizer/mixin-dataset";
import { datasetFactory } from "@semantizer/mixin-dataset";

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

    const solidProfileDocument = await semantizer.load('https://api.test-inria-index.startinblox.com/fedex/indexes/users/index'); //, datasetFactory); //WithOriginFactory);
    console.log(solidProfileDocument);

    // http://xmlns.com/foaf/0.1/primaryTopic
    // const obj = solidProfileDocument.getThingLinked(dataFactory.namedNode('https://api.test-inria-index.startinblox.com/fedex/indexes/users/index#first_name'), dataFactory.namedNode('https://ns.inria.fr/idx/terms#hasShape'));
    // console.log(obj); // _:b2

    // const obj2 = obj?.getThingLinkedAll(obj, dataFactory.namedNode('https://www.w3.org/ns/shacl#property'));
    // console.log(obj2);

}

test();