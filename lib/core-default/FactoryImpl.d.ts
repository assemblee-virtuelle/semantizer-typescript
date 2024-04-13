import { Context } from "../core/Context";
import { ContainedThingOf, Document, DocumentBase, SelfDescribingThingOf, StatementOf } from "../core/Document";
import Factory from "../core/Factory";
import Resource from "../core/Resource";
import { Statement, StatementReadonly } from "../core/Statement";
import { Thing, ThingReadonly } from "../core/Thing";
type StatementType = Statement<Thing<any, any>>;
type ThingType = Thing<StatementType, Document<any, any>>;
type DocRead = DocumentBase<ThingReadonly<StatementReadonly<any>, any>, ThingReadonly<StatementReadonly<any>, any>>;
type DocumentType = Document<DocumentBase<ThingType, ThingType>, DocRead>;
export declare class FactoryImpl implements Factory<DocumentType> {
    createDocument(uri?: string, context?: Context): DocumentType;
    createThingToDescribeDocument(document: DocumentType): SelfDescribingThingOf<DocumentType>;
    createThing(document: DocumentType, uri: string): ContainedThingOf<DocumentType>;
    createThingWithoutUri(document: DocumentType, nameHint?: string): ContainedThingOf<DocumentType>;
    createStatement(thing: ContainedThingOf<DocumentType>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<DocumentType>;
}
export {};
//# sourceMappingURL=FactoryImpl.d.ts.map