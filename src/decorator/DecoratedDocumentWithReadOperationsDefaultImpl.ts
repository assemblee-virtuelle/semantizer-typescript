import { Document, DocumentWithReadOperations, WithReadOperations } from "../contracts/Document.js";
import Resource from "../contracts/Resource.js";
import Thing from "../contracts/Thing.js";
import { Context } from "../index.js";
import DocumentDecorator from "./DocumentDecorator.js";

export class DecoratedDocumentWithReadOperationsDefaultImpl<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> implements DocumentDecorator<ContainedThing, SelfDescribingThing>, WithReadOperations<ContainedThing, SelfDescribingThing> {

    private _document: DocumentWithReadOperations<ContainedThing, SelfDescribingThing>;

    public constructor(document: DocumentWithReadOperations<ContainedThing, SelfDescribingThing>) {
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

    public toGenericDocument(): Document<Thing, Thing> {
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

    public contains(other: DocumentWithReadOperations<ContainedThing, SelfDescribingThing>): boolean {
        return this._document.contains(other);
    }

    public count(callbackfn?: ((thing: ContainedThing, document?: (DocumentWithReadOperations<ContainedThing, SelfDescribingThing>) | undefined) => boolean) | undefined): number {
        return this._document.count(callbackfn);
    }

    public difference(other: DocumentWithReadOperations<ContainedThing, SelfDescribingThing>): DocumentWithReadOperations<ContainedThing, SelfDescribingThing> {
        return this._document.difference(other);
    }

    public equals(other: DocumentWithReadOperations<ContainedThing, SelfDescribingThing>): boolean {
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

    public slice(start?: number | undefined, end?: number | undefined): DocumentWithReadOperations<ContainedThing, SelfDescribingThing> {
        return this._document.slice(start, end);
    }

    public some(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): boolean {
        return this._document.some(predicate);
    }
    
    public execute(): void {

    }

}

export default DecoratedDocumentWithReadOperationsDefaultImpl;
