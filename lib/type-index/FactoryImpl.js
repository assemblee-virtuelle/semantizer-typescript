import { TypeIndexImpl } from "./TypeIndexImpl.js";
import TypeIndexRegistrationImpl from "./TypeIndexRegistrationImpl.js";
// The decorated factory could be generalized <DocumentImpl, ThingImpl, StatementImpl>.
// We can create a type helper to gather these parameters like TypeHelper<DocumentImpl, ThingImpl, StatementImpl> 
// so the factory will be Factory<T extends TypeHelper>. We can even take the different mixins as input so the type 
// helper would be TypeHelper<Implems, Mixins>, Implems<DocumentImpl, ThingImpl, StatementImpl> and 
// Mixins<DocumentMixin, ThingMixin, StatementMixin>. Or the TypeHelper could accept as parameters 
// Mixins directly like <TypeIndexMixin<WrappedDocumentImpl>, ...> ?
export class FactoryImpl {
    constructor(documentImpl, containedThingImpl, selfDescribingThingImpl, statementImpl) {
        this._WrappedDocumentImpl = documentImpl;
        this._WrappedContainedThingImpl = containedThingImpl,
            this._WrappedSelfDescribingThingImpl = selfDescribingThingImpl;
        this._WrappedStatementImpl = statementImpl;
    }
    createDocument(uri, context) {
        //const TypeIndexDocument = TypeIndexMixin<WrappedDocumentImpl>(this._WrappedDocumentImpl);
        //return new TypeIndexDocument(new this._WrappedDocumentImpl(this)); // can use mixin
        return new TypeIndexImpl(new this._WrappedDocumentImpl(this)); // or class directly
    }
    createThingToDescribeDocument(document) {
        return new this._WrappedSelfDescribingThingImpl(document)
            .createStatement("rdf:type", "solid:TypeIndex")
            .createStatement("rdf:type", "solid:ListedDocument");
        // return new ThingWithHelpers(typeIndex, ThingType.ForDescribing)
        //     .addRdfTypeStatement("solid:TypeIndex")
        //     .addRdfTypeStatement("solid:ListedDocument");
    }
    createThing(document, uri) {
        return new TypeIndexRegistrationImpl(new this._WrappedContainedThingImpl(document));
    }
    createThingWithoutUri(document, nameHint) {
        throw new Error("Method not implemented.");
    }
    // Maybe add a mathod to create statement for self describing thing
    createStatement(thing, about, value, datatype, language) {
        return new this._WrappedStatementImpl(thing, about, value, datatype, language);
    }
}
//# sourceMappingURL=FactoryImpl.js.map