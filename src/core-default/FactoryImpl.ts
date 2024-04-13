import { Context } from "../core/Context";
import { ContainedThingOf, Document, DocumentBase, InputOf, OutputOf, SelfDescribingThingOf, StatementOf } from "../core/Document";
import Factory from "../core/Factory";
import Resource from "../core/Resource";
import { DocumentImpl } from "./DocumentImpl.js";
import ThingImpl from "./ThingImpl.js";

// type StatementType = Statement<Thing<any, any>>;
// type StatementTypeReadonly = StatementReadonly<ThingReadonly<any, any>>;
// type ThingType = Thing<StatementType, Document<any, any>>;
// type ThingTypeReadonly = ThingReadonly<StatementTypeReadonly, DocumentReadonly<any, any>>;


// type DocRead = DocumentBase<ThingReadonly<StatementReadonly<any>, any>, ThingReadonly<StatementReadonly<any>, any>>;
// DocumentBase<ThingReadonly<StatementReadonly<any>, any>, ThingReadonly<StatementReadonly<any>, any>>,
// type DocumentType = Document<DocumentBase<ThingType, ThingType>, DocRead>;
// type DocumentTypeReadonly = DocumentReadonly<DocRead, DocumentType>;

//type t = InputOf<DocumentType>;

// export type TypeIndex = Document<TypeIndexBase, TypeIndexBaseReadonly> &
//     WithReadOperations<TypeIndexRegistration> & 
//     WithWriteOperations<TypeIndexRegistration>;

// GET => Document<TypeIndex, TypeIndexReadonly>

export class FactoryImpl<
    DocumentType extends Document<any, any>, // TypeIndex or Document
    DocumentTypeReadonly extends DocumentBase<any, any> // TypeIndexReadonly
> implements Factory<Document<DocumentType, DocumentTypeReadonly>> { //<DocumentType, DocumentTypeReadonly>> {

    public createDocument(uri?: string, context?: Context): Document<DocumentType, DocumentTypeReadonly> {
        return new DocumentImpl<InputOf<DocumentType>, OutputOf<DocumentType>>(this);// as Factory<DocumentType>);
    }

    /*public createDocumentReadonly(document: Document<DocumentType, DocumentTypeReadonly>): DocumentTypeReadonly {
        throw new Error("Method not implemented.");
    }*/

    public createThingToDescribeDocument(document: Document<DocumentType, DocumentTypeReadonly>): SelfDescribingThingOf<DocumentType> { 
        return new ThingImpl<StatementOf<typeof document>, typeof document>(document); // as SelfDescribingThingOf<typeof document>; //<Statement<ThingType>, DocumentType>(document);
    }

    public createThing(document: Document<DocumentType, DocumentTypeReadonly>, uri: string): ContainedThingOf<DocumentType> {
        throw new Error("Method not implemented.");//return new ThingImpl<Statement<ThingType>, DocumentType>(document);
    }

    public createThingWithoutUri(document: Document<DocumentType, DocumentTypeReadonly>, nameHint?: string): ContainedThingOf<DocumentType> {
        throw new Error("Method not implemented.");//return new ThingImpl<Statement<ThingType>, DocumentType>(document);
    }

    public createStatement(thing: ContainedThingOf<DocumentType>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<DocumentType> {
        throw new Error("Method not implemented.");//return new StatementImpl(thing, about, value, datatype, language);
    }

}

/*export class FactoryImplForCopying implements FactoryForCopying<DocumentType> {

    createDocument(document: DocumentType): DocumentTypeReadonly {
        throw new Error("Method not implemented.");
        //return Object.freeze(new DocumentImplReadonly<ThingTypeReadonly, ThingTypeReadonly, ThingType, ThingType>(document));
    }
    createThingToDescribeDocument(thing: ThingType): ThingTypeReadonly {
        throw new Error("Method not implemented.");
    }
    createThing(thing: ThingType): ThingTypeReadonly {
        throw new Error("Method not implemented.");
    }
    createThingWithoutUri(thing: ThingType): ThingTypeReadonly {
        throw new Error("Method not implemented.");
    }
    createStatement(statement: StatementType): StatementTypeReadonly {
        throw new Error("Method not implemented.");
    }

}*/