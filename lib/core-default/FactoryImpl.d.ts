import { Context } from "../core/Context";
import { Document, ContainedThingOf, DocumentReadonly } from "../core/Document";
import Factory, { FactoryForCopying } from "../core/Factory";
import Resource from "../core/Resource";
import { Statement, StatementReadonly } from "../core/Statement";
import { Thing, ThingReadonly } from "../core/Thing";
type StatementType = Statement<Thing<any, any>>;
type StatementTypeReadonly = StatementReadonly<ThingReadonly<any, any>>;
type ThingType = Thing<StatementType, Document<any, any, any, any>>;
type ThingTypeReadonly = ThingReadonly<StatementTypeReadonly, DocumentReadonly<any, any, any, any>>;
type DocumentType = Document<ThingType, ThingType, ThingTypeReadonly, ThingTypeReadonly>;
type DocumentTypeReadonly = DocumentReadonly<ThingTypeReadonly, ThingTypeReadonly, ThingType, ThingType>;
export declare class FactoryImpl implements Factory<DocumentType> {
    createDocument(uri?: string, context?: Context): DocumentType;
    createDocumentReadonly(document: DocumentType): DocumentTypeReadonly;
    createThingToDescribeDocument(document: DocumentType): ThingType;
    createThing(document: DocumentType, uri: string): ThingType;
    createThingWithoutUri(document: DocumentType, nameHint?: string): ThingType;
    createStatement(thing: ContainedThingOf<DocumentType>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementType;
}
export declare class FactoryImplForCopying implements FactoryForCopying<DocumentType, DocumentTypeReadonly> {
    createDocument(document: DocumentType): DocumentTypeReadonly;
    createThingToDescribeDocument(thing: ThingType): ThingTypeReadonly;
    createThing(thing: ThingType): ThingTypeReadonly;
    createThingWithoutUri(thing: ThingType): ThingTypeReadonly;
    createStatement(statement: StatementType): StatementTypeReadonly;
}
export {};
//# sourceMappingURL=FactoryImpl.d.ts.map