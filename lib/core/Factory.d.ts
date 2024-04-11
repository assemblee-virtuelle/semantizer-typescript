import { Context } from "./Context";
import { ContainedThingOf, Document, SelfDescribingThingOf, StatementOfDoc } from "./Document";
import Resource from "./Resource";
export interface Factory<DocumentType extends Document<any, any>> {
    createDocument(uri?: string, context?: Context): DocumentType;
    createThingToDescribeDocument(document: DocumentType): SelfDescribingThingOf<DocumentType>;
    createThing(document: DocumentType, uri: string): ContainedThingOf<DocumentType>;
    createThingWithoutUri(document: DocumentType, nameHint?: string): ContainedThingOf<DocumentType>;
    createStatement(thing: ContainedThingOf<DocumentType>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOfDoc<DocumentType>;
}
export default Factory;
//# sourceMappingURL=Factory.d.ts.map