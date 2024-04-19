import { ResourceCollection, ResourceCollectionWritable, Comparable, Copyable, CopyableToReadonly, CopyableToWritable, Resource, WithContext, WithContextWritable, WithFactory } from "./Common";
import { Statement } from "./Statement";
import { Thing, ThingBase } from "./Thing";

type ContainedThingOfDocument<T extends Document<any, any>> = T extends Document<infer TypeArg, any> ? TypeArg : never;
type ContainedThingOfDocumentBase<T extends DocumentBase<any, any>> = T extends DocumentBase<infer TypeArg, any> ? TypeArg : never;
export type ContainedThingOf<T extends /*DocumentBase<any, any> | */Document<any, any>> = /*T extends DocumentBase<any, any> ? ContainedThingOfDocumentBase<T>:*/ T extends Document<any, any>? ContainedThingOfDocument<T>: never;

type SelfDescribingThingOfDocument<T extends Document<any, any>> = T extends Document<any, infer TypeArg> ? TypeArg : never;
type SelfDescribingThingOfDocumentBase<T extends DocumentBase<any, any>> = T extends DocumentBase<any, infer TypeArg> ? TypeArg : never;
export type SelfDescribingThingOf<T extends DocumentBase<any, any> | Document<any, any>> = T extends DocumentBase<any, any> ? SelfDescribingThingOfDocumentBase<T>: T extends Document<any, any>? SelfDescribingThingOfDocument<T>: never;

//export type ContainedThingOfReadonly<T extends Document<any, any>> = T extends Document<any, any, infer TypeArg, any> ? TypeArg : never;
//export type SelfDescribingThingOfReadonly<T extends Document<any, any>> = T extends Document<any, any, any, infer TypeArg> ? TypeArg : never;
type StatementOfDocumentBase<T extends DocumentBase<any, any>> = T extends DocumentBase<infer TypeArg, any> ? TypeArg extends ThingBase<infer StatementType> ? StatementType: never : never;
type StatementOfDocument<T extends Document<any, any>> = T extends Document<infer TypeArg, any> ? TypeArg extends Thing<infer StatementType, any> ? StatementType: never : never;
export type StatementOf<T extends DocumentBase<any, any> | Document<any, any>> = T extends DocumentBase<any, any> ? StatementOfDocumentBase<T>: T extends Document<any, any>? StatementOfDocument<T>: never;

// type InputOfDocumentWritable<T extends DocumentWritable<any, any>> = T extends Document<infer TypeArg, any> ? TypeArg : never;
type InputOfDocumentReadonly<T extends Document<any, any>> = T extends Document<infer TypeArg, any> ? TypeArg : never;
export type InputOf<T extends Document<any, any>/* | DocumentWritable<any, any>*/> = /*T extends DocumentWritable<any, any> ? InputOfDocumentWritable<T> : */T extends Document<any, any> ? InputOfDocumentReadonly<T> : never;

// export type OutputOfDocumentWritable<T extends DocumentWritable<any, any>> = T extends Document<any, infer TypeArg> ? TypeArg : never;
type OutputOfDocumentReadonly<T extends Document<any, any>> = T extends DocumentBase<any, infer TypeArg> ? TypeArg : never;
export type OutputOf<T extends Document<any, any>/* | DocumentWritable<any, any>*/> = /*T extends DocumentWritable<any, any> ? OutputOfDocumentWritable<T> : */T extends Document<any, any> ? OutputOfDocumentReadonly<T> : never;

export type Constructor<T = {}> = new (...args: any[]) => T;

export interface DocumentBase<
    ContainedThing extends ThingBase<any>, 
    SelfDescribingThing extends ThingBase<any>
> extends Resource {
    getThingThatSelfDescribes(): SelfDescribingThing | undefined;
    hasThingThatSelfDescribes(): boolean;

    // TODO: add meta data (acl, last time modified, headers...)
}

export interface WithCreateOperations<
    DocumentType extends Document<any, any>
> {
    createThingToSelfDescribe(): SelfDescribingThingOf<DocumentType>;
    createThingWithUri(nameHintOrUri?: string): ContainedThingOf<DocumentType>; //ThisType<ContainedThingOf<DocumentType>>;
    createThingWithoutUri(nameHint?: string): ContainedThingOf<DocumentType>;

    // createStatement(about: string, value: string | Resource, datatype?: string, language?: string): this
    // removeStatement(about: string, value: string | Resource, datatype?: string, language?: string): ThisType<this>;
    // removeStatementAll(about: string): ThisType<this>;
    // setStatement(about: string, value: string, oldValue?: string, datatype?: string, language?: string): ThisType<this>;
}

export interface Document<
    ContainedThing extends Thing<any, any>, // T extends DocumentBase<Thing<Statement<any>, any>, Thing<Statement<any>, any>>, 
    SelfDescribingThing extends Thing<any, any> //TWritable extends DocumentBase<any, any> = DocumentBase<any, any>, // to be removed
> extends Resource, ResourceCollection<ContainedThing>, WithContext, Comparable, Copyable {
    getThingThatSelfDescribes(): SelfDescribingThing | undefined;
    hasThingThatSelfDescribes(): boolean;
}

export type DocumentWritable<
    ContainedThing extends Thing<any, any>,
    SelfDescribingThing extends Thing<any, any>
> = Document<ContainedThing, SelfDescribingThing> & 
    ResourceCollectionWritable<ContainedThing> & 
    WithContextWritable;

//WithFactory<Document<T>> & //, TWritable>> & 
//CopyableToWritable<TWritable> & 
// WithFactoryForCopying<Document<T, TWritable>>; // type

// export type DocumentWritable<
//     T extends DocumentBase<ThingWritable<StatementWritable<any, any>, any>, any>, //Thing<Statement<any>, any>, Thing<Statement<any>, any>>,
//     TReadonly extends Document<any, any> //ThingReadonly<StatementReadonly<any>, any>, ThingReadonly<StatementReadonly<any>, any>>, //DocumentReadonly<any, any>
// > = DocumentBase<ContainedThingOf<T>, SelfDescribingThingOf<T>> & 
//     //ResourceCollection<ContainedThingOf<TReadonly>> & 
//     ResourceCollectionWritable<ContainedThingOf<T>> & 
//     WithContext & 
//     WithContextWritable & 
//     Comparable<T> & 
//     Copyable & 
//     CopyableToReadonly<TReadonly> &  // type
//     WithFactory<Document<T, TReadonly>> & 
//     WithFactoryForCopying<DocumentWritable<T, TReadonly>> & 
//     WithCreateOperations<T>;

// Is this interface really useful? Would it be used to access different objects?
export interface DocumentDecorated<
    T extends Document<any, any>, //Thing<Statement<any>, any>, Thing<Statement<any>, any>>,
    //TReadonly extends DocumentBase<any, any> //ThingReadonly<StatementReadonly<any>, any>, ThingReadonly<StatementReadonly<any>, any>>, //DocumentReadonly<any, any>
> extends DocumentWritable<ContainedThingOf<T>, SelfDescribingThingOf<T>> //Document<T, TReadonly>
{
    getWrappedDocument(): T; // Document<ContainedThingOf<T>, SelfDescribingThingOf<T>>; //Document<T, TReadonly>;
}