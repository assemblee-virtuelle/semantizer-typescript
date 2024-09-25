import { BlankNode, DatasetCore, NamedNode, Quad } from "@rdfjs/types";
import { Semantizer } from "./Semantizer";

export type Resource = NamedNode | BlankNode;

export interface WithSemantizer {
    getSemantizer(): Semantizer;
    // toRdfjsDataset(): DatasetRdfjs;
}

export interface WithOrigin {
    getOrigin(): NamedNode | BlankNode | undefined;
    setOrigin(uri: NamedNode | BlankNode): void;
    getOriginDocument(): NamedNode | undefined;
    getOriginThing(): NamedNode | BlankNode | undefined;
    setOriginThing(term: NamedNode | BlankNode): void;
}

export type QuadIterableSemantizer = Iterable<Quad> & WithSemantizer & WithOrigin;

// export interface Resource {
//     getUri(): string;
//     hasUri(): boolean;
// }

export interface ResourceCollection<T> extends Iterable<T>, Countable {
    [Symbol.iterator](): Iterator<T>;
    // get(resourceOrUri: string | Resource): T | undefined;
    //getAll(element: Key): T[]; toArray()
    // has(resourceOrUri: string | Resource): boolean;

    at(index: number): T | undefined;
    contains(other: Iterable<T>): boolean;
    count(): number; //callbackfn?: (element: T, owner?: ResourceCollection<T>) => boolean): number;
    every(predicate: (value: T, index?: number, array?: T[]) => boolean, thisArg?: any): boolean;
    filter(predicate: (value: T, index?: number, array?: T[]) => boolean): T[];
    find(predicate: (value: T, index?: number, obj?: T[]) => boolean, thisArg?: any): T | undefined;
    findIndex(predicate: (value: T, index?: number, obj?: T[]) => unknown, thisArg?: any): number
    forEach(callbackfn: (value: T, index?: number, array?: T[]) => void, thisArg?: any): void;
    includes(searchElement: T, fromIndex?: number): boolean;
    indexOf(searchElement: T, fromIndex?: number): number;
    keys(): IterableIterator<number>;
    map(callbackfn: (value: T, index?: number, array?: T[]) => unknown, thisArg?: any): unknown[];
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T; 
    slice(start?: number, end?: number): ThisType<this>;
    some(predicate: (value: T, index?: number, array?: T[]) => unknown, thisArg?: any): boolean;
}

// export interface ResourceCollectionWritable<T> /*extends ResourceCollection<T>*/ {
//     add(element: T): ThisType<this>;
//     addAll(elements: T[]): ThisType<this>;
//     delete(element: T): ThisType<this>;
//     deleteMatches(uri?: string | Resource, property?: string, value?: string): ThisType<this>;
//     pop(): T | undefined;
//     reverse(): void;
//     shift(): T | undefined;
//     sort(compareFn?: (a: T, b: T) => number): ThisType<this>;
//     splice(start: number, deleteCount?: number, ...items: T[]): ThisType<this>;
//     union(other: ThisType<this>): ThisType<this>;
//     //toReadonly(): ResourceCollection<T>;
// }

export interface Countable {
    count(): number;
    isEmpty(): boolean;
}

export interface Copyable {
    toCopy(): ThisType<this>;
}

export interface Comparable {
    equals(other: ThisType<this>): boolean;
    difference(other: ThisType<this>): ThisType<this>;
}

export interface WithOwner<T> {
    getOwner(): T;
}

export interface Context {
    expand(uri: string): string;
    shorten(uri: string): string;
}

export interface WithContext {
    getContext(): Context | undefined;
}

export interface WithContextWritable {
    deleteContext(): void;
    setContext(context: Context): void;
}

export interface CopyableToReadonly<T> {
    toCopyReadonly(): T;
}

export interface CopyableToWritable<T> {  
    toCopyWritable(): T;
}

// export interface WithFactory<T extends Document<any, any>> {
//     getFactory(): Factory<T>;
// }

// export interface WithFactoryForCopying<T extends Document<any, any> | DocumentWritable<any, any>> {
//     getFactoryForCopying(): FactoryForCopying<T>;
// }

export interface Streamable {
    toStream(): string; // Stream
}

export interface Canonical {
    toCanonical(): string; // DOMString? See https://github.com/digitalbazaar/rdf-canonize
}

export interface DocumentLoadOptions {
    loadSeeAlso?: boolean;
    seeAlsoMaxDepth?: number;
}

export type AnyFunction<A = any> = (...input: any[]) => A;
export type AnyConstructor<A = object> = new (...input: any[]) => A;
export type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>;

// export interface MixinFactory<
//     ContainedThing extends Thing<any> = Thing,
//     SelfDescribingThing extends Thing<any> = Thing
// >  {
//     create<T extends DocumentWithDestructiveOperations<ContainedThing, SelfDescribingThing>>(uri: string, callback: (impl: DocumentConstructor<ContainedThing, SelfDescribingThing>) => AnyConstructor<T>): T;
// }