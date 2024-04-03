import Resource from "./Resource";
import Context from "./Context";
import ThingBase from "./Thing";

export interface DocumentBase<ContainedThing extends ThingBase = ThingBase, SelfDescribingThing extends ThingBase = ThingBase> extends Resource, Iterable<ContainedThing> {
    get(uri: string | Resource): ContainedThing | undefined;
    getContext(): Context | undefined;
    getThingThatSelfDescribes(): SelfDescribingThing | undefined;
    has(thing: string | Resource): boolean;
    hasThingThatSelfDescribes(): boolean;
    isEmpty(): boolean;
    toCanonical(): string; // DOMString? See https://github.com/digitalbazaar/rdf-canonize
    toGenericDocument(): DocumentBase<ThingBase, ThingBase>; // PB returned type?
    toStream(): string; // Stream
    [Symbol.iterator](): Iterator<ContainedThing>;
    // TODO: add meta data (acl, last time modified, headers...)
}

export interface WithReadOperations<ContainedThing extends ThingBase, SelfDescribingThing extends ThingBase> {
    at(index: number): ContainedThing | undefined;
    contains(other: ReadonlyDocument<ContainedThing, SelfDescribingThing>): boolean;
    count(callbackfn?: (thing: ContainedThing, document?: ReadonlyDocument<ContainedThing, SelfDescribingThing>) => boolean): number;
    difference(other: ReadonlyDocument<ContainedThing, SelfDescribingThing>): ReadonlyDocument<ContainedThing, SelfDescribingThing>;
    equals(other: ReadonlyDocument<ContainedThing, SelfDescribingThing>): boolean;
    every(predicate: (value: ContainedThing, index?: number, array?: ContainedThing[]) => boolean, thisArg?: any): boolean;
    filter(predicate: (value: ContainedThing, index?: number, array?: ContainedThing[]) => boolean): ContainedThing[];
    find(predicate: (value: ContainedThing, index?: number, obj?: ContainedThing[]) => value is ContainedThing, thisArg?: any): ContainedThing | undefined;
    findIndex(predicate: (value: ContainedThing, index?: number, obj?: ContainedThing[]) => unknown, thisArg?: any): number
    forEach(callbackfn: (value: ContainedThing, index?: number, array?: ContainedThing[]) => void, thisArg?: any): void;
    includes(searchElement: ContainedThing, fromIndex?: number | undefined): boolean;
    indexOf(searchElement: ContainedThing, fromIndex?: number | undefined): number;
    keys(): IterableIterator<number>; // to check
    map(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): unknown[];
    reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => ContainedThing): ContainedThing; 
    slice(start?: number, end?: number): ReadonlyDocument<ContainedThing, SelfDescribingThing>;
    some(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): boolean;
}

export interface WithWriteOperations<ContainedThing extends ThingBase, SelfDescribingThing extends ThingBase> {
    add(thing: ContainedThing): Document<ContainedThing, SelfDescribingThing>;
    // TODO: add meta description
    addAll(documentOrThings: ReadonlyDocument<ContainedThing, SelfDescribingThing> | ContainedThing[]): Document<ContainedThing, SelfDescribingThing>;
    createThingToSelfDescribe(): SelfDescribingThing;
    createThingWithUri(nameHintOrUri?: string): ContainedThing;
    createThingWithoutUri(nameHint?: string): ContainedThing;
    delete(thingOrUri: string | ContainedThing): Document<ContainedThing, SelfDescribingThing>;
    deleteContext(): void;
    deleteMatches(uri?: string | Resource, property?: string, value?: string): Document<ContainedThing, SelfDescribingThing>;
    pop(): ContainedThing | undefined;
    reverse(): void;
    setContext(context: Context): void;
    shift(): ContainedThing | undefined;
    sort(compareFn?: (a: ContainedThing, b: ContainedThing) => number): Document<ContainedThing, SelfDescribingThing>;
    splice(start: number, deleteCount?: number, ...items: ContainedThing[]): Document<ContainedThing, SelfDescribingThing>;
    // TODO: add meta description
    union(other: ReadonlyDocument<ContainedThing, SelfDescribingThing>): Document<ContainedThing, SelfDescribingThing>;
}

export type ReadonlyDocument<ContainedThing extends ThingBase = ThingBase, SelfDescribingThing extends ThingBase = ThingBase> = DocumentBase<ContainedThing, SelfDescribingThing> & WithReadOperations<ContainedThing, SelfDescribingThing>;
export type Document<ContainedThing extends ThingBase = ThingBase, SelfDescribingThing extends ThingBase = ThingBase> = DocumentBase<ContainedThing, SelfDescribingThing> & WithReadOperations<ContainedThing, SelfDescribingThing> & WithWriteOperations<ContainedThing, SelfDescribingThing>;
export default Document;