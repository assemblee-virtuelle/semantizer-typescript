import { DocumentReadonly } from "../core/Document";
import Factory, { ContainedThingOf, SelfDescribingThingOf } from "../core/Factory";
import { Statement, StatementReadonly } from "../core/Statement";
import { Thing, ThingReadonly } from "../core/Thing";
import ContextDefault from "./ContextDefault";
import { DocumentDefaultImpl } from "./DocumentDefaultImpl";
import ThingDefaultImpl from "./ThingDefaultImpl";

type DocumentTypeReadonly = DocumentReadonly<ThingReadonly<StatementReadonly>, ThingReadonly<StatementReadonly>>;
type DocumentDefaultImplReadonly = DocumentDefaultImpl<ThingReadonly<StatementReadonly>, ThingReadonly<StatementReadonly>>;

export class FactoryDefaultImpl<
    DocumentType extends DocumentDefaultImpl<any, any> = DocumentDefaultImpl<Thing<Statement>, Thing<Statement>>
>  implements Factory<DocumentType> {

    public createDocument(uri?: string, context?: ContextDefault): DocumentType {
        return new DocumentDefaultImpl<ContainedThingOf<DocumentType>, SelfDescribingThingOf<DocumentType>>() as DocumentType;
    }

    public createThingToDescribeDocument(document: DocumentType): SelfDescribingThingOf<DocumentType> {
        return new ThingDefaultImpl(document) as SelfDescribingThingOf<DocumentType>;
    }

    public createThing(document: DocumentType, uri: string): ContainedThingOf<DocumentType> {
        return new ThingDefaultImpl(document) as ContainedThingOf<DocumentType>;
    }

    public createThingWithoutUri(document: DocumentType, nameHint?: string): ContainedThingOf<DocumentType> {
        return new ThingDefaultImpl(document) as ContainedThingOf<DocumentType>;
    }

    public createStatement(thing: Thing<Statement>): void {

    }

}

export class FactoryDefaultImplReadonly implements Factory<DocumentTypeReadonly> {

    private _factory = new FactoryDefaultImpl<DocumentDefaultImplReadonly>();

    public createDocument(uri?: string, context?: ContextDefault): DocumentReadonly<ContainedThingOf<DocumentTypeReadonly>, SelfDescribingThingOf<DocumentTypeReadonly>> {
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

    public createStatement(thing: ThingReadonly<StatementReadonly>): void {

    }

}

const factory = new FactoryDefaultImpl();
const document = factory.createDocument();
document.deleteContext();

const factoryReadonly = new FactoryDefaultImplReadonly();
const documentReadonly = factoryReadonly.createDocument();

// @ts-expect-error
documentReadonly.deleteContext();

const getted = documentReadonly.get("");
const copied = getted?.toCopy()