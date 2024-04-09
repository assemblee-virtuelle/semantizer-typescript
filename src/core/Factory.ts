import Context from "./Context";
import { Document, DocumentBase, DocumentReadonly } from "./Document";
import { Statement, StatementReadonly } from "./Statement";
import { ThingReadonly, Thing } from "./Thing";

export type ContainedThingOf<T extends DocumentBase<any, any>> = T extends DocumentBase<infer TypeArg, any> ? TypeArg : never;
export type SelfDescribingThingOf<T extends DocumentBase<any, any>> = T extends DocumentBase<any, infer TypeArg> ? TypeArg : never;

// export type ContainedThingOf<T extends DocumentBase<any, any>> = T extends DocumentBase<infer TypeArg, any> ? TypeArg : never;
// export type SelfDescribingThingOf<T extends DocumentBase<any, any>> = T extends DocumentBase<any, infer TypeArg> ? TypeArg : never;

export interface Factory<
    DocumentType extends DocumentBase<any, any> = Document<Thing<Statement>>,
> {
    createDocument(uri?: string, context?: Context): DocumentType;

    createThingToDescribeDocument(document: DocumentType): SelfDescribingThingOf<DocumentType>;
    createThing(document: DocumentType, uri: string): ContainedThingOf<DocumentType>;
    createThingWithoutUri(document: DocumentType, nameHint?: string): ContainedThingOf<DocumentType>;

    //createStatement(thing: ContainedThingOf<DocumentType>): void;
}

export interface FactoryReadonly<
    DocumentTypeReadonly extends DocumentReadonly<any, any> = DocumentReadonly<ThingReadonly<StatementReadonly>, ThingReadonly<StatementReadonly>>
> extends Factory<DocumentTypeReadonly> {}

export default Factory;