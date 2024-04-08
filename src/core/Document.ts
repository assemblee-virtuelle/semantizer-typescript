import Context from "./Context";
import Resource from "./Resource";
import { ThingBase, ThingReadonly } from "./Thing";
import ThingFactory from "./ThingFactory";

//type MixinFunction<Type extends DocumentBase<any, any>> = <TSuper extends Document<any, any>>(base: Constructor<TSuper>) => Constructor<TSuper & Type>;

export interface DocumentBase<
    ContainedThing extends ThingBase<any> = ThingBase, 
    SelfDescribingThing extends ThingBase<any> = ThingBase,
> extends Resource, Iterable<ContainedThing> {
        //constructor(): DocumentBase<ContainedThing, SelfDescribingThing>;
    get(uri: string | Resource): ContainedThing | undefined;
    getContext(): Context | undefined;
    getThingThatSelfDescribes(): SelfDescribingThing | undefined;
    has(thing: string | Resource): boolean;
    hasThingThatSelfDescribes(): boolean;
    isEmpty(): boolean;
    toCanonical(): string; // DOMString? See https://github.com/digitalbazaar/rdf-canonize
    toStream(): string; // Stream
    [Symbol.iterator](): Iterator<ContainedThing>;

    at(index: number): ContainedThing | undefined;
    contains(other: ThisType<this>): boolean;
    count(callbackfn?: (thing: ContainedThing, document?: ThisType<this>) => boolean): number;
    difference(other: ThisType<this>): ThisType<this>;
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
    slice(start?: number, end?: number): ThisType<this>;
    some(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): boolean;
    
    // TODO: add meta data (acl, last time modified, headers...)
}

export interface DocumentBaseReadonly<
    ContainedThing extends ThingReadonly<any> = ThingReadonly, 
    SelfDescribingThing extends ThingReadonly<any> = ThingReadonly,
> extends DocumentBase<ContainedThing, SelfDescribingThing> {}

export type ContainedThingOf<T extends DocumentBase<any, any>> = T extends DocumentBase<infer TypeArg, any> ? TypeArg : never;
export type ContainedThingReadonlyOf<T extends DocumentBaseReadonly<any, any>> = T extends DocumentBaseReadonly<infer TypeArg, any> ? TypeArg : never;
export type SelfDescribingThingOf<T extends DocumentBase> = T extends DocumentBase<any, infer TypeArg> ? TypeArg : never;
export type SelfDescribingThingReadonlyOf<T extends DocumentBaseReadonly<any, any>> = T extends DocumentBaseReadonly<any, infer TypeArg> ? TypeArg : never;

export interface WithReadOperations<Wrapped extends DocumentBase<any, any>> {
    at(index: number): ContainedThingOf<Wrapped> | undefined;
    contains(other: ThisType<Wrapped>): boolean;
    count(callbackfn?: (thing: ContainedThingOf<Wrapped>, document?: ThisType<Wrapped>) => boolean): number;
    difference(other: ThisType<Wrapped>): Wrapped;
    equals(other: ThisType<Wrapped>): boolean;
    every(predicate: (value: ContainedThingOf<Wrapped>, index?: number, array?: ContainedThingOf<Wrapped>[]) => boolean, thisArg?: any): boolean;
    filter(predicate: (value: ContainedThingOf<Wrapped>, index?: number, array?: ContainedThingOf<Wrapped>[]) => boolean): ContainedThingOf<Wrapped>[];
    find(predicate: (value: ContainedThingOf<Wrapped>, index?: number, obj?: ContainedThingOf<Wrapped>[]) => boolean, thisArg?: any): ContainedThingOf<Wrapped> | undefined;
    findIndex(predicate: (value: ContainedThingOf<Wrapped>, index?: number, obj?: ContainedThingOf<Wrapped>[]) => unknown, thisArg?: any): number
    forEach(callbackfn: (value: ContainedThingOf<Wrapped>, index?: number, array?: ContainedThingOf<Wrapped>[]) => void, thisArg?: any): void;
    includes(searchElement: ContainedThingOf<Wrapped>, fromIndex?: number | undefined): boolean;
    indexOf(searchElement: ContainedThingOf<Wrapped>, fromIndex?: number | undefined): number;
    keys(): IterableIterator<number>; // to check
    map(callbackfn: (value: ContainedThingOf<Wrapped>, index: number, array: ContainedThingOf<Wrapped>[]) => unknown, thisArg?: any): unknown[];
    reduce(callbackfn: (previousValue: ContainedThingOf<Wrapped>, currentValue: ContainedThingOf<Wrapped>, currentIndex: number, array: ContainedThingOf<Wrapped>[]) => ContainedThingOf<Wrapped>): ContainedThingOf<Wrapped>; 
    slice(start?: number, end?: number): Wrapped;
    some(predicate: (value: ContainedThingOf<Wrapped>, index: number, array: ContainedThingOf<Wrapped>[]) => unknown, thisArg?: any): boolean;
}

export interface WithWriteOperations<Wrapped extends Document<Wrapped>> {
    add(thing: ContainedThingOf<Wrapped>): Wrapped;
    // TODO: add meta description
    addAll(documentOrThings: Wrapped | ContainedThingOf<Wrapped>[]): Wrapped;
    delete(thingOrUri: string | ContainedThingOf<Wrapped>): Wrapped;
    deleteContext(): void;
    deleteMatches(uri?: string | Resource, property?: string, value?: string): Wrapped;
    pop(): ContainedThingOf<Wrapped> | undefined;
    reverse(): void;
    setContext(context: Context): void;
    shift(): ContainedThingOf<Wrapped> | undefined;
    sort(compareFn?: (a: ContainedThingOf<Wrapped>, b: ContainedThingOf<Wrapped>) => number): Wrapped;
    splice(start: number, deleteCount?: number, ...items: ContainedThingOf<Wrapped>[]): Wrapped;
    // TODO: add meta description
    union(other: Wrapped): Wrapped;
}

export interface DocumentReadonly<Wrapped extends DocumentBaseReadonly<ContainedThingReadonlyOf<Wrapped>, SelfDescribingThingReadonlyOf<Wrapped>>>
extends DocumentBaseReadonly<ContainedThingReadonlyOf<Wrapped>, SelfDescribingThingReadonlyOf<Wrapped>> {
    toCopy(): Wrapped;
    toCopyWritable<ReturnedDocument extends Document<any>>(): Document<ReturnedDocument>;
}

export interface Document<Wrapped extends Document<Wrapped>>
extends DocumentBase<ContainedThingOf<Wrapped>, SelfDescribingThingOf<Wrapped>>, WithWriteOperations<Wrapped> {
    createThingToSelfDescribe(): SelfDescribingThingOf<Wrapped>;
    createThingWithUri(nameHintOrUri?: string): ContainedThingOf<Wrapped>;
    createThingWithoutUri(nameHint?: string): ContainedThingOf<Wrapped>;
    getContainedThingFactory(): ThingFactory<Wrapped>;
    toCopy(): Wrapped;
    toCopyReadonly<ReturnedDocumentReadonly extends DocumentBaseReadonly<any, any>>(): DocumentReadonly<ReturnedDocumentReadonly>;
}

export default Document;