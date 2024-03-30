import Thing from "./Thing";
import Resource from "./Resource";
import Context from "./Context";

export interface Document<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> extends Resource, Iterable<ContainedThing> {
    at(index: number): ContainedThing | undefined;
    add(thing: ContainedThing): Document<ContainedThing, SelfDescribingThing>;
    addAll(document: Document<any, any>): Document<ContainedThing, SelfDescribingThing>;
    count(callbackfn?: (thing: ContainedThing, document: Document<ContainedThing, SelfDescribingThing>) => boolean): number;
    createLocalCopy(): Document<ContainedThing, SelfDescribingThing>;
    createThingToSelfDescribe(): SelfDescribingThing;
    createThingWithUri(nameHintOrUri?: string): ContainedThing;
    createThingWithoutUri(nameHint?: string): ContainedThing;
    delete(thingOrUri: string | Thing): Document<ContainedThing, SelfDescribingThing>;
    deleteContext(): void;
    deleteMatches(uri?: string | Resource, property?: string, value?: string): Document<ContainedThing, SelfDescribingThing>;
    difference(other: Document): Document; // Types?
    equals(other: Document<any, any>): boolean;
    every(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => value is ContainedThing, thisArg?: any): boolean;
    filter(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => boolean): ContainedThing[];
    find(): ContainedThing | null; // TODO
    findIndex(thing: string | Resource): number;
    forEach(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => void, thisArg?: any): void;
    get(uri: string | Resource): ContainedThing | null;
    getContext(): Context | undefined;
    getThingThatSelfDescribes(): SelfDescribingThing | null;
    has(thing: string | Resource): boolean;
    hasThingThatSelfDescribes(): boolean;
    includes(other: Document): boolean;
    indexOf(searchElement: ContainedThing, fromIndex?: number | undefined): number;
    isEmpty(): boolean;
    isLocal(): boolean;
    isDistant(): boolean;
    // import
    // intersection
    keys(): IterableIterator<number>; // to check
    map(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): unknown[];
    pop(): ContainedThing | undefined;
    reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => ContainedThing): ContainedThing; 
    reverse(): void;
    setContext(context: Context): void;
    shift(): ContainedThing | undefined;
    slice(start?: number, end?: number): Document<ContainedThing, SelfDescribingThing>;
    some(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): boolean;
    sort(compareFn?: (a: ContainedThing, b: ContainedThing) => number): Document;
    splice(start: number, deleteCount?: number, ...items: ContainedThing[]): Document;
    toCanonical(): string; // DOMString? See https://github.com/digitalbazaar/rdf-canonize
    toStream(): string; // Stream
    union(other: Document): Document; // or join()?
}

export default Document;

//expand(uri: string): string;
//shorten(uri: string): string;
//countStatementsAbout(subject: string | Resource, property?: string): number;
// hasStatementsAbout(subject: string | Resource, property?: string, ...hasValues: string[]): boolean; // = some()