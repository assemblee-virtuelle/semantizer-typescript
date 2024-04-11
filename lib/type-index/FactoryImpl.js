import { DocumentImpl } from "../core-default/DocumentImpl.js";
import StatementImpl from "../core-default/StatementImpl.js";
import ThingImpl from "../core-default/ThingImpl.js";
import ThingWithHelpersMixin from "../thing-helpers/ThingWithHelpersMixin.js";
import { TypeIndexImpl } from "./TypeIndexImpl.js";
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
        //throw new Error("Method not implemented.");
        console.log("PASSED");
        return new ThingImpl(document)
            .createStatement("rdf:type", "solid:TypeIndex")
            .createStatement("rdf:type", "solid:ListedDocument");
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
    // Maybe add a mathod to create statement for self describing thing
    createStatement(thing, about, value, datatype, language) {
        return new StatementImpl(thing, about, value, datatype, language);
    }
}
/*const factory = new FactoryImpl();
const typeIndex = factory.createDocument();
const reg = typeIndex.createRegistration("ex:class");
reg.getDocument()*/ 
//# sourceMappingURL=FactoryImpl.js.map