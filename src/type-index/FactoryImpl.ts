import { Context } from "../core/Context";
import { ContainedThingOf, Document, SelfDescribingThingOf, StatementOf } from "../core/Document";
import { Factory } from "../core/Factory";
import Resource from "../core/Resource";
import { Statement } from "../core/Statement.js";
import { Thing } from "../core/Thing";
import { TypeIndex, TypeIndexReadonly, TypeIndexSelfDescribingThing } from "./TypeIndex";
import { TypeIndexImpl } from "./TypeIndexImpl.js";
import { TypeIndexRegistration } from "./TypeIndexRegistration.js";
import TypeIndexRegistrationImpl from "./TypeIndexRegistrationImpl.js";
import { TYPE_INDEX } from "./Vocabulary";

//const ThingWithHelpers = ThingWithHelpersMixin(ThingImpl);

type WrappedDocument = Document<TypeIndex, TypeIndexReadonly>;

// Should be moved to a core class/interface
type DocumentConstructor = new (factory: Factory<TypeIndex>) => Document<TypeIndex, TypeIndexReadonly>;
//type ThingConstructor = new (document: TypeIndex) => TypeIndexSelfDescribingThing | TypeIndexRegistration;
type StatementConstructor = new (thing: TypeIndexRegistration, subject: string, value: string | Resource, datatype?: string | Resource, language?: string) => Statement<TypeIndexRegistration> //<TypeIndex>>;
type SelfDescribingThingConstructor = new (document: TypeIndex) => TypeIndexSelfDescribingThing; //Thing<Statement<TypeIndexSelfDescribingThing>, TypeIndex>;
type ContainedThingConstructor = new (document: TypeIndex) => Thing<Statement<TypeIndexRegistration>, TypeIndex>; //TypeIndexRegistration;

// The decorated factory could be generalized <DocumentImpl, ThingImpl, StatementImpl>.
// We can create a type helper to gather these parameters like TypeHelper<DocumentImpl, ThingImpl, StatementImpl> 
// so the factory will be Factory<T extends TypeHelper>. We can even take the different mixins as input so the type 
// helper would be TypeHelper<Implems, Mixins>, Implems<DocumentImpl, ThingImpl, StatementImpl> and 
// Mixins<DocumentMixin, ThingMixin, StatementMixin>. Or the TypeHelper could accept as parameters 
// Mixins directly like <TypeIndexMixin<WrappedDocumentImpl>, ...> ?
export class FactoryImpl<
    WrappedDocumentImpl extends DocumentConstructor, //Constructor<Document<TypeIndex, TypeIndexReadonly>>
    WrappedContainedThingImpl extends ContainedThingConstructor,
    WrappedSelfDescribingThingImpl extends SelfDescribingThingConstructor, //<TypeIndexSelfDescribingThing | TypeIndexRegistration>,
    WrappedStatementImpl extends StatementConstructor
> implements Factory<TypeIndex> {

    private _WrappedDocumentImpl: WrappedDocumentImpl;
    private _WrappedContainedThingImpl: WrappedContainedThingImpl;
    private _WrappedSelfDescribingThingImpl: WrappedSelfDescribingThingImpl;
    private _WrappedStatementImpl: WrappedStatementImpl;

    constructor(documentImpl: WrappedDocumentImpl, containedThingImpl: WrappedContainedThingImpl, selfDescribingThingImpl: WrappedSelfDescribingThingImpl, statementImpl: WrappedStatementImpl) {
        this._WrappedDocumentImpl = documentImpl;
        this._WrappedContainedThingImpl = containedThingImpl,
        this._WrappedSelfDescribingThingImpl = selfDescribingThingImpl;
        this._WrappedStatementImpl = statementImpl;
    }

    public createDocument(uri?: string | undefined, context?: Context | undefined): TypeIndex {
        //const TypeIndexDocument = TypeIndexMixin<WrappedDocumentImpl>(this._WrappedDocumentImpl);
        //return new TypeIndexDocument(new this._WrappedDocumentImpl(this)); // can use mixin
        return new TypeIndexImpl(new this._WrappedDocumentImpl(this)); // or class directly
    }
    
    public createThingToDescribeDocument(document: TypeIndex): SelfDescribingThingOf<TypeIndex> {
        return new this._WrappedSelfDescribingThingImpl(document)
            .createStatement("rdf:type", TYPE_INDEX.TypeIndex)
            .createStatement("rdf:type", TYPE_INDEX.ListedDocument);
        // return new ThingWithHelpers(typeIndex, ThingType.ForDescribing)
        //     .addRdfTypeStatement("solid:TypeIndex")
        //     .addRdfTypeStatement("solid:ListedDocument");
    }
    
    public createThing(document: TypeIndex, uri: string): ContainedThingOf<TypeIndex> {
        return new TypeIndexRegistrationImpl(new this._WrappedContainedThingImpl(document));
    }
    
    public createThingWithoutUri(document: TypeIndex, nameHint?: string | undefined): TypeIndexRegistration {
        throw new Error("Method not implemented.");
    }
    
    // Maybe add a mathod to create statement for self describing thing
    public createStatement(thing: TypeIndexRegistration, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<TypeIndex> {
        return new this._WrappedStatementImpl(thing, about, value, datatype, language);
    }

}