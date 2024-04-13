import StatementImpl from "../core-default/StatementImpl.js";
import { TypeIndexImpl } from "./TypeIndexImpl.js";
import TypeIndexRegistrationImpl from "./TypeIndexRegistrationImpl.js";
export class FactoryImpl {
    constructor(factory) {
        this._documentFactory = factory;
    }
    createDocument(uri, context) {
        const documentImpl = this._documentFactory.createDocument();
        //const doc = new DocumentImpl<TypeIndex, TypeIndexReadonly>(this as Factory<TypeIndex>);
        return new TypeIndexImpl(documentImpl);
    }
    // TypeIndexSelfDescribingThing extends Thing<Statement<TypeIndexSelfDescribingThing>, TypeIndex>
    createThingToDescribeDocument(document) {
        //return new ThingImpl<Statement<SelfDescribingThingOf<TypeIndex>>, TypeIndex>(document)
        return this._documentFactory.createThingToDescribeDocument(document.getWrappedDocument())
            .createStatement("rdf:type", "solid:TypeIndex")
            .createStatement("rdf:type", "solid:ListedDocument");
        // return new ThingWithHelpers(typeIndex, ThingType.ForDescribing)
        //     .addRdfTypeStatement("solid:TypeIndex")
        //     .addRdfTypeStatement("solid:ListedDocument");
    }
    createThing(document, uri) {
        return new TypeIndexRegistrationImpl(document, uri);
    }
    createThingWithoutUri(document, nameHint) {
        throw new Error("Method not implemented.");
    }
    // Maybe add a mathod to create statement for self describing thing
    createStatement(thing, about, value, datatype, language) {
        return new StatementImpl(thing, about, value, datatype, language);
    }
}
//# sourceMappingURL=FactoryImpl.js.map