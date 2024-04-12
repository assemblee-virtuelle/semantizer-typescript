import { Context } from "./Context";
import { ContainedThingOf, Document, DocumentBase, DocumentReadonly, SelfDescribingThingOf, StatementOf } from "./Document";
import Resource from "./Resource";

type InputOfDocument<T extends Document<any, any>> = T extends Document<infer TypeArg, any> ? TypeArg : never;
type InputOfDocumentReadonly<T extends DocumentReadonly<any, any>> = T extends DocumentBase<infer TypeArg, any> ? TypeArg : never;
export type InputOf<T extends Document<any, any> | DocumentReadonly<any, any>> = T extends Document<any, any> ? InputOfDocument<T> : T extends DocumentReadonly<any, any> ? InputOfDocumentReadonly<T> : never;

type OutputOfDocument<T extends Document<any, any>> = T extends Document<any, infer TypeArg> ? TypeArg : never;
type OutputOfDocumentReadonly<T extends DocumentReadonly<any, any>> = T extends DocumentBase<any, infer TypeArg> ? TypeArg : never;
type OutputOf<T extends Document<any, any> | DocumentReadonly<any, any>> = T extends Document<any, any> ? OutputOfDocument<T> : T extends DocumentReadonly<any, any> ? OutputOfDocumentReadonly<T> : never;

export interface Factory<
    DocumentType extends Document<any, any> | DocumentReadonly<any, any>
> {
    createDocument(uri?: string, context?: Context): DocumentType;

    createThingToDescribeDocument(document: DocumentType): SelfDescribingThingOf<InputOf<DocumentType>>;
    createThing(document: DocumentType, uri: string): ContainedThingOf<InputOf<DocumentType>>;
    createThingWithoutUri(document: DocumentType, nameHint?: string): ContainedThingOf<InputOf<DocumentType>>;

    createStatement(thing: ContainedThingOf<DocumentType>, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<DocumentType>;
}

export interface FactoryForCopying<
    DocumentType extends Document<any, any> | DocumentReadonly<any, any>
    // InputDocument extends DocumentBase<any, any>,
    // OutputDocument extends DocumentBase<any, any>
> {
    createDocument(document: DocumentType): OutputOf<DocumentType>;

    /*createThingToDescribeDocument(thing: SelfDescribingThingOf<InputDocument>): SelfDescribingThingOf<OutputDocument>;
    createThing(thing: ContainedThingOf<InputDocument>): ContainedThingOf<OutputDocument>;
    createThingWithoutUri(thing: ContainedThingOf<InputDocument>): ContainedThingOf<OutputDocument>;

    createStatement(statement: StatementOf<InputDocument>): StatementOf<OutputDocument>;*/
}

export default Factory;