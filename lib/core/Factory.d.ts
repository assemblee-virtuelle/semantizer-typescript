import { Context } from "./Context";
import { ContainedThingOf, Document, DocumentReadonly, InputOf, OutputOf, SelfDescribingThingOf, StatementOf } from "./Document";
import Resource from "./Resource";
export interface Factory<DocumentType extends Document<any, any> | DocumentReadonly<any, any>> {
    createDocument(uri?: string, context?: Context): DocumentType;
    createThingToDescribeDocument(document: DocumentType): SelfDescribingThingOf<InputOf<DocumentType>>;
    createThing(document: DocumentType, uri: string): ContainedThingOf<InputOf<DocumentType>>;
    createThingWithoutUri(document: DocumentType, nameHint?: string): ContainedThingOf<InputOf<DocumentType>>;
    createStatement(thing: ContainedThingOf<DocumentType>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<DocumentType>;
}
export interface FactoryForCopying<DocumentType extends Document<any, any> | DocumentReadonly<any, any>> {
    createDocument(document: DocumentType): OutputOf<DocumentType>;
}
export default Factory;
//# sourceMappingURL=Factory.d.ts.map