import { Context } from "../core/Context";
import { Document, ContainedThingOf } from "../core/Document";
import Factory from "../core/Factory";
import Resource from "../core/Resource";
import { Statement } from "../core/Statement";
import { Thing } from "../core/Thing";
type DocumentType = Document<Thing<Statement>, Thing<Statement>>;
export declare class FactoryImpl implements Factory<DocumentType> {
    createDocument(uri?: string, context?: Context): DocumentType;
    createThingToDescribeDocument(document: DocumentType): Thing<Statement>;
    createThing(document: DocumentType, uri: string): Thing<Statement>;
    createThingWithoutUri(document: DocumentType, nameHint?: string): Thing<Statement>;
    createStatement(thing: ContainedThingOf<DocumentType>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): Statement;
}
export {};
//# sourceMappingURL=FactoryImpl.d.ts.map