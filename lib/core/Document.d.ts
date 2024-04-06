import Resource from "./Resource";
import Context from "./Context";
import { ThingBase, ReadonlyThing, Thing } from "./Thing";
export interface DocumentBase<ContainedThing extends ThingBase = ThingBase, SelfDescribingThing extends ThingBase = ThingBase> extends Resource, Iterable<ContainedThing> {
    get(uri: string | Resource): ContainedThing | undefined;
    getContext(): Context | undefined;
    getThingThatSelfDescribes(): SelfDescribingThing | undefined;
    has(thing: string | Resource): boolean;
    hasThingThatSelfDescribes(): boolean;
    isEmpty(): boolean;
    toCanonical(): string;
    toStream(): string;
    [Symbol.iterator](): Iterator<ContainedThing>;
}
export interface WithReadOperations<DocumentType extends DocumentBase<ContainedThing, SelfDescribingThing>, ContainedThing extends ThingBase, SelfDescribingThing extends ThingBase> {
    at(index: number): ContainedThing | undefined;
    contains(other: DocumentType): boolean;
    count(callbackfn?: (thing: ContainedThing, document?: DocumentType) => boolean): number;
    difference(other: DocumentType): DocumentType;
    equals(other: DocumentType): boolean;
    every(predicate: (value: ContainedThing, index?: number, array?: ContainedThing[]) => boolean, thisArg?: any): boolean;
    filter(predicate: (value: ContainedThing, index?: number, array?: ContainedThing[]) => boolean): ContainedThing[];
    find(predicate: (value: ContainedThing, index?: number, obj?: ContainedThing[]) => value is ContainedThing, thisArg?: any): ContainedThing | undefined;
    findIndex(predicate: (value: ContainedThing, index?: number, obj?: ContainedThing[]) => unknown, thisArg?: any): number;
    forEach(callbackfn: (value: ContainedThing, index?: number, array?: ContainedThing[]) => void, thisArg?: any): void;
    includes(searchElement: ContainedThing, fromIndex?: number | undefined): boolean;
    indexOf(searchElement: ContainedThing, fromIndex?: number | undefined): number;
    keys(): IterableIterator<number>;
    map(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): unknown[];
    reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => ContainedThing): ContainedThing;
    slice(start?: number, end?: number): DocumentType;
    some(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): boolean;
}
export interface WithWriteOperations<ContainedThing extends Thing, SelfDescribingThing extends Thing> {
    add(thing: ContainedThing): Document<ContainedThing, SelfDescribingThing>;
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
    union(other: ReadonlyDocument<ContainedThing, SelfDescribingThing>): Document<ContainedThing, SelfDescribingThing>;
}
export interface ReadonlyDocument<ContainedThing extends ReadonlyThing = ReadonlyThing, SelfDescribingThing extends ReadonlyThing = ReadonlyThing> extends DocumentBase<ContainedThing, SelfDescribingThing>, WithReadOperations<ReadonlyDocument<ContainedThing, SelfDescribingThing>, ContainedThing, SelfDescribingThing> {
    toCopy(): ReadonlyDocument<ContainedThing, SelfDescribingThing>;
    toCopyWritable<ContainedWritableThing extends Thing = Thing, SelfDescribingWritableThing extends Thing = Thing>(): Document<ContainedWritableThing, SelfDescribingWritableThing>;
}
export interface Document<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> extends DocumentBase<ContainedThing, SelfDescribingThing>, WithReadOperations<Document<ContainedThing, SelfDescribingThing>, ContainedThing, SelfDescribingThing>, WithWriteOperations<ContainedThing, SelfDescribingThing> {
    toCopy(): Document<ContainedThing, SelfDescribingThing>;
    toCopyReadonly(): ReadonlyDocument<ContainedThing, SelfDescribingThing>;
}
export default Document;
//# sourceMappingURL=Document.d.ts.map