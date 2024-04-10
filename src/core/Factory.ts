import { Context } from "./Context";
import { ContainedThingOf, Document, DocumentBase, DocumentReadonly, SelfDescribingThingOf, StatementOf } from "./Document";
import Resource from "./Resource";
import { Statement, StatementBase, StatementReadonly } from "./Statement";
import { ThingReadonly, Thing, ThingBase } from "./Thing";

// export type ContainedThingOf<T extends DocumentBase<any, any>> = T extends DocumentBase<infer TypeArg, any> ? TypeArg : never;
// export type SelfDescribingThingOf<T extends DocumentBase<any, any>> = T extends DocumentBase<any, infer TypeArg> ? TypeArg : never;

export interface Factory<
    DocumentType extends DocumentBase<any, any>
> {
    createDocument(uri?: string, context?: Context): DocumentType;

    createThingToDescribeDocument(document: DocumentType): SelfDescribingThingOf<DocumentType>;
    createThing(document: DocumentType, uri: string): ContainedThingOf<DocumentType>;
    createThingWithoutUri(document: DocumentType, nameHint?: string): ContainedThingOf<DocumentType>;

    createStatement(thing: ContainedThingOf<DocumentType>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<DocumentType>;
}

export interface FactoryReadonly<
    DocumentTypeReadonly extends DocumentReadonly<any>
> extends Factory<DocumentTypeReadonly> {}

export default Factory;