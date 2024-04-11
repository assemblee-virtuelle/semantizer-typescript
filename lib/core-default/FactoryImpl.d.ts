import { Context } from "../core/Context";
import { Document, ContainedThingOf } from "../core/Document";
import Factory from "../core/Factory";
import Resource from "../core/Resource";
import { Statement } from "../core/Statement";
import { Thing } from "../core/Thing";
type StatementType = Statement<Thing<any, any>>;
type ThingType = Thing<StatementType, Document<any, any>>;
type DocumentType = Document<ThingType, ThingType>;
export declare class FactoryImpl implements Factory<DocumentType> {
    createDocument(uri?: string, context?: Context): DocumentType;
    createThingToDescribeDocument(document: DocumentType): ThingType;
    createThing(document: DocumentType, uri: string): ThingType;
    createThingWithoutUri(document: DocumentType, nameHint?: string): ThingType;
    createStatement(thing: ContainedThingOf<DocumentType>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementType;
}
export {};
//# sourceMappingURL=FactoryImpl.d.ts.map