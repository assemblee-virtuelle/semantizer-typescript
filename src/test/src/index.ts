import { Connector } from "@datafoodconsortium/connector-test";
import { DocumentImpl, DocumentImplFactoryImpl, StatementImpl, ThingImpl } from "@semantizer/core-default";
import { LoaderRdfjs } from "@semantizer/loader-rdfjs";
import { Thing } from "@semantizer/types";
import { WebIdProfileFactory } from "@semantizer/webid";

const loader = new LoaderRdfjs();
// const semantizer = new SemantizerImpl;
const connector = new Connector();

// const promise = loader.load<TypeIndex>("", new TypeIndexFactory(DocumentImpl, ThingImpl<TypeIndexStatement>, ThingImplDefault, StatementImpl));
// promise.then(ti => ti.getRegistrationAllForClass(""));

const test = async () => {
    const webId = "http://localhost:8000/lecoqlibre/profile/card#me";
    
    // const profileDocument = await loader.load<WebIdProfile>(webId, new WebIdProfileFactory(DocumentImpl));
    const webIdProfileFactory = new WebIdProfileFactory(DocumentImpl<Thing, Thing>, new DocumentImplFactoryImpl(ThingImpl, ThingImpl, StatementImpl));
    const profileDocument = await webIdProfileFactory.load(webId, loader);
    const profile = profileDocument.getThing(webId);

    // console.log(profileDocument);

    if (profile.isTypeOf("https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#Person")) {
        const person = await connector.loadPerson(webId, loader);
        console.log(person.getName())

        for await (const enterprise of person.getAffiliatedEnterprises()) {
            console.log(enterprise.getName());
            for await (const catalog of enterprise.getMaintainedCatalogs()) {
                console.log(catalog.getName());
            }
        }

        // TODO: loader load only the catalog from the catalog book.
    }
}

test();

/*
class Semantizer {

    public load(): Promise<Document>;

}

const profileDocument = await semantizer.load(webId, WebIdProfile); // use the default loader

*/


