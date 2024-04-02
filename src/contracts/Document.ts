import Resource from "./Resource";
import Context from "./Context";
import Thing from "./Thing";
//import WithReadOperations from "./WithReadOperations";
//import WithWriteOperations from "./WithWriteOperations";

export interface Document<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> extends Resource, Iterable<ContainedThing> {
    get(uri: string | Resource): ContainedThing | undefined;
    getContext(): Context | undefined;
    getThingThatSelfDescribes(): SelfDescribingThing | undefined;
    has(thing: string | Resource): boolean;
    hasThingThatSelfDescribes(): boolean;
    isEmpty(): boolean;
    //setContext(context: Context): void;
    toCanonical(): string; // DOMString? See https://github.com/digitalbazaar/rdf-canonize
    toGenericDocument(): Document<Thing, Thing>;
    toStream(): string; // Stream
    [Symbol.iterator](): Iterator<ContainedThing>;
}

export interface WithReadOperations<ContainedThing extends Thing, SelfDescribingThing extends Thing> {
    at(index: number): ContainedThing | undefined;
    contains(other: DocumentWithReadOperations<ContainedThing, SelfDescribingThing>): boolean;
    count(callbackfn?: (thing: ContainedThing, document?: DocumentWithReadOperations<ContainedThing, SelfDescribingThing>) => boolean): number;
    difference(other: DocumentWithReadOperations<ContainedThing, SelfDescribingThing>): DocumentWithReadOperations<ContainedThing, SelfDescribingThing>;
    equals(other: DocumentWithReadOperations<ContainedThing, SelfDescribingThing>): boolean;
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
    slice(start?: number, end?: number): DocumentWithReadOperations<ContainedThing, SelfDescribingThing>;
    some(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): boolean;
}

export interface WithWriteOperations<ContainedThing extends Thing, SelfDescribingThing extends Thing> {
    add(thing: ContainedThing): DocumentWithReadAndWriteOperations<ContainedThing, SelfDescribingThing>;
    // TODO: add meta description
    addAll(documentOrThings: DocumentWithReadOperations<ContainedThing, SelfDescribingThing> | ContainedThing[]): DocumentWithReadAndWriteOperations<ContainedThing, SelfDescribingThing>;
    createThingToSelfDescribe(): SelfDescribingThing;
    createThingWithUri(nameHintOrUri?: string): ContainedThing;
    createThingWithoutUri(nameHint?: string): ContainedThing;
    delete(thingOrUri: string | ContainedThing): DocumentWithReadAndWriteOperations<ContainedThing, SelfDescribingThing>;
    deleteContext(): void;
    deleteMatches(uri?: string | Resource, property?: string, value?: string): DocumentWithReadAndWriteOperations<ContainedThing, SelfDescribingThing>;
    pop(): ContainedThing | undefined;
    reverse(): void;
    setContext(context: Context): void;
    shift(): ContainedThing | undefined;
    sort(compareFn?: (a: ContainedThing, b: ContainedThing) => number): DocumentWithReadAndWriteOperations<ContainedThing, SelfDescribingThing>;
    splice(start: number, deleteCount?: number, ...items: ContainedThing[]): DocumentWithReadAndWriteOperations<ContainedThing, SelfDescribingThing>;
    // TODO: add meta description
    union(other: DocumentWithReadOperations<ContainedThing, SelfDescribingThing>): DocumentWithReadAndWriteOperations<ContainedThing, SelfDescribingThing>;
}

export type DocumentWithReadOperations<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> = Document<ContainedThing, SelfDescribingThing> & WithReadOperations<ContainedThing, SelfDescribingThing>;

export type DocumentWithReadAndWriteOperations<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> = DocumentWithReadOperations<ContainedThing, SelfDescribingThing> & WithWriteOperations<ContainedThing, SelfDescribingThing>;

export default Document;

/*

rdf-documents-synchronized
fetcher
cache
store-memory-default
store-local-storage
store-session-storage
store-indexeddb




export interface Document<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> extends Resource, Iterable<ContainedThing> {
    at(index: number): ContainedThing | undefined;
    add(thing: ContainedThing): Document<ContainedThing, SelfDescribingThing>;
    // TODO: add meta description
    addAll(documentOrThings: Document<ContainedThing, SelfDescribingThing> | ContainedThing[]): Document<ContainedThing, SelfDescribingThing>;
    contains(other: Document<ContainedThing, SelfDescribingThing>): boolean;
    count(callbackfn?: (thing: ContainedThing, document: Document<ContainedThing, SelfDescribingThing>) => boolean): number;
    createThingToSelfDescribe(): SelfDescribingThing;
    createThingWithUri(nameHintOrUri?: string): ContainedThing;
    createThingWithoutUri(nameHint?: string): ContainedThing;
    delete(thingOrUri: string | ContainedThing): Document<ContainedThing, SelfDescribingThing>;
    deleteContext(): void;
    deleteMatches(uri?: string | Resource, property?: string, value?: string): Document<ContainedThing, SelfDescribingThing>;
    difference(other: Document<ContainedThing, SelfDescribingThing>): Document<ContainedThing, SelfDescribingThing>;
    equals(other: Document<ContainedThing, SelfDescribingThing>): boolean;
    every(predicate: (value: ContainedThing, index?: number, array?: ContainedThing[]) => boolean, thisArg?: any): boolean;
    filter(predicate: (value: ContainedThing, index?: number, array?: ContainedThing[]) => boolean): ContainedThing[];
    find(predicate: (value: ContainedThing, index?: number, obj?: ContainedThing[]) => value is ContainedThing, thisArg?: any): ContainedThing | undefined;
    findIndex(predicate: (value: ContainedThing, index?: number, obj?: ContainedThing[]) => unknown, thisArg?: any): number
    forEach(callbackfn: (value: ContainedThing, index?: number, array?: ContainedThing[]) => void, thisArg?: any): void;
    get(uri: string | Resource): ContainedThing | undefined;
    getContext(): Context | undefined;
    getThingThatSelfDescribes(): SelfDescribingThing | undefined;
    has(thing: string | Resource): boolean;
    hasThingThatSelfDescribes(): boolean;
    includes(searchElement: ContainedThing, fromIndex?: number | undefined): boolean;
    indexOf(searchElement: ContainedThing, fromIndex?: number | undefined): number;
    // import
    // intersection
    isEmpty(): boolean;
    keys(): IterableIterator<number>; // to check
    map(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): unknown[];
    pop(): ContainedThing | undefined;
    reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => ContainedThing): ContainedThing; 
    reverse(): void;
    setContext(context: Context): void;
    shift(): ContainedThing | undefined;
    slice(start?: number, end?: number): Document<ContainedThing, SelfDescribingThing>;
    some(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): boolean;
    sort(compareFn?: (a: ContainedThing, b: ContainedThing) => number): Document<ContainedThing, SelfDescribingThing>;
    splice(start: number, deleteCount?: number, ...items: ContainedThing[]): Document<ContainedThing, SelfDescribingThing>;
    toCanonical(): string; // DOMString? See https://github.com/digitalbazaar/rdf-canonize
    toGenericDocument(): Document<Thing, Thing>;
    toStream(): string; // Stream
    // TODO: add meta description
    union(other: Document<ContainedThing, SelfDescribingThing>): Document<ContainedThing, SelfDescribingThing>;
}
*/