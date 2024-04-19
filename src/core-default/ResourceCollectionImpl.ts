import { Resource, ResourceCollection, ResourceCollectionWritable } from "../core/Common";

export class ResourceCollectionImpl<T> implements ResourceCollection<T> {

    protected _array: T[];

    public constructor(elements: T[] = []) {
        this._array = elements;
    }

    public get(resourceOrUri: string | Resource): T | undefined {
        throw new Error("Method not implemented.");
    }
    
    public has(resourceOrUri: string | Resource): boolean {
        throw new Error("Method not implemented.");
    }
    
    public at(index: number): T | undefined {
        return this._array.at(index);
    }
    
    public contains(other: T[]): boolean {
        throw new Error("Method not implemented.");
    }
    
    public count(callbackfn?: ((element: T, owner?: ResourceCollection<T> | undefined) => boolean) | undefined): number {
        throw new Error("Method not implemented.");
    }
    
    public every(predicate: (value: T, index?: number | undefined, array?: T[] | undefined) => boolean, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }
    
    public filter(predicate: (value: T, index?: number | undefined, array?: T[] | undefined) => boolean): T[] {
        throw new Error("Method not implemented.");
    }
    
    public find(predicate: (value: T, index?: number | undefined, obj?: T[] | undefined) => boolean, thisArg?: any): T | undefined {
        throw new Error("Method not implemented.");
    }
    
    public findIndex(predicate: (value: T, index?: number | undefined, obj?: T[] | undefined) => unknown, thisArg?: any): number {
        throw new Error("Method not implemented.");
    }
    
    public forEach(callbackfn: (value: T, index?: number | undefined, array?: T[] | undefined) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }
    
    public includes(searchElement: T, fromIndex?: number | undefined): boolean {
        throw new Error("Method not implemented.");
    }
    
    public indexOf(searchElement: T, fromIndex?: number | undefined): number {
        throw new Error("Method not implemented.");
    }
    
    public keys(): IterableIterator<number> {
        throw new Error("Method not implemented.");
    }
    
    public map(callbackfn: (value: T, index: number, array: T[]) => unknown, thisArg?: any): unknown[] {
        throw new Error("Method not implemented.");
    }
    
    public reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T {
        throw new Error("Method not implemented.");
    }
    
    public slice(start?: number | undefined, end?: number | undefined): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    
    public some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }
    
    public [Symbol.iterator](): Iterator<T> {
        throw new Error("Method not implemented.");
    }
    
    public isEmpty(): boolean {
        throw new Error("Method not implemented.");
    }

}

export class ResourceCollectionWritableImpl<T> extends ResourceCollectionImpl<T> implements ResourceCollectionWritable<T> {
    
    public add(element: T): this {
        this._array.push(element);
        return this;
    }
    
    public addAll(elements: T[]): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    
    public delete(element: T): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    
    public deleteMatches(uri?: string | Resource | undefined, property?: string | undefined, value?: string | undefined): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    
    public pop(): T | undefined {
        throw new Error("Method not implemented.");
    }
    
    public reverse(): void {
        throw new Error("Method not implemented.");
    }
    
    public shift(): T | undefined {
        throw new Error("Method not implemented.");
    }
    
    public sort(compareFn?: ((a: T, b: T) => number) | undefined): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    
    public splice(start: number, deleteCount?: number | undefined, ...items: T[]): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    
    public union(other: ThisType<this>): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    
}