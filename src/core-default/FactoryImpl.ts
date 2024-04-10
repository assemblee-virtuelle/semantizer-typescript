import { Context } from "../core/Context";
import { DocumentReadonly } from "../core/Document";
import Factory, { ContainedThingOf, SelfDescribingThingOf, StatementOf } from "../core/Factory";
import Resource from "../core/Resource";
import { Statement, StatementBase, StatementReadonly } from "../core/Statement";
import { Thing, ThingReadonly } from "../core/Thing";
import { DocumentImpl } from "./DocumentImpl";
import StatementImpl from "./StatementImpl";
import ThingImpl from "./ThingImpl";

type DocumentTypeReadonly = DocumentReadonly<ThingReadonly<StatementReadonly>, ThingReadonly<StatementReadonly>>;
type DocumentDefaultImplReadonly = DocumentImpl<ThingReadonly<StatementReadonly>, ThingReadonly<StatementReadonly>>;

export class FactoryImpl<
    DocumentType extends DocumentImpl<any, any> = DocumentImpl<Thing<Statement>, Thing<Statement>>
>  implements Factory<DocumentType> {

    public createDocument(uri?: string, context?: Context): DocumentType {
        return new DocumentImpl<ContainedThingOf<DocumentType>, SelfDescribingThingOf<DocumentType>>() as DocumentType;
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

    public createDocument(uri?: string, context?: Context): DocumentReadonly<ContainedThingOf<DocumentTypeReadonly>, SelfDescribingThingOf<DocumentTypeReadonly>> {
        const document = this._factory.createDocument() as DocumentTypeReadonly;
        return Object.freeze(document);
    }

    public createThingToDescribeDocument(document: DocumentTypeReadonly): ThingReadonly<StatementReadonly> {
        const thing = this._factory.createThingToDescribeDocument(document as DocumentDefaultImplReadonly);
        return Object.freeze(thing);
    }

    public createThing(document: DocumentTypeReadonly, uri: string): ThingReadonly<StatementReadonly> {
        const thing = this._factory.createThing(document as DocumentDefaultImplReadonly, uri);
        return Object.freeze(thing);
    }

    public createThingWithoutUri(document: DocumentTypeReadonly, nameHint?: string): ThingReadonly<StatementReadonly> {
        const thing = this._factory.createThingWithoutUri(document as DocumentDefaultImplReadonly);
        return Object.freeze(thing);
    }

    public createStatement(thing: ThingReadonly<StatementReadonly>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementReadonly {
        throw new Error("Not implemented.");
    }

}

const factory = new FactoryImpl();
const document = factory.createDocument();
document.deleteContext();
document.createThingToSelfDescribe().createStatement("ex:prop", "");

const factoryReadonly = new FactoryImplReadonly();
const documentReadonly = factoryReadonly.createDocument();

// @ts-expect-error
documentReadonly.deleteContext();

const getted = documentReadonly.get("");
const copied = getted?.toCopy()