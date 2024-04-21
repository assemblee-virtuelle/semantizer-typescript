import { Context, Resource } from "./Common";
import { ContainedThingOf, Document, InputOf, SelfDescribingThingOf, StatementOf } from "./Document";
export interface Factory<DocumentType extends Document<any, any>> {
    createDocument(uri?: string, context?: Context): DocumentType;
    createThingToDescribeDocument(document: DocumentType): SelfDescribingThingOf<InputOf<DocumentType>>;
    createThing(document: DocumentType, uri: string): ContainedThingOf<InputOf<DocumentType>>;
    createThingWithoutUri(document: DocumentType, nameHint?: string): ContainedThingOf<InputOf<DocumentType>>;
    createStatement(thing: ContainedThingOf<DocumentType>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<DocumentType>;
}
export default Factory;
//# sourceMappingURL=Factory.d.ts.map