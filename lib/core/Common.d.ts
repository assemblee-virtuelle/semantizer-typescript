export interface Resource {
    getUri(): string;
    hasUri(): boolean;
}
export interface ResourceCollection<T> extends Iterable<T>, Countable {
    [Symbol.iterator](): Iterator<T>;
    at(index: number): T | undefined;
    contains(other: Iterable<T>): boolean;
    count(): number;
    every(predicate: (value: T, index?: number, array?: T[]) => boolean, thisArg?: any): boolean;
    filter(predicate: (value: T, index?: number, array?: T[]) => boolean): T[];
    find(predicate: (value: T, index?: number, obj?: T[]) => boolean, thisArg?: any): T | undefined;
    findIndex(predicate: (value: T, index?: number, obj?: T[]) => unknown, thisArg?: any): number;
    forEach(callbackfn: (value: T, index?: number, array?: T[]) => void, thisArg?: any): void;
    includes(searchElement: T, fromIndex?: number): boolean;
    indexOf(searchElement: T, fromIndex?: number): number;
    keys(): IterableIterator<number>;
    map(callbackfn: (value: T, index?: number, array?: T[]) => unknown, thisArg?: any): unknown[];
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
    slice(start?: number, end?: number): ThisType<this>;
    some(predicate: (value: T, index?: number, array?: T[]) => unknown, thisArg?: any): boolean;
}
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
export interface Streamable {
    toStream(): string;
}
export interface Canonical {
    toCanonical(): string;
}
//# sourceMappingURL=Common.d.ts.map