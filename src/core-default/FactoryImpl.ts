import { Context } from "../core/Context";
import { ContainedThingOf, DocumentReadonly, SelfDescribingThingOf, StatementOf } from "../core/Document";
import Factory from "../core/Factory";
import Resource from "../core/Resource";
import { DocumentImpl } from "./DocumentImpl.js";
import StatementImpl from "./StatementImpl.js";
import ThingImpl from "./ThingImpl.js";

type DocumentTypeReadonly = DocumentReadonly<DocumentDefaultImplReadonly>;
type DocumentDefaultImplReadonly = DocumentImpl<ThingImpl<StatementImpl>, ThingImpl<StatementImpl>>;

export class FactoryImpl<
    DocumentType extends DocumentImpl<any, any> = DocumentImpl<ThingImpl<StatementImpl>, ThingImpl<StatementImpl>>
>  implements Factory<DocumentType> {

    public createDocument(uri?: string, context?: Context): DocumentType {
        return new DocumentImpl<ContainedThingOf<DocumentType>, SelfDescribingThingOf<DocumentType>>(this) as DocumentType;
    }

    public createThingToDescribeDocument(document: DocumentType): SelfDescribingThingOf<DocumentType> {
        return new ThingImpl(document) as SelfDescribingThingOf<DocumentType>;
    }

    public createThing(document: DocumentType, uri: string): ContainedThingOf<DocumentType> {
        return new ThingImpl(document) as ContainedThingOf<DocumentType>;
    }

    public createThingWithoutUri(document: DocumentType, nameHint?: string): ContainedThingOf<DocumentType> {
        return new ThingImpl(document) as ContainedThingOf<DocumentType>;
    }

    public createStatement(thing: ContainedThingOf<DocumentType>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<DocumentType> {
        return new StatementImpl(thing, about, value, datatype, language) as StatementOf<DocumentType>;
    }

}

export class FactoryImplReadonly implements Factory<DocumentTypeReadonly> {

    private _factory = new FactoryImpl<DocumentDefaultImplReadonly>();

    public createDocument(uri?: string, context?: Context): DocumentTypeReadonly {
        const document = this._factory.createDocument() as DocumentTypeReadonly;
        return Object.freeze(document);
    }

    public createThingToDescribeDocument(document: DocumentTypeReadonly): SelfDescribingThingOf<DocumentTypeReadonly> {
        const thing = this._factory.createThingToDescribeDocument(document as DocumentDefaultImplReadonly);
        return Object.freeze(thing) as SelfDescribingThingOf<DocumentTypeReadonly>;
    }

    public createThing(document: DocumentTypeReadonly, uri: string): ContainedThingOf<DocumentTypeReadonly> {
        const thing = this._factory.createThing(document as DocumentDefaultImplReadonly, uri);
        return Object.freeze(thing) as ContainedThingOf<DocumentTypeReadonly>;
    }

    public createThingWithoutUri(document: DocumentTypeReadonly, nameHint?: string): ContainedThingOf<DocumentTypeReadonly> {
        const thing = this._factory.createThingWithoutUri(document as DocumentDefaultImplReadonly);
        return Object.freeze(thing) as ContainedThingOf<DocumentTypeReadonly>;
    }

    public createStatement(thing: ContainedThingOf<DocumentTypeReadonly>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<DocumentTypeReadonly> {
        throw new Error("Not implemented.");
    }

}

// const factory = new FactoryImpl();
// const document = factory.createDocument();
// document.deleteContext();
// document.createThingToSelfDescribe().createStatement("ex:prop", "");

// const factoryReadonly = new FactoryImplReadonly();
// const documentReadonly = factoryReadonly.createDocument();

// // @ts-expect-error
// documentReadonly.deleteContext();

// const getted = documentReadonly.get("");
// const copied = getted?.toCopy()