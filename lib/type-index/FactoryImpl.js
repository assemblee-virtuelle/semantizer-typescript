import { DocumentImpl } from "../core-default/DocumentImpl.js";
import ThingImpl from "../core-default/ThingImpl";
import ThingWithHelpersMixin from "../thing-helpers/ThingWithHelpersMixin";
import { TypeIndexImpl } from "./TypeIndexImpl";
import TypeIndexRegistrationImpl from "./TypeIndexRegistrationImpl.js";
const ThingWithHelpers = ThingWithHelpersMixin(ThingImpl);
export class FactoryImpl {
    /*private _documentFactory: Factory<Doc>;

    public constructor(documentFactory: Factory<Doc>) {
        this._documentFactory = documentFactory;

    }*/
    createDocument(uri, context) {
        const doc = new DocumentImpl(this);
        return new TypeIndexImpl(doc);
    }
    createThingToDescribeDocument(document) {
        throw new Error("Method not implemented.");
        //return new ThingImpl<TypeIndexDocument>(document);
        // return new ThingWithHelpers(typeIndex, ThingType.ForDescribing)
        //     .addRdfTypeStatement("solid:TypeIndex")
        //     .addRdfTypeStatement("solid:ListedDocument");
    }
    createThing(document, uri) {
        return new TypeIndexRegistrationImpl(document, uri); // as TypeIndexRegistrationThing;
    }
    createThingWithoutUri(document, nameHint) {
        throw new Error("Method not implemented.");
    }
    createStatement(thing, about, value, datatype, language) {
        throw new Error("Method not implemented.");
    }
}
const factory = new FactoryImpl();
const typeIndex = factory.createDocument();
typeIndex.createRegistration("ex:class");
//# sourceMappingURL=FactoryImpl.js.map