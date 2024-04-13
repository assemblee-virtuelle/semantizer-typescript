import { Context } from "../core/Context";
import { ContainedThingOf, Document, DocumentBase, SelfDescribingThingOf, StatementOf } from "../core/Document";
import Factory from "../core/Factory";
import Resource from "../core/Resource";
export declare class FactoryImpl<DocumentType extends Document<any, any>, //DocumentBase<Thing<Statement<Thing<any, any>>, DocumentType>, Thing<Statement<Thing<any, any>>, DocumentType>>, DocumentBase<Thing<Statement<Thing<any, any>>, DocumentType>, Thing<Statement<Thing<any, any>>, DocumentType>>>, // TypeIndex or Document
DocumentTypeReadonly extends DocumentBase<any, any>> implements Factory<Document<DocumentType, DocumentTypeReadonly>> {
    createDocument(uri?: string, context?: Context): Document<DocumentType, DocumentTypeReadonly>;
    createThingToDescribeDocument(document: Document<DocumentType, DocumentTypeReadonly>): SelfDescribingThingOf<DocumentType>;
    createThing(document: Document<DocumentType, DocumentTypeReadonly>, uri: string): ContainedThingOf<DocumentType>;
    createThingWithoutUri(document: Document<DocumentType, DocumentTypeReadonly>, nameHint?: string): ContainedThingOf<DocumentType>;
    createStatement(thing: ContainedThingOf<DocumentType>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<DocumentType>;
}
//# sourceMappingURL=FactoryImpl.d.ts.map