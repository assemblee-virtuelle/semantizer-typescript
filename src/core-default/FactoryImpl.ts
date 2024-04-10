import { Context } from "../core/Context";
import { Document, ContainedThingOf, DocumentReadonly, SelfDescribingThingOf, StatementOf } from "../core/Document";
import Factory from "../core/Factory";
import Resource from "../core/Resource";
import { Statement } from "../core/Statement";
import { Thing } from "../core/Thing";
import { DocumentImpl } from "./DocumentImpl.js";
import StatementImpl from "./StatementImpl.js";
import ThingImpl from "./ThingImpl.js";

// type DocumentTypeReadonly = DocumentReadonly<ThingImpl<StatementImpl>, ThingImpl<StatementImpl>>;
// type DocumentDefaultImplReadonly = DocumentImpl<ThingImpl<StatementImpl>, ThingImpl<StatementImpl>>;

type DocumentType = Document<Thing<Statement>, Thing<Statement>>;

export class FactoryImpl implements Factory<DocumentType> {

    public createDocument(uri?: string, context?: Context): DocumentType {
        return new DocumentImpl<Thing<Statement>, Thing<Statement>>(this);// as DocumentType;
    }

    public createThingToDescribeDocument(document: DocumentType): Thing<Statement> { //Of<typeof document> {
        return new ThingImpl(document);
    }

    public createThing(document: DocumentType, uri: string): Thing<Statement> {
        return new ThingImpl(document);
    }

    public createThingWithoutUri(document: DocumentType, nameHint?: string): Thing<Statement> {
        return new ThingImpl(document);
    }

    public createStatement(thing: ContainedThingOf<DocumentType>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): Statement {
        return new StatementImpl(thing, about, value, datatype, language) as StatementOf<DocumentType>;
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