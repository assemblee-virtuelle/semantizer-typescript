import { Context } from "../core/Context";
import { ContainedThingOf, Document, DocumentReadonly } from "../core/Document";
import Factory, { FactoryForCopying } from "../core/Factory";
import Resource from "../core/Resource";
import { Statement, StatementReadonly } from "../core/Statement";
import { Thing, ThingReadonly } from "../core/Thing";
import { DocumentImpl, DocumentImplReadonly } from "./DocumentImpl.js";
import StatementImpl from "./StatementImpl.js";
import ThingImpl from "./ThingImpl.js";

type StatementType = Statement<Thing<any, any>>;
type StatementTypeReadonly = StatementReadonly<ThingReadonly<any, any>>;
type ThingType = Thing<StatementType, Document<any, any, any, any>>;
type ThingTypeReadonly = ThingReadonly<StatementTypeReadonly, DocumentReadonly<any, any, any, any>>;

type DocumentType = Document<ThingType, ThingType, ThingTypeReadonly, ThingTypeReadonly>;
type DocumentTypeReadonly = DocumentReadonly<ThingTypeReadonly, ThingTypeReadonly, ThingType, ThingType>;

export class FactoryImpl implements Factory<DocumentType> {

    public createDocument(uri?: string, context?: Context): DocumentType {
        return new DocumentImpl<ThingType, ThingType, ThingTypeReadonly, ThingTypeReadonly>(this as Factory<DocumentType>);
    }

    public createDocumentReadonly(document: DocumentType): DocumentTypeReadonly {
        throw new Error("Method not implemented.");
    }

    public createThingToDescribeDocument(document: DocumentType): ThingType { 
        return new ThingImpl<Statement<ThingType>, DocumentType>(document);
    }

    public createThing(document: DocumentType, uri: string): ThingType {
        return new ThingImpl<Statement<ThingType>, DocumentType>(document);
    }

    public createThingWithoutUri(document: DocumentType, nameHint?: string): ThingType {
        return new ThingImpl<Statement<ThingType>, DocumentType>(document);
    }

    public createStatement(thing: ContainedThingOf<DocumentType>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementType {
        return new StatementImpl(thing, about, value, datatype, language);
    }

}

export class FactoryImplForCopying implements FactoryForCopying<DocumentType, DocumentTypeReadonly> {

    createDocument(document: DocumentType): DocumentTypeReadonly {
        return Object.freeze(new DocumentImplReadonly<ThingTypeReadonly, ThingTypeReadonly, ThingType, ThingType>(document));
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