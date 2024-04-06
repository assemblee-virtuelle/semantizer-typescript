import { Context } from "../index";
import Document, { ReadonlyDocument } from "./Document";
import Resource from "./Resource";
import ThingBase, { ReadonlyThing, Thing } from "./Thing";

export class DecoratedDocument<ContainedThing extends ThingBase = ThingBase, SelfDescribingThing extends ThingBase = ThingBase> implements Document<ContainedThing, SelfDescribingThing> {

    private _document: Document<ContainedThing, SelfDescribingThing>;

    public constructor(document: Document<ContainedThing, SelfDescribingThing>) {
        this._document = document;
    }

    public get(uri: string | Resource): ContainedThing | undefined {
        return this._document.get(uri);
    }

    public getContext(): Context | undefined {
        return this._document.getContext();
    }

    public getThingThatSelfDescribes(): SelfDescribingThing | undefined {
        return this._document.getThingThatSelfDescribes();
    }

    public has(thing: string | Resource): boolean {
        return this._document.has(thing);
    }

    public hasThingThatSelfDescribes(): boolean {
        return this._document.hasThingThatSelfDescribes();
    }

    public isEmpty(): boolean {
        return this._document.isEmpty();
    }

    public toCanonical(): string {
        return this._document.toCanonical();
    }

    public toCopy(): Document<ContainedThing, SelfDescribingThing> {
        return this._document.toCopy();
    }

    public toCopyReadonly(): ReadonlyDocument<ContainedThing, SelfDescribingThing> {
        return this._document.toCopyReadonly();
    }

    public toStream(): string {
        return this._document.toStream();
    }

    public [Symbol.iterator](): Iterator<ContainedThing> {
        return this._document[Symbol.iterator]();
    }
    
    public getUri(): string {
        return this._document.getUri();
    }

    public at(index: number): ContainedThing | undefined {
        return this._document.at(index);
    }

    public contains(other: Document<ContainedThing, SelfDescribingThing>): boolean {
        return this._document.contains(other);
    }

    public count(callbackfn?: ((thing: ContainedThing, document?: (Document<ContainedThing, SelfDescribingThing>) | undefined) => boolean) | undefined): number {
        return this._document.count(callbackfn);
    }

    public difference(other: Document<ContainedThing, SelfDescribingThing>): Document<ContainedThing, SelfDescribingThing> {
        return this._document.difference(other);
    }

    public equals(other: Document<ContainedThing, SelfDescribingThing>): boolean {
        return this._document.equals(other);
    }

    public every(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => boolean, thisArg?: any): boolean {
        return this._document.every(predicate);
    }

    public filter(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => boolean): ContainedThing[] {
        return this._document.filter(predicate);
    }

    public find(predicate: (value: ContainedThing, index?: number | undefined, obj?: ContainedThing[] | undefined) => value is ContainedThing, thisArg?: any): ContainedThing | undefined {
        return this._document.find(predicate);
    }

    public findIndex(predicate: (value: ContainedThing, index?: number | undefined, obj?: ContainedThing[] | undefined) => unknown, thisArg?: any): number {
        return this._document.findIndex(predicate);
    }

    public forEach(callbackfn: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => void, thisArg?: any): void {
        return this._document.forEach(callbackfn);
    }

    public includes(searchElement: ContainedThing, fromIndex?: number | undefined): boolean {
        return this._document.includes(searchElement);
    }

    public indexOf(searchElement: ContainedThing, fromIndex?: number | undefined): number {
        return this._document.indexOf(searchElement, fromIndex);
    }

    public keys(): IterableIterator<number> {
        return this._document.keys();
    }

    public map(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): unknown[] {
        return this._document.map(callbackfn);
    }

    public reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => ContainedThing): ContainedThing {
        return this._document.reduce(callbackfn);
    }

    public slice(start?: number | undefined, end?: number | undefined): Document<ContainedThing, SelfDescribingThing> {
        return this._document.slice(start, end);
    }

    public some(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): boolean {
        return this._document.some(predicate);
    }

    public add(thing: ContainedThing): Document<ContainedThing, SelfDescribingThing> {
        return this._document.add(thing);
    }

    public addAll(documentOrThings: ContainedThing[] | (ReadonlyDocument<ContainedThing, SelfDescribingThing>)): Document<ContainedThing, SelfDescribingThing> {
        return this._document.addAll(documentOrThings);
    }

    public createThingToSelfDescribe(): SelfDescribingThing {
        return this._document.createThingToSelfDescribe();
    }

    public createThingWithUri(nameHintOrUri?: string | undefined): ContainedThing {
        return this._document.createThingWithUri(nameHintOrUri);
    }

    public createThingWithoutUri(nameHint?: string | undefined): ContainedThing {
        return this._document.createThingWithoutUri(nameHint);
    }

    public delete(thingOrUri: string | ContainedThing): Document<ContainedThing, SelfDescribingThing> {
        return this._document.delete(thingOrUri);
    }

    public deleteContext(): void {
        return this._document.deleteContext()
    }

    public deleteMatches(uri?: string | Resource | undefined, property?: string | undefined, value?: string | undefined): Document<ContainedThing, SelfDescribingThing> {
        return this._document.deleteMatches(uri, property, value);
    }

    public pop(): ContainedThing | undefined {
        return this._document.pop();
    }

    public reverse(): void {
        return this._document.reverse();
    }

    public setContext(context: Context): void {
        return this._document.setContext(context);
    }

    public shift(): ContainedThing | undefined {
        return this._document.shift();
    }

    public sort(compareFn?: ((a: ContainedThing, b: ContainedThing) => number) | undefined): Document<ContainedThing, SelfDescribingThing> {
        return this._document.sort(compareFn);
    }

    public splice(start: number, deleteCount?: number | undefined, ...items: ContainedThing[]): Document<ContainedThing, SelfDescribingThing> {
        return this._document.splice(start, deleteCount, ...items);
    }

    public union(other: ReadonlyDocument<ContainedThing, SelfDescribingThing>): Document<ContainedThing, SelfDescribingThing> {
        return this._document.union(other);
    }

}

export class DecoratedReadonlyDocument<ContainedThing extends ReadonlyThing = ReadonlyThing, SelfDescribingThing extends ReadonlyThing = ReadonlyThing> implements ReadonlyDocument<ContainedThing, SelfDescribingThing> {

    private _document: ReadonlyDocument<ContainedThing, SelfDescribingThing>;

    public constructor(document: ReadonlyDocument<ContainedThing, SelfDescribingThing>) {
        this._document = document;
    }

    public get(uri: string | Resource): ContainedThing | undefined {
        return this._document.get(uri);
    }

    public getContext(): Context | undefined {
        return this._document.getContext();
    }

    public getThingThatSelfDescribes(): SelfDescribingThing | undefined {
        return this._document.getThingThatSelfDescribes();
    }

    public has(thing: string | Resource): boolean {
        return this._document.has(thing);
    }

    public hasThingThatSelfDescribes(): boolean {
        return this._document.hasThingThatSelfDescribes();
    }

    public isEmpty(): boolean {
        return this._document.isEmpty();
    }

    public toCanonical(): string {
        return this._document.toCanonical();
    }

    public toCopy(): ReadonlyDocument<ContainedThing, SelfDescribingThing> {
        return this._document.toCopy();
    }

    public toCopyWritable<ContainedWritableThing extends Thing = Thing, SelfDescribingWritableThing extends Thing = Thing>(): Document<ContainedWritableThing, SelfDescribingWritableThing> {
        return this._document.toCopyWritable<ContainedWritableThing, SelfDescribingWritableThing>();
    }

    public toStream(): string {
        return this._document.toStream();
    }

    public [Symbol.iterator](): Iterator<ContainedThing> {
        return this._document[Symbol.iterator]();
    }
    
    public getUri(): string {
        return this._document.getUri();
    }

    public at(index: number): ContainedThing | undefined {
        return this._document.at(index);
    }

    public contains(other: ReadonlyDocument<ContainedThing, SelfDescribingThing>): boolean {
        return this._document.contains(other);
    }

    public count(callbackfn?: ((thing: ContainedThing, document?: (ReadonlyDocument<ContainedThing, SelfDescribingThing>) | undefined) => boolean) | undefined): number {
        return this._document.count(callbackfn);
    }

    public difference(other: ReadonlyDocument<ContainedThing, SelfDescribingThing>): ReadonlyDocument<ContainedThing, SelfDescribingThing> {
        return this._document.difference(other);
    }

    public equals(other: ReadonlyDocument<ContainedThing, SelfDescribingThing>): boolean {
        return this._document.equals(other);
    }

    public every(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => boolean, thisArg?: any): boolean {
        return this._document.every(predicate);
    }

    public filter(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => boolean): ContainedThing[] {
        return this._document.filter(predicate);
    }

    public find(predicate: (value: ContainedThing, index?: number | undefined, obj?: ContainedThing[] | undefined) => value is ContainedThing, thisArg?: any): ContainedThing | undefined {
        return this._document.find(predicate);
    }

    public findIndex(predicate: (value: ContainedThing, index?: number | undefined, obj?: ContainedThing[] | undefined) => unknown, thisArg?: any): number {
        return this._document.findIndex(predicate);
    }

    public forEach(callbackfn: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => void, thisArg?: any): void {
        return this._document.forEach(callbackfn);
    }

    public includes(searchElement: ContainedThing, fromIndex?: number | undefined): boolean {
        return this._document.includes(searchElement);
    }

    public indexOf(searchElement: ContainedThing, fromIndex?: number | undefined): number {
        return this._document.indexOf(searchElement, fromIndex);
    }

    public keys(): IterableIterator<number> {
        return this._document.keys();
    }

    public map(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): unknown[] {
        return this._document.map(callbackfn);
    }

    public reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => ContainedThing): ContainedThing {
        return this._document.reduce(callbackfn);
    }

    public slice(start?: number | undefined, end?: number | undefined): ReadonlyDocument<ContainedThing, SelfDescribingThing> {
        return this._document.slice(start, end);
    }

    public some(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): boolean {
        return this._document.some(predicate);
    }

}

export default DecoratedDocument;