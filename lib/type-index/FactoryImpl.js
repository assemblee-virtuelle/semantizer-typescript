import StatementImpl from "../core-default/StatementImpl.js";
import { TypeIndexMixin } from "./TypeIndexImpl.js";
import TypeIndexRegistrationImpl from "./TypeIndexRegistrationImpl.js";
// The decorated factory could be generalized <DocumentImpl, ThingImpl, StatementImpl>.
// We can create a type helper to gather these parameters like TypeHelper<DocumentImpl, ThingImpl, StatementImpl> 
// so the factory will be Factory<T extends TypeHelper>. We can even take the different mixins as input so the type 
// helper would be TypeHelper<Implems, Mixins>, Implems<DocumentImpl, ThingImpl, StatementImpl> and 
// Mixins<DocumentMixin, ThingMixin, StatementMixin>.
export class FactoryImpl {
    constructor(documentImpl, thingImpl) {
        this._WrappedDocumentImpl = documentImpl;
        this._WrappedThingImpl = thingImpl;
    }
    createDocument(uri, context) {
        const TypeIndexDocument = TypeIndexMixin(this._WrappedDocumentImpl);
        return new TypeIndexDocument(new this._WrappedDocumentImpl(this));
    }
    // TypeIndexSelfDescribingThing extends Thing<Statement<TypeIndexSelfDescribingThing>, TypeIndex>
    createThingToDescribeDocument(document) {
        //return new ThingImpl<Statement<SelfDescribingThingOf<TypeIndex>>, TypeIndex>(document)
        return new this._WrappedThingImpl(document)
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