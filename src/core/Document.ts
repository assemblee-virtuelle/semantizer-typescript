import { Context } from "./Context";
import Factory from "./Factory";
import Resource from "./Resource";
import { ThingBase, ThingReadonly } from "./Thing";

export type Constructor<T = {}> = new (...args: any[]) => T;

export interface DocumentBase<
    ContainedThing extends ThingBase<any> = ThingBase, 
    SelfDescribingThing extends ThingBase<any> = ThingBase,
> extends Resource, Iterable<ContainedThing> {
        //constructor(): DocumentBase<ContainedThing, SelfDescribingThing>;
    getFactory(): Factory<DocumentBase<ContainedThing, SelfDescribingThing>>
    get(uri: string | Resource): ContainedThing | undefined;
    getContext(): Context | undefined;
    getThingThatSelfDescribes(): SelfDescribingThing | undefined;
    has(thing: string | Resource): boolean;
    hasThingThatSelfDescribes(): boolean;
    isEmpty(): boolean;
    toCanonical(): string; // DOMString? See https://github.com/digitalbazaar/rdf-canonize
    toStream(): string; // Stream
    [Symbol.iterator](): Iterator<ContainedThing>;
    toCopy(): this;
    // TODO: add meta data (acl, last time modified, headers...)
}

export interface WithReadOperations<
    ContainedThing extends ThingBase<any> = ThingBase, 
> {
    at(index: number): ContainedThing | undefined;
    contains(other: ThisType<this>): boolean;
    count(callbackfn?: (thing: ContainedThing, document?: ThisType<this>) => boolean): number;
    difference(other: ThisType<this>): this;
    equals(other: ThisType<this>): boolean;
    every(predicate: (value: ContainedThing, index?: number, array?: ContainedThing[]) => boolean, thisArg?: any): boolean;
    filter(predicate: (value: ContainedThing, index?: number, array?: ContainedThing[]) => boolean): ContainedThing[];
    find(predicate: (value: ContainedThing, index?: number, obj?: ContainedThing[]) => boolean, thisArg?: any): ContainedThing | undefined;
    findIndex(predicate: (value: ContainedThing, index?: number, obj?: ContainedThing[]) => unknown, thisArg?: any): number
    forEach(callbackfn: (value: ContainedThing, index?: number, array?: ContainedThing[]) => void, thisArg?: any): void;
    includes(searchElement: ContainedThing, fromIndex?: number | undefined): boolean;
    indexOf(searchElement: ContainedThing, fromIndex?: number | undefined): number;
    keys(): IterableIterator<number>; // to check
    map(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): unknown[];
    reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => ContainedThing): ContainedThing; 
    slice(start?: number, end?: number): this;
    some(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): boolean;
}

export interface WithWriteOperations<
    ContainedThing extends ThingBase<any> = ThingBase, 
> {
    add(thing: ContainedThing): this;
    // TODO: add meta description
    addAll(documentOrThings: this | ContainedThing[]): this;
    delete(thingOrUri: string | ContainedThing): this;
    deleteContext(): void;
    deleteMatches(uri?: string | Resource, property?: string, value?: string): this;
    pop(): ContainedThing | undefined;
    reverse(): void;
    setContext(context: Context): void;
    shift(): ContainedThing | undefined;
    sort(compareFn?: (a: ContainedThing, b: ContainedThing) => number): this;
    splice(start: number, deleteCount?: number, ...items: ContainedThing[]): this;
    // TODO: add meta description
    union(other: this): this;
}

export interface WithCreateOperations<
    ContainedThing extends ThingBase<any> = ThingBase, 
    SelfDescribingThing extends ThingBase<any> = ThingBase,
> {
    createThingToSelfDescribe(): SelfDescribingThing;
    createThingWithUri(nameHintOrUri?: string): ContainedThing;
    createThingWithoutUri(nameHint?: string): ContainedThing;
}

export interface WithCopyOperations<
    ContainedThing extends ThingBase<any> = ThingBase, 
    SelfDescribingThing extends ThingBase<any> = ThingBase,
> {
    toCopyReadonly<ContainedThingReadonly extends ThingReadonly<any>, SelfDescribingThingReadonly extends ThingReadonly<any>>(): DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly>;
}

export interface WithCopyWritableOperations<
    ContainedThing extends ThingBase<any> = ThingBase, 
    SelfDescribingThing extends ThingBase<any> = ThingBase,
> {
    toCopyWritable(): Document<ContainedThing, SelfDescribingThing>;
}

export type Document<
    ContainedThing extends ThingBase<any> = ThingBase, 
    SelfDescribingThing extends ThingBase<any> = ThingBase,
> = DocumentBase<ContainedThing, SelfDescribingThing> &
WithReadOperations<ContainedThing> &
WithWriteOperations<ContainedThing> &
WithCreateOperations<ContainedThing, SelfDescribingThing> &
WithCopyOperations<ContainedThing, SelfDescribingThing> & 
WithCopyWritableOperations<ContainedThing, SelfDescribingThing>;

export type DocumentReadonly<
    ContainedThing extends ThingReadonly<any> = ThingReadonly, 
    SelfDescribingThing extends ThingReadonly<any> = ThingReadonly,
> = DocumentBase<ContainedThing, SelfDescribingThing> & 
WithReadOperations<ContainedThing> & 
WithCopyWritableOperations<ContainedThing, SelfDescribingThing>;