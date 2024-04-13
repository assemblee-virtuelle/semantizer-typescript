import { Context } from "./Context";
import Factory, { FactoryForCopying } from "./Factory";
import Resource from "./Resource";
import { Statement, StatementReadonly } from "./Statement";
import { Thing, ThingBase, ThingReadonly } from "./Thing";

type ContainedThingOfDocument<T extends Document<any, any>> = T extends Document<infer TypeArg, any> ? ContainedThingOfDocumentBase<T> : never;
type ContainedThingOfDocumentBase<T extends DocumentBase<any, any>> = T extends DocumentBase<infer TypeArg, any> ? TypeArg : never;
export type ContainedThingOf<T extends DocumentBase<any, any> | Document<any, any>> = T extends DocumentBase<any, any> ? ContainedThingOfDocumentBase<T>: T extends Document<any, any>? ContainedThingOfDocument<T>: never;

type SelfDescribingThingOfDocument<T extends Document<any, any>> = T extends Document<any, infer TypeArg> ? TypeArg : never;
type SelfDescribingThingOfDocumentBase<T extends DocumentBase<any, any>> = T extends DocumentBase<any, infer TypeArg> ? TypeArg : never;
export type SelfDescribingThingOf<T extends DocumentBase<any, any> | Document<any, any>> = T extends DocumentBase<any, any> ? SelfDescribingThingOfDocumentBase<T>: T extends Document<any, any>? SelfDescribingThingOfDocument<T>: never;

//export type ContainedThingOfReadonly<T extends Document<any, any>> = T extends Document<any, any, infer TypeArg, any> ? TypeArg : never;
//export type SelfDescribingThingOfReadonly<T extends Document<any, any>> = T extends Document<any, any, any, infer TypeArg> ? TypeArg : never;
type StatementOfDocumentBase<T extends DocumentBase<any, any>> = T extends DocumentBase<infer TypeArg, any> ? TypeArg extends ThingBase<infer StatementType> ? StatementType: never : never;
type StatementOfDocument<T extends Document<any, any>> = T extends Document<infer TypeArg, any> ? TypeArg extends Thing<infer StatementType, any> ? StatementType: never : never;
export type StatementOf<T extends DocumentBase<any, any> | Document<any, any>> = T extends DocumentBase<any, any> ? StatementOfDocumentBase<T>: T extends Document<any, any>? StatementOfDocument<T>: never;

type InputOfDocument<T extends Document<any, any>> = T extends Document<infer TypeArg, any> ? TypeArg : never;
type InputOfDocumentReadonly<T extends DocumentReadonly<any, any>> = T extends DocumentBase<infer TypeArg, any> ? TypeArg : never;
export type InputOf<T extends Document<any, any> | DocumentReadonly<any, any>> = T extends Document<any, any> ? InputOfDocument<T> : T extends DocumentReadonly<any, any> ? InputOfDocumentReadonly<T> : never;

type OutputOfDocument<T extends Document<any, any>> = T extends Document<any, infer TypeArg> ? TypeArg : never;
type OutputOfDocumentReadonly<T extends DocumentReadonly<any, any>> = T extends DocumentBase<any, infer TypeArg> ? TypeArg : never;
export type OutputOf<T extends Document<any, any> | DocumentReadonly<any, any>> = T extends Document<any, any> ? OutputOfDocument<T> : T extends DocumentReadonly<any, any> ? OutputOfDocumentReadonly<T> : never;

export type Constructor<T = {}> = new (...args: any[]) => T;

export interface DocumentBase<
    ContainedThing extends ThingBase<any>,
    SelfDescribingThing extends ThingBase<any>
> extends Resource, Iterable<ContainedThing> {
        //constructor(): DocumentBase<ContainedThing, SelfDescribingThing>;
    get(uri: string | Resource): ThisType<ContainedThing> | undefined;
    getContext(): Context | undefined;
    getThingThatSelfDescribes(): SelfDescribingThing | undefined;
    has(thing: string | Resource): boolean;
    hasThingThatSelfDescribes(): boolean;
    isEmpty(): boolean;
    toCanonical(): string; // DOMString? See https://github.com/digitalbazaar/rdf-canonize
    toStream(): string; // Stream
    [Symbol.iterator](): Iterator<ContainedThing>;
    toCopy(): ThisType<this>;
    // TODO: add meta data (acl, last time modified, headers...)
}

export interface WithFactory<
    DocumentType extends Document<any, any>// | DocumentReadonly<any, any> // extends DocumentBase<any, any>,
> {
    getFactory(): Factory<DocumentType>;
}

export interface WithFactoryForCopying<
    DocumentType extends Document<any, any> | DocumentReadonly<any, any>
> {
    getFactoryForCopying(): FactoryForCopying<DocumentType>;
}

export interface WithReadOperations<
    DocumentType extends DocumentBase<any, any>
> {
    at(index: number): ThisType<ContainedThingOf<DocumentType>> | undefined;
    contains(other: ThisType<this>): boolean;
    count(callbackfn?: (thing: ThisType<ContainedThingOf<DocumentType>>, document?: ThisType<this>) => boolean): number;
    difference(other: ThisType<this>): ThisType<this>;
    equals(other: ThisType<this>): boolean;
    every(predicate: (value: ThisType<ContainedThingOf<DocumentType>>, index?: number, array?: ThisType<ContainedThingOf<DocumentType>>[]) => boolean, thisArg?: any): boolean;
    filter(predicate: (value: ThisType<ContainedThingOf<DocumentType>>, index?: number, array?: ThisType<ContainedThingOf<DocumentType>>[]) => boolean): ThisType<ContainedThingOf<DocumentType>>[];
    find(predicate: (value: ThisType<ContainedThingOf<DocumentType>>, index?: number, obj?: ThisType<ContainedThingOf<DocumentType>>[]) => boolean, thisArg?: any): ThisType<ContainedThingOf<DocumentType>> | undefined;
    findIndex(predicate: (value: ThisType<ContainedThingOf<DocumentType>>, index?: number, obj?: ThisType<ContainedThingOf<DocumentType>>[]) => unknown, thisArg?: any): number
    forEach(callbackfn: (value: ContainedThingOf<DocumentType>, index?: number, array?: ContainedThingOf<DocumentType>[]) => void, thisArg?: any): void;
    includes(searchElement: ThisType<ContainedThingOf<DocumentType>>, fromIndex?: number | undefined): boolean;
    indexOf(searchElement: ThisType<ContainedThingOf<DocumentType>>, fromIndex?: number | undefined): number;
    keys(): IterableIterator<number>; // to check
    map(callbackfn: (value: ThisType<ContainedThingOf<DocumentType>>, index: number, array: ThisType<ContainedThingOf<DocumentType>>[]) => unknown, thisArg?: any): unknown[];
    reduce(callbackfn: (previousValue: ThisType<ContainedThingOf<DocumentType>>, currentValue: ThisType<ContainedThingOf<DocumentType>>, currentIndex: number, array: ThisType<ContainedThingOf<DocumentType>>[]) => ThisType<ContainedThingOf<DocumentType>>): ThisType<ContainedThingOf<DocumentType>>; 
    slice(start?: number, end?: number): ThisType<this>;
    some(predicate: (value: ThisType<ContainedThingOf<DocumentType>>, index: number, array: ThisType<ContainedThingOf<DocumentType>>[]) => unknown, thisArg?: any): boolean;
}

export interface WithWriteOperations<
    DocumentType extends DocumentBase<any, any>
> {
    add(thing: ThisType<ContainedThingOf<DocumentType>>): ThisType<this>;
    // TODO: add meta description
    addAll(documentOrThings: DocumentBase<any, any> | ThisType<ContainedThingOf<DocumentType>>[]): ThisType<this>;
    delete(thingOrUri: string | ThisType<ContainedThingOf<DocumentType>>): ThisType<this>;
    deleteContext(): void;
    deleteMatches(uri?: string | Resource, property?: string, value?: string): ThisType<this>;
    pop(): ThisType<ContainedThingOf<DocumentType>> | undefined;
    reverse(): void;
    setContext(context: Context): void;
    shift(): ThisType<ContainedThingOf<DocumentType>> | undefined;
    sort(compareFn?: (a: ThisType<ContainedThingOf<DocumentType>>, b: ThisType<ContainedThingOf<DocumentType>>) => number): ThisType<this>;
    splice(start: number, deleteCount?: number, ...items: ThisType<ContainedThingOf<DocumentType>>[]): ThisType<this>;
    // TODO: add meta description
    union(other: DocumentBase<any, any>): ThisType<this>;
}

export interface WithCreateOperations<
    DocumentType extends DocumentBase<any, any>
> {
    createThingToSelfDescribe(): SelfDescribingThingOf<DocumentType>;
    createThingWithUri(nameHintOrUri?: string): ContainedThingOf<DocumentType>; //ThisType<ContainedThingOf<DocumentType>>;
    createThingWithoutUri(nameHint?: string): ContainedThingOf<DocumentType>;
}

export interface WithCopyOperations<
    DocumentResulting extends DocumentBase<ThingReadonly<StatementReadonly<any>, any>, ThingReadonly<StatementReadonly<any>, any>>, //DocumentReadonly<any, any>
> {
    toCopyReadonly(): DocumentResulting;
}

export interface WithCopyWritableOperations<
    DocumentResulting extends DocumentBase<any, any>
> {
    toCopyWritable(): DocumentResulting;
}

export type Document<
    T extends DocumentBase<any, any>, //Thing<Statement<any>, any>, Thing<Statement<any>, any>>,
    TReadonly extends DocumentBase<ThingReadonly<StatementReadonly<any>, any>, ThingReadonly<StatementReadonly<any>, any>>, //DocumentReadonly<any, any>
> = DocumentBase<ContainedThingOf<T>, SelfDescribingThingOf<T>> & 
    WithFactory<Document<T, TReadonly>> & 
    WithFactoryForCopying<Document<T, TReadonly>> & 
    WithReadOperations<T> &
    WithWriteOperations<T> &
    WithCreateOperations<T> &
    WithCopyOperations<TReadonly>;

export type DocumentReadonly<
    T extends DocumentBase<ThingReadonly<StatementReadonly<any>, any>, ThingReadonly<StatementReadonly<any>, any>>,
    TWritable extends DocumentBase<any, any>,
> = DocumentBase<ContainedThingOf<T>, SelfDescribingThingOf<T>> & 
    WithFactoryForCopying<DocumentReadonly<T, TWritable>> & 
    WithReadOperations<DocumentReadonly<T, TWritable>> & 
    WithCopyWritableOperations<TWritable>;