import { ConnectorImpl } from "@datafoodconsortium/connector-test";
import { DocumentImpl, DocumentImplFactoryImpl, StatementImpl, ThingImpl } from "@semantizer/core-default";
import { LoaderRdfjs } from "@semantizer/loader-rdfjs";
import { MixinFactory } from "@semantizer/mixins";
import { Thing } from "@semantizer/types";
import { WebIdProfile, WebIdProfileMixin } from "@semantizer/webid";

const loader = new LoaderRdfjs();
const connector = new ConnectorImpl();

const test = async () => {
    const webId = "http://localhost:8000/lecoqlibre/profile/card#me";
    
    // const profileDocument = await loader.load<WebIdProfile>(webId, new WebIdProfileFactory(DocumentImpl));
    //const webIdProfileFactory = new WebIdProfileFactory(DocumentImpl<Thing, Thing>, new DocumentImplFactoryImpl(ThingImpl, ThingImpl, StatementImpl));
    // const profileDocument = await webIdProfileFactory.load(webId, loader);

    const mixinFactory = new MixinFactory(DocumentImpl<Thing, Thing>, new DocumentImplFactoryImpl(ThingImpl, ThingImpl, StatementImpl));
    const profileDocument = await mixinFactory.load<WebIdProfile>(webId, (impl) => WebIdProfileMixin(impl), loader);
    const profile = profileDocument.getPrimaryTopic(); //getThing(webId);

    if (profile.isTypeOf("https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#Person")) {
        const person = await connector.loadPerson(webId, loader);
        console.log(person.getName())

        for await (const enterprise of person.getAffiliatedEnterprises()) {
            console.log(enterprise.getName());
            for await (const catalog of enterprise.getMaintainedCatalogs()) {
                console.log(catalog.getName());
            }
        }

    }
}

test();