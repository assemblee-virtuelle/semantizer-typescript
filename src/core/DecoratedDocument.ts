import Document, { DocumentBase, ReadonlyDocument } from "./Document";
import Resource from "./Resource";
import ThingBase from "./Thing";
import { Context } from "../index";

export class DecoratedDocument<ContainedThing extends ThingBase = ThingBase, SelfDescribingThing extends ThingBase = ThingBase> implements Document<ContainedThing, SelfDescribingThing> {

    private _document: Document<ContainedThing, SelfDescribingThing> | ReadonlyDocument<ContainedThing, SelfDescribingThing>;

    public constructor(document: Document<ContainedThing, SelfDescribingThing> | ReadonlyDocument<ContainedThing, SelfDescribingThing>) {
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

    public toGenericDocument(): DocumentBase<ContainedThing, SelfDescribingThing> {
        return this._document.toGenericDocument();
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

    private makeReadonlyError(): Error {
        return new Error("Document is Readonly.");
    }

    public add(thing: ContainedThing): Document<ContainedThing, SelfDescribingThing> {
        try {
            return (this._document as Document<ContainedThing, SelfDescribingThing>).add(thing);
        } catch(e) {
            throw this.makeReadonlyError();
        }
    }

    public addAll(documentOrThings: ContainedThing[] | (ReadonlyDocument<ContainedThing, SelfDescribingThing>)): Document<ContainedThing, SelfDescribingThing> {
        try {
            return (this._document as Document<ContainedThing, SelfDescribingThing>).addAll(documentOrThings);
        } catch(e) {
            throw this.makeReadonlyError();
        }
    }

    public createThingToSelfDescribe(): SelfDescribingThing {
        try {
            return (this._document as Document<ContainedThing, SelfDescribingThing>).createThingToSelfDescribe();
        } catch(e) {
            throw this.makeReadonlyError();
        }
    }

    public createThingWithUri(nameHintOrUri?: string | undefined): ContainedThing {
        try {
            return (this._document as Document<ContainedThing, SelfDescribingThing>).createThingWithUri(nameHintOrUri);
        } catch(e) {
            throw this.makeReadonlyError();
        }
    }

    public createThingWithoutUri(nameHint?: string | undefined): ContainedThing {
        try {
            return (this._document as Document<ContainedThing, SelfDescribingThing>).createThingWithoutUri(nameHint);
        } catch(e) {
            throw this.makeReadonlyError();
        }
    }

    public delete(thingOrUri: string | ContainedThing): Document<ContainedThing, SelfDescribingThing> {
        try {
            return (this._document as Document<ContainedThing, SelfDescribingThing>).delete(thingOrUri);
        } catch(e) {
            throw this.makeReadonlyError();
        }
    }

    public deleteContext(): void {
        try {
            return (this._document as Document<ContainedThing, SelfDescribingThing>).deleteContext()
        } catch(e) {
            throw this.makeReadonlyError();
        }
    }

    public deleteMatches(uri?: string | Resource | undefined, property?: string | undefined, value?: string | undefined): Document<ContainedThing, SelfDescribingThing> {
        try {
            return (this._document as Document<ContainedThing, SelfDescribingThing>).deleteMatches(uri, property, value);
        } catch(e) {
            throw this.makeReadonlyError();
        }
    }

    public pop(): ContainedThing | undefined {
        try {
            return (this._document as Document<ContainedThing, SelfDescribingThing>).pop();
        } catch(e) {
            throw this.makeReadonlyError();
        }
    }

    public reverse(): void {
        try {
            return (this._document as Document<ContainedThing, SelfDescribingThing>).reverse();
        } catch(e) {
            throw this.makeReadonlyError();
        }
    }

    public setContext(context: Context): void {
        try {
            return (this._document as Document<ContainedThing, SelfDescribingThing>).setContext(context);
        } catch(e) {
            throw this.makeReadonlyError();
        }
    }

    public shift(): ContainedThing | undefined {
        try {
            return (this._document as Document<ContainedThing, SelfDescribingThing>).shift();
        } catch(e) {
            throw this.makeReadonlyError();
        }
    }

    public sort(compareFn?: ((a: ContainedThing, b: ContainedThing) => number) | undefined): Document<ContainedThing, SelfDescribingThing> {
        try {
            return (this._document as Document<ContainedThing, SelfDescribingThing>).sort(compareFn);
        } catch(e) {
            throw this.makeReadonlyError();
        }
    }

    public splice(start: number, deleteCount?: number | undefined, ...items: ContainedThing[]): Document<ContainedThing, SelfDescribingThing> {
        try {
            return (this._document as Document<ContainedThing, SelfDescribingThing>).splice(start, deleteCount, ...items);
        } catch(e) {
            throw this.makeReadonlyError();
        }
    }

    public union(other: ReadonlyDocument<ContainedThing, SelfDescribingThing>): Document<ContainedThing, SelfDescribingThing> {
        try {
            return (this._document as Document<ContainedThing, SelfDescribingThing>).union(other);
        } catch(e) {
            throw this.makeReadonlyError();
        }
    }

}

export default DecoratedDocument;