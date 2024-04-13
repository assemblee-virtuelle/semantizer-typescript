import { Context } from "../core/Context";
import { ContainedThingOf, Document, DocumentBase, DocumentReadonly, InputOf, OutputOf, SelfDescribingThingOf, StatementOf } from "../core/Document";
import Factory from "../core/Factory";
import Resource from "../core/Resource";
import { Statement, StatementReadonly } from "../core/Statement";
import { Thing, ThingReadonly } from "../core/Thing";
import { DocumentImpl } from "./DocumentImpl.js";
import StatementImpl from "./StatementImpl.js";
import ThingImpl from "./ThingImpl.js";

type StatementType = Statement<Thing<any, any>>;
type StatementTypeReadonly = StatementReadonly<ThingReadonly<any, any>>;
type ThingType = Thing<StatementType, Document<any, any>>;
type ThingTypeReadonly = ThingReadonly<StatementTypeReadonly, DocumentReadonly<any, any>>;


type DocRead = DocumentBase<ThingReadonly<StatementReadonly<any>, any>, ThingReadonly<StatementReadonly<any>, any>>;
// DocumentBase<ThingReadonly<StatementReadonly<any>, any>, ThingReadonly<StatementReadonly<any>, any>>,
type DocumentType = Document<DocumentBase<ThingType, ThingType>, DocRead>;
type DocumentTypeReadonly = DocumentReadonly<DocRead, DocumentType>;

export class FactoryImpl 
implements Factory<DocumentType> { 

    public createDocument(uri?: string, context?: Context): DocumentType {
        return new DocumentImpl<DocumentType, DocumentType>(this);// as Factory<DocumentType>);
    }

    /*public createDocumentReadonly(document: Document<DocumentType, DocumentTypeReadonly>): DocumentTypeReadonly {
        throw new Error("Method not implemented.");
    }*/

    public createThingToDescribeDocument(document: DocumentType): SelfDescribingThingOf<DocumentType> { 
        return new ThingImpl<StatementOf<typeof document>, typeof document>(document) as SelfDescribingThingOf<typeof document>; //<Statement<ThingType>, DocumentType>(document);
    }

    public createThing(document: DocumentType, uri: string): ContainedThingOf<DocumentType> {
        return new ThingImpl<StatementOf<typeof document>, typeof document>(document) as ContainedThingOf<DocumentType>;
    }

    public createThingWithoutUri(document: DocumentType, nameHint?: string): ContainedThingOf<DocumentType> {
        throw new Error("Method not implemented.");//return new ThingImpl<Statement<ThingType>, DocumentType>(document);
    }

    public createStatement(thing: ContainedThingOf<DocumentType>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<DocumentType> {
        return new StatementImpl(thing, about, value, datatype, language) as StatementOf<DocumentType>;
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