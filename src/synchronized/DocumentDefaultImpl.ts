import Context from "../contracts/Context.js";
import SynchronizedDocument from "./SynchronizedDocument.js";
import { DocumentDefaultImpl as DocumentDefaultImplCore } from "../default/DocumentDefaultImpl.js"
import EditableDocument from "./EditableDocument.js";
import Resource from "../contracts/Resource.js";
import Thing from "../contracts/Thing.js";
import ThingFactory from '../contracts/ThingFactory.js';
import ThingFactoryDefaultImpl from "../default/ThingFactoryDefaultImpl.js";

// states: Local | Distant
// states: Created | Modified | Loaded
export class DocumentDefaultImpl<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> implements SynchronizedDocument<ContainedThing, SelfDescribingThing> {

    private _document: DocumentDefaultImplCore<ContainedThing, SelfDescribingThing>;

    public constructor(thingFactory: ThingFactory<ContainedThing, SelfDescribingThing>, uri?: string, context?: Context) {
        this._document = new DocumentDefaultImplCore(thingFactory, uri, context);
    }

    at(index: number): ContainedThing | undefined {
        return this._document.at(index);
    }
    contains(other: SynchronizedDocument<ContainedThing, SelfDescribingThing>): boolean {
        throw new Error("Method not implemented.");
    }
    count(callbackfn?: ((thing: ContainedThing, document: SynchronizedDocument<ContainedThing, SelfDescribingThing>) => boolean) | undefined): number {
        throw new Error("Method not implemented.");
    }
    difference(other: SynchronizedDocument<ContainedThing, SelfDescribingThing>): SynchronizedDocument<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }
    equals(other: SynchronizedDocument<ContainedThing, SelfDescribingThing>): boolean {
        throw new Error("Method not implemented.");
    }
    every(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => boolean, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }
    filter(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => boolean): ContainedThing[] {
        throw new Error("Method not implemented.");
    }
    find(predicate: (value: ContainedThing, index?: number | undefined, obj?: ContainedThing[] | undefined) => value is ContainedThing, thisArg?: any): ContainedThing | undefined {
        throw new Error("Method not implemented.");
    }
    findIndex(predicate: (value: ContainedThing, index?: number | undefined, obj?: ContainedThing[] | undefined) => unknown, thisArg?: any): number {
        throw new Error("Method not implemented.");
    }
    forEach(callbackfn: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }
    get(uri: string | Resource): ContainedThing | undefined {
        throw new Error("Method not implemented.");
    }
    getContext(): Context | undefined {
        throw new Error("Method not implemented.");
    }
    getThingThatSelfDescribes(): SelfDescribingThing | undefined {
        throw new Error("Method not implemented.");
    }
    has(thing: string | Resource): boolean {
        throw new Error("Method not implemented.");
    }
    hasThingThatSelfDescribes(): boolean {
        throw new Error("Method not implemented.");
    }
    includes(searchElement: ContainedThing, fromIndex?: number | undefined): boolean {
        throw new Error("Method not implemented.");
    }
    indexOf(searchElement: ContainedThing, fromIndex?: number | undefined): number {
        throw new Error("Method not implemented.");
    }
    isEmpty(): boolean {
        throw new Error("Method not implemented.");
    }
    keys(): IterableIterator<number> {
        throw new Error("Method not implemented.");
    }
    map(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): unknown[] {
        throw new Error("Method not implemented.");
    }
    reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => ContainedThing): ContainedThing {
        throw new Error("Method not implemented.");
    }
    slice(start?: number | undefined, end?: number | undefined): SynchronizedDocument<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }
    some(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }
    toCanonical(): string {
        throw new Error("Method not implemented.");
    }
    toGenericDocument(): SynchronizedDocument<Thing, Thing> {
        throw new Error("Method not implemented.");
    }
    toStream(): string {
        throw new Error("Method not implemented.");
    }
    getUri(): string {
        throw new Error("Method not implemented.");
    }
    [Symbol.iterator](): Iterator<ContainedThing, any, undefined> {
        throw new Error("Method not implemented.");
    }

    public isLocal(): boolean {
        return false;
    }
    
    public isDistant(): boolean {
        return true;
    }

    public toLocalCopy(): EditableDocument<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }

}

export default DocumentDefaultImpl;

