import { DocumentImpl } from "../core-default/DocumentImpl.js";
import ThingImpl from "../core-default/ThingImpl";
import ThingWithHelpersMixin from "../thing-helpers/ThingWithHelpersMixin";
import { TypeIndexImpl } from "./TypeIndexImpl";
const ThingWithHelpers = ThingWithHelpersMixin(ThingImpl);
export class FactoryImpl {
    createDocument(uri, context) {
        const doc = new DocumentImpl(this);
        return new TypeIndexImpl(doc);
    }
    createThingToDescribeDocument(document) {
        throw new Error();
        // return new ThingWithHelpers(typeIndex, ThingType.ForDescribing)
        //     .addRdfTypeStatement("solid:TypeIndex")
        //     .addRdfTypeStatement("solid:ListedDocument");
    }
    createThing(document, uri) {
        throw new Error();
        // return new TypeIndexRegistrationImpl<Statement<TypeIndex>>(document, uri);// as TypeIndexRegistration<Statement<TypeIndex>>;
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