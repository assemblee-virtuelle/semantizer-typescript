import { Context } from "../core/Context";
import { Document, ContainedThingOf, DocumentReadonly, SelfDescribingThingOf, StatementOf } from "../core/Document";
import Factory, { FactoryForCopying } from "../core/Factory";
import Resource from "../core/Resource";
import { Statement, StatementReadonly } from "../core/Statement";
import { Thing, ThingReadonly } from "../core/Thing";
import { DocumentImpl, DocumentImplReadonly } from "./DocumentImpl.js";
import StatementImpl from "./StatementImpl.js";
import ThingImpl from "./ThingImpl.js";

// type DocumentTypeReadonly = DocumentReadonly<ThingImpl<StatementImpl>, ThingImpl<StatementImpl>>;
// type DocumentDefaultImplReadonly = DocumentImpl<ThingImpl<StatementImpl>, ThingImpl<StatementImpl>>;

//type DocumentType = Document<Thing<Statement>, Thing<Statement>>;
type StatementType = Statement<Thing<any, any>>;
type StatementTypeReadonly = StatementReadonly<ThingReadonly<any, any>>;
type ThingType = Thing<StatementType, Document<any, any, any, any>>;
type ThingTypeReadonly = ThingReadonly<StatementTypeReadonly, DocumentReadonly<any, any, any, any>>;

type DocumentType = Document<ThingType, ThingType, ThingTypeReadonly, ThingTypeReadonly>;
type DocumentTypeReadonly = DocumentReadonly<ThingTypeReadonly, ThingTypeReadonly, ThingType, ThingType>;

export class FactoryImpl implements Factory<DocumentType> {

    public createDocument(uri?: string, context?: Context): DocumentType {
        return new DocumentImpl<ThingType, ThingType, ThingTypeReadonly, ThingTypeReadonly>(this as Factory<DocumentType>);// as DocumentType;
    }

    public createDocumentReadonly(document: DocumentType): DocumentTypeReadonly {
        throw new Error("Method not implemented.");
    }

    public createThingToDescribeDocument(document: DocumentType): ThingType { //Of<typeof document> {
        return new ThingImpl<Statement<ThingType>, DocumentType>(document); // <Statement<ThingType>, DocumentType>
    }

    public createThing(document: DocumentType, uri: string): ThingType {
        return new ThingImpl<Statement<ThingType>, DocumentType>(document);
    }

    public createThingWithoutUri(document: DocumentType, nameHint?: string): ThingType {
        return new ThingImpl<Statement<ThingType>, DocumentType>(document);
    }

    public createStatement(thing: ContainedThingOf<DocumentType>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementType {
        return new StatementImpl(thing, about, value, datatype, language);// as StatementOf<DocumentType>;
    }

}

export class FactoryImplForCopying implements FactoryForCopying<DocumentType, DocumentTypeReadonly> {

    createDocument(document: DocumentType): DocumentTypeReadonly {
        return new DocumentImplReadonly<ThingTypeReadonly, ThingTypeReadonly, ThingType, ThingType>(document);
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

}

// export class FactoryImplReadonly implements Factory<DocumentTypeReadonly> {

//     private _factory = new FactoryImpl<DocumentDefaultImplReadonly>();

//     public createDocument(uri?: string, context?: Context): DocumentTypeReadonly {
//         const document = this._factory.createDocument() as DocumentTypeReadonly;
//         return Object.freeze(document);
//     }

//     public createThingToDescribeDocument(document: DocumentTypeReadonly): SelfDescribingThingOf<DocumentTypeReadonly> {
//         const thing = this._factory.createThingToDescribeDocument(document as DocumentDefaultImplReadonly);
//         return Object.freeze(thing) as SelfDescribingThingOf<DocumentTypeReadonly>;
//     }

//     public createThing(document: DocumentTypeReadonly, uri: string): ContainedThingOf<DocumentTypeReadonly> {
//         const thing = this._factory.createThing(document as DocumentDefaultImplReadonly, uri);
//         return Object.freeze(thing) as ContainedThingOf<DocumentTypeReadonly>;
//     }

//     public createThingWithoutUri(document: DocumentTypeReadonly, nameHint?: string): ContainedThingOf<DocumentTypeReadonly> {
//         const thing = this._factory.createThingWithoutUri(document as DocumentDefaultImplReadonly);
//         return Object.freeze(thing) as ContainedThingOf<DocumentTypeReadonly>;
//     }

//     public createStatement(thing: ContainedThingOf<DocumentTypeReadonly>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<DocumentTypeReadonly> {
//         throw new Error("Not implemented.");
//     }

// }

// const factory = new FactoryImpl();
// const document = factory.createDocument();
// document.deleteContext();
// document.createThingToSelfDescribe().createStatement("ex:prop", "");

// // @ts-expect-error
// document.toCopyReadonly().deleteContext();

// const factoryReadonly = new FactoryImplReadonly();
// const documentReadonly = factoryReadonly.createDocument();

// // @ts-expect-error
// documentReadonly.deleteContext();

// const getted = documentReadonly.get("");
// const copied = getted?.toCopy()