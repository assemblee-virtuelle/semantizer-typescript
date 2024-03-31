import Context from "../contracts/Context.js";
import Document from "./Document.js";
import EditableDocument from "./EditableDocument.js";
import Resource from "../contracts/Resource.js";
import Thing from "../contracts/Thing.js";
import ThingFactory from '../contracts/ThingFactory.js';
import ThingFactoryDefaultImpl from "../default/ThingFactoryDefaultImpl.js";

// states: Local | Distant
// states: Created | Modified | Loaded
export class DocumentDefaultImpl<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> implements Document<ContainedThing, SelfDescribingThing> {

    protected _thingFactory: ThingFactory<ContainedThing, SelfDescribingThing>;
    protected _uri: string;
    protected _selfDescribingThing?: SelfDescribingThing;
    protected _things: ContainedThing[];
    protected _context?: Context;

    public constructor(thingFactory: ThingFactory<ContainedThing, SelfDescribingThing>, uri?: string, context?: Context) {
        this._thingFactory = thingFactory;
        this._uri = uri ?? '';
        this._context = context;
        this._things = [];
    }

    public at(index: number): ContainedThing | undefined {
        return this._getContainedThings().at(index);
    }

    public contains(other: Document<ContainedThing, SelfDescribingThing>): boolean {
        return other.every((thing: ContainedThing) => this.includes(thing));
    }

    public difference(other: Document<ContainedThing, SelfDescribingThing>): Document<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }

    public every(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => boolean, thisArg?: any): boolean {
        return this._getContainedThings().every(predicate);
    }

    public find(predicate: (value: ContainedThing, index: number, obj: ContainedThing[]) => value is ContainedThing, thisArg?: any): ContainedThing | undefined {
        return this._getContainedThings().find(predicate);
    }

    public findIndex(predicate: (value: ContainedThing, index: number, obj: ContainedThing[]) => unknown, thisArg?: any): number {
        return this._getContainedThings().findIndex(predicate);
    }

    public get(uri: string | Resource): ContainedThing | undefined {
        // TODO uri or resource.getUri
        const things = this.filter((thing: ContainedThing) => thing.getUri() === uri);
        return things.length > 0? things[0]: undefined;
    }

    public has(uriOrResource: string | Resource): boolean {
        return this.get(uriOrResource)? true: false;
    }

    public hasThingThatSelfDescribes(): boolean {
        return this.getThingThatSelfDescribes() !== undefined;
    }

    public hasContainedThingThatSelfDescribes(): boolean {
        return this.getThingThatSelfDescribes() !== undefined;
    }

    public includes(searchElement: ContainedThing, fromIndex?: number | undefined): boolean {
        return this._getContainedThings().includes(searchElement, fromIndex);
    }

    public isLocal(): boolean {
        return false;
    }
    
    public isDistant(): boolean {
        return true;
    }

    protected getUriFromStringOrResource(stringOrResource: string | Resource): string {
        return typeof stringOrResource === 'string'? stringOrResource: stringOrResource.getUri();
    }

    public indexOf(searchElement: ContainedThing, fromIndex?: number | undefined): number {
        return this._getContainedThings().indexOf(searchElement, fromIndex);
    }

    public keys(): IterableIterator<number> {
        return this._getContainedThings().keys()
    }

    public reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => ContainedThing): ContainedThing {
        return this._getContainedThings().reduce(callbackfn);
    }

    public slice(start?: number, end?: number): Document<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented."); //return this._getContainedThings().slice(start, end);
    }

    public some(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): boolean {
        return this._getContainedThings().some(predicate);
    }

    public toCanonical(): string {
        throw new Error("Method not implemented.");
    }

    public toGenericDocument(): Document<Thing, Thing> {
        const factory = new ThingFactoryDefaultImpl();
        const document: Document<Thing, Thing> = new DocumentDefaultImpl<Thing, Thing>(factory, this._uri, this._context);
        //this.forEach(thing => document.add(thing)); // We should be able to use addAll
        return document;
    }

    public toStream(): string {
        throw new Error("Method not implemented.");
    }

    public toLocalCopy(): EditableDocument<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }

    public forEach(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => void, thisArg?: any): void {
        this._getContainedThings().forEach(callbackfn, thisArg);
    }

    public map(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): unknown[] {
        return this._getContainedThings().map(callbackfn, thisArg);
    }
    
    public [Symbol.iterator](): Iterator<ContainedThing, any, undefined> {
        return this._getContainedThings()[Symbol.iterator]();
    }

    public setContext(context: Context): void {
        this._context = context;
    }

    public getContext(): Context | undefined {
        return this._context;
    }

    public expand(uri: string): string {
        return this.getContext()?.expand(uri) ?? uri;
    }

    public shorten(uri: string): string {
        return this.getContext()?.shorten(uri) ?? uri;
    }

    public getContainedThingFactory(): ThingFactory<ContainedThing, SelfDescribingThing> {
        return this._thingFactory;
    }

    // TODO: check canonical form
    public equals(other: Document<ContainedThing, SelfDescribingThing>): boolean {
        throw new Error("Not implemented.")
    }

    protected isUrl(input: string): boolean {
        return input.startsWith('http') || input.startsWith('#') || input === '';
    }

    public getUri(): string {
        return this._uri;
    }

    public isEmpty(): boolean {
        return this.count() === 0;
    }

    protected _getContainedThings(): ContainedThing[] {
        return this._things;
    }

    public getThingThatSelfDescribes(): SelfDescribingThing | undefined {
        return this._selfDescribingThing;
    }

    public count(callbackfn?: ((thing: ContainedThing, document: Document<ContainedThing, SelfDescribingThing>) => boolean) | undefined): number {
        return this._getContainedThings().length;
    }

    public hasStatementsAbout(subject: string | Resource, property?: string, ...hasValues: string[]): boolean {
        const uri = typeof subject === 'string'? subject: subject.getUri();
        return this._getContainedThings().some(thing => thing.getUri() === uri);
    }

    public filter(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => boolean): ContainedThing[] {
        return this._getContainedThings().filter(predicate);
    }

}

export default DocumentDefaultImpl;

