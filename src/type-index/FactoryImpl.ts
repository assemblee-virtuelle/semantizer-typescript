import StatementImpl from "../core-default/StatementImpl.js";
import { Context } from "../core/Context";
import { ContainedThingOf, Document, SelfDescribingThingOf, StatementOf } from "../core/Document";
import { Factory } from "../core/Factory";
import Resource from "../core/Resource";
import { TypeIndex, TypeIndexReadonly, TypeIndexSelfDescribingThing } from "./TypeIndex";
import { TypeIndexMixin } from "./TypeIndexImpl.js";
import { TypeIndexRegistration } from "./TypeIndexRegistration.js";
import TypeIndexRegistrationImpl from "./TypeIndexRegistrationImpl.js";

//const ThingWithHelpers = ThingWithHelpersMixin(ThingImpl);

type WrappedDocument = Document<TypeIndex, TypeIndexReadonly>;

// Should be moved to a core class/interface
type DocumentConstructor = new (factory: Factory<TypeIndex>) => Document<TypeIndex, TypeIndexReadonly>;
type ThingConstructor<T> = new (document: TypeIndex) => T;

// The decorated factory could be generalized <DocumentImpl, ThingImpl, StatementImpl>.
// We can create a type helper to gather these parameters like TypeHelper<DocumentImpl, ThingImpl, StatementImpl> 
// so the factory will be Factory<T extends TypeHelper>. We can even take the different mixins as input so the type 
// helper would be TypeHelper<Implems, Mixins>, Implems<DocumentImpl, ThingImpl, StatementImpl> and 
// Mixins<DocumentMixin, ThingMixin, StatementMixin>.
export class FactoryImpl<
    WrappedDocumentImpl extends DocumentConstructor, //Constructor<Document<TypeIndex, TypeIndexReadonly>>
    WrappedThingImpl extends ThingConstructor<TypeIndexSelfDescribingThing>
> implements Factory<TypeIndex> {

    private _WrappedDocumentImpl: WrappedDocumentImpl;
    private _WrappedThingImpl: WrappedThingImpl;

    constructor(documentImpl: WrappedDocumentImpl, thingImpl: WrappedThingImpl) {
        this._WrappedDocumentImpl = documentImpl;
        this._WrappedThingImpl = thingImpl;
    }

    public createDocument(uri?: string | undefined, context?: Context | undefined): TypeIndex {
        const TypeIndexDocument = TypeIndexMixin<WrappedDocumentImpl>(this._WrappedDocumentImpl);
        return new TypeIndexDocument(new this._WrappedDocumentImpl(this));
    }
    
    // TypeIndexSelfDescribingThing extends Thing<Statement<TypeIndexSelfDescribingThing>, TypeIndex>
    public createThingToDescribeDocument(document: TypeIndex): SelfDescribingThingOf<TypeIndex> {
        //return new ThingImpl<Statement<SelfDescribingThingOf<TypeIndex>>, TypeIndex>(document)
        return new this._WrappedThingImpl(document)
            .createStatement("rdf:type", "solid:TypeIndex")
            .createStatement("rdf:type", "solid:ListedDocument");
        // return new ThingWithHelpers(typeIndex, ThingType.ForDescribing)
        //     .addRdfTypeStatement("solid:TypeIndex")
        //     .addRdfTypeStatement("solid:ListedDocument");
    }
    
    public createThing(document: TypeIndex, uri: string): ContainedThingOf<TypeIndex> {
        return new TypeIndexRegistrationImpl(document, uri);
    }
    
    public createThingWithoutUri(document: TypeIndex, nameHint?: string | undefined): TypeIndexRegistration {
        throw new Error("Method not implemented.");
    }
    
    // Maybe add a mathod to create statement for self describing thing
    public createStatement(thing: TypeIndexRegistration, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<TypeIndex> {
        return new StatementImpl(thing, about, value, datatype, language);
    }

}