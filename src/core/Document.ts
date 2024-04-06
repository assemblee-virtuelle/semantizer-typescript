import Context from "./Context";
import Resource from "./Resource";
import { Thing, ThingBase, ThingReadonly } from "./Thing";
import ThingFactory from "./ThingFactory";

export interface DocumentBase<
    ContainedThing extends ThingBase = ThingBase, 
    SelfDescribingThing extends ThingBase = ThingBase
> extends Resource, Iterable<ContainedThing>, WithReadOperations<ContainedThing, SelfDescribingThing> {
    //constructor(): DocumentBase<ContainedThing, SelfDescribingThing>;
    get(uri: string | Resource): ContainedThing | undefined;
    getContext(): Context | undefined;
    getThingThatSelfDescribes(): SelfDescribingThing | undefined;
    count(callbackfn?: (thing: ContainedThing, document?: DocumentBase<ContainedThing, SelfDescribingThing>) => boolean): number;
    has(thing: string | Resource): boolean;
    hasThingThatSelfDescribes(): boolean;
    isEmpty(): boolean;
    toCanonical(): string; // DOMString? See https://github.com/digitalbazaar/rdf-canonize
    toStream(): string; // Stream
    [Symbol.iterator](): Iterator<ContainedThing>;

    // TODO: add meta data (acl, last time modified, headers...)
}

export interface WithReadOperations2<
    DocumentType extends DocumentBase<any extends infer CT? CT: never, any extends infer SDT? SDT: never>    
> {
    test(): DocumentType;
}

export interface WithReadOperations<
    ContainedThing extends ThingBase = ThingBase, 
    SelfDescribingThing extends ThingBase = ThingBase,
    DocumentType extends DocumentBase<ContainedThing, SelfDescribingThing> = DocumentBase<ContainedThing, SelfDescribingThing>
> {
    at(index: number): ContainedThing | undefined;
    contains(other: DocumentType): boolean;
    difference(other: DocumentType): DocumentType;
    equals(other: DocumentType): boolean;
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
    slice(start?: number, end?: number): DocumentType;
    some(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): boolean;
}

export interface WithWriteOperations<
    ContainedThing extends Thing, 
    SelfDescribingThing extends Thing
> {
    add(thing: ContainedThing): Document<ContainedThing, SelfDescribingThing>;
    // TODO: add meta description
    addAll(documentOrThings: DocumentBase<ContainedThing, SelfDescribingThing> | ContainedThing[]): Document<ContainedThing, SelfDescribingThing>;
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
    union(other: DocumentBase<ContainedThing, SelfDescribingThing>): Document<ContainedThing, SelfDescribingThing>;
}

export interface DocumentReadonly<
    ContainedThing extends ThingReadonly = ThingReadonly, 
    SelfDescribingThing extends ThingReadonly = ThingReadonly
> extends DocumentBase<ContainedThing, SelfDescribingThing> { //}, WithReadOperations<DocumentReadonly<ContainedThing, SelfDescribingThing>, ContainedThing, SelfDescribingThing> {
    toCopy(): DocumentReadonly<ContainedThing, SelfDescribingThing>;
    toCopyWritable<ContainedWritableThing extends Thing = Thing, SelfDescribingWritableThing extends Thing = Thing>(): Document<ContainedWritableThing, SelfDescribingWritableThing>;
}

export interface Document<
    ContainedThing extends Thing = Thing, 
    SelfDescribingThing extends Thing = Thing
> extends DocumentBase<ContainedThing, SelfDescribingThing>, WithWriteOperations<ContainedThing, SelfDescribingThing> {
    createThingToSelfDescribe(): SelfDescribingThing;
    createThingWithUri(nameHintOrUri?: string): ContainedThing;
    createThingWithoutUri(nameHint?: string): ContainedThing;
    getContainedThingFactory(): ThingFactory<ContainedThing, SelfDescribingThing>;
    toCopy(): Document<ContainedThing, SelfDescribingThing>;
    toCopyReadonly<ContainedThingReadonly extends ThingReadonly = ThingReadonly, SelfDescribingThingReadonly extends ThingReadonly = ThingReadonly>(): DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly>;
}

export default Document;