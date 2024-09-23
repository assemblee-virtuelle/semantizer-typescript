import semantizer from "@semantizer/default";
// import { personFactory } from "@datafoodconsortium/connector-test";
// import { solidWebIdProfileFactory } from "@semantizer/solid-webid";

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

}

test();