import { Context } from "../core/Context";
import { ContainedThingOf, DocumentReadonly, SelfDescribingThingOf, StatementOf } from "../core/Document";
import Factory from "../core/Factory";
import Resource from "../core/Resource";
import { DocumentImpl } from "./DocumentImpl.js";
import StatementImpl from "./StatementImpl.js";
import ThingImpl from "./ThingImpl.js";
type DocumentTypeReadonly = DocumentReadonly<DocumentDefaultImplReadonly>;
type DocumentDefaultImplReadonly = DocumentImpl<ThingImpl<StatementImpl>, ThingImpl<StatementImpl>>;
export declare class FactoryImpl<DocumentType extends DocumentImpl<any, any> = DocumentImpl<ThingImpl<StatementImpl>, ThingImpl<StatementImpl>>> implements Factory<DocumentType> {
    createDocument(uri?: string, context?: Context): DocumentType;
    createThingToDescribeDocument(document: DocumentType): SelfDescribingThingOf<DocumentType>;
    createThing(document: DocumentType, uri: string): ContainedThingOf<DocumentType>;
    createThingWithoutUri(document: DocumentType, nameHint?: string): ContainedThingOf<DocumentType>;
    createStatement(thing: ContainedThingOf<DocumentType>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<DocumentType>;
}
export declare class FactoryImplReadonly implements Factory<DocumentTypeReadonly> {
    private _factory;
    createDocument(uri?: string, context?: Context): DocumentTypeReadonly;
    createThingToDescribeDocument(document: DocumentTypeReadonly): SelfDescribingThingOf<DocumentTypeReadonly>;
    createThing(document: DocumentTypeReadonly, uri: string): ContainedThingOf<DocumentTypeReadonly>;
    createThingWithoutUri(document: DocumentTypeReadonly, nameHint?: string): ContainedThingOf<DocumentTypeReadonly>;
    createStatement(thing: ContainedThingOf<DocumentTypeReadonly>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<DocumentTypeReadonly>;
}
export {};
//# sourceMappingURL=FactoryImpl.d.ts.map