import { Context } from "../core/Context.js";
import { Document, DocumentBase, DocumentReadonly } from "../core/Document.js";
import Factory from "../core/Factory.js";
import Resource from "../core/Resource.js";
import { ThingBase, ThingReadonly } from "../core/Thing.js";
import { FactoryDefaultImpl } from "./FactoryDefaultImpl.js";

export class DocumentDefaultImpl<
    ContainedThing extends ThingBase<any> = ThingBase, 
    SelfDescribingThing extends ThingBase<any> = ThingBase,
>
implements Document<ContainedThing, SelfDescribingThing> {
    
    protected _uri: string;
    protected _selfDescribingThing?: SelfDescribingThing;
    protected _things: ContainedThing[];
    protected _context?: Context;
    protected _factory: Factory<Document<ContainedThing, SelfDescribingThing>>;

    //public constructor(uri?: string, context?: Context);
    //public constructor(document: DocumentBase<ContainedThing<Wrapped>, SelfDescribingThing<Wrapped>>);
    public constructor() {//documentOrUri?: DocumentBase<ContainedThing<Wrapped>, SelfDescribingThing<Wrapped>> | string, context?: Context) {
        this._uri = ""; //typeof documentOrUri === 'string'? documentOrUri ?? '': documentOrUri?.getUri() ?? '';
        this._context = undefined; //context;
        this._things = [];
        this._factory = new FactoryDefaultImpl<DocumentDefaultImpl<ContainedThing, SelfDescribingThing>>();
    }

    public getFactory(): Factory<Document<ContainedThing, SelfDescribingThing>> {
        return this._factory;
    }

    public toCopy(): this {
        throw new Error("Method not implemented.");
    }

    public toCopyReadonly<ContainedThingReadonly extends ThingReadonly<any>, SelfDescribingThingReadonly extends ThingReadonly<any>>(): DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly> {
        throw new Error("Method not implemented.");
    }

    public toCopyWritable(): Document<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }
   
    public createThingToSelfDescribe(): SelfDescribingThing {
        return this.getFactory().createThingToDescribeDocument(this);
    }

    public createThingWithoutUri(nameHint?: string | undefined): ContainedThing {
        return this.getFactory().createThingWithoutUri(this);
    }

    public add(thing: ContainedThing): this {
        throw new Error("Method not implemented.");
    }
    
    public addAll(documentOrThings: this | ContainedThing[]): this {
        throw new Error("Method not implemented.");
    }
    
    public delete(thingOrUri: string | ContainedThing): this {
        throw new Error("Method not implemented.");
    }
    
    public deleteContext(): void {
        throw new Error("Method not implemented.");
    }
    
    public deleteMatches(uri?: string | Resource | undefined, property?: string | undefined, value?: string | undefined): this {
        throw new Error("Method not implemented.");
    }
    
    public pop(): ContainedThing | undefined {
        throw new Error("Method not implemented.");
    }
    
    public reverse(): void {
        throw new Error("Method not implemented.");
    }
    
    public setContext(context: Context): void {
        this._context = context;
    }
    
    public shift(): ContainedThing | undefined {
        throw new Error("Method not implemented.");
    }
    
    public sort(compareFn?: ((a: ContainedThing, b: ContainedThing) => number) | undefined): this {
        throw new Error("Method not implemented.");
    }
    
    public splice(start: number, deleteCount?: number | undefined, ...items: ContainedThing[]): this {
        throw new Error("Method not implemented.");
    }
    
    public union(other: this): this {
        throw new Error("Method not implemented.");
    }

    public createThingWithUri(nameHintOrUri?: string): ContainedThing {
        //const uriOfNewRegularContainedThing = this.validateOrCreateContainedThingUri(nameHintOrUri);
        return this.getFactory().createThing(this, "");
    }

    // TODO: move to utils class?
    protected isUrl(input: string): boolean {
        return input.startsWith('http') || input.startsWith('#') || input === '';
    }

    protected hasStatementsAbout(subject: string | Resource, property?: string, ...hasValues: string[]): boolean {
        const uri = typeof subject === 'string'? subject: subject.getUri();
        return this._getContainedThings().some(thing => thing.getUri() === uri);
    }

    protected _getContainedThings(): ContainedThing[] {
        return this._things;
    }

    public count(callbackfn?: (thing: ContainedThing, document?: this) => boolean): number {
        return this._things.length;
    }

    public get(uri: string | Resource): ContainedThing | undefined {
        // TODO uri or resource.getUri
        const things = this._things.filter((thing: ContainedThing) => thing.getUri() === uri);
        return things.length > 0? things[0]: undefined;
    }
    
    public getContext(): Context | undefined {
        return this._context;
    }

    public getThingThatSelfDescribes(): SelfDescribingThing | undefined {
        return this._selfDescribingThing;
    }
    
    public has(uriOrResource: string | Resource): boolean {
        return this.get(uriOrResource)? true: false;
    }

    public hasThingThatSelfDescribes(): boolean {
        return this.getThingThatSelfDescribes() !== undefined;
    }
    
    public getUri(): string {
        return this._uri;
    }

    public isEmpty(): boolean {
        return this.count() === 0;
    }

    public toCanonical(): string {
        throw new Error("Method not implemented.");
    }

    public toStream(): string {
        throw new Error("Method not implemented.");
    }

    public [Symbol.iterator](): Iterator<ContainedThing> {
        return this._things[Symbol.iterator]();
    }

    public at(index: number): ContainedThing | undefined {
        return this._getContainedThings().at(index);
    }

    public contains(other: this): boolean {
        return other.every((thing: ContainedThing) => this.includes(thing));
    }

    public difference(other: this): this {
        return this;
    }

    public every(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => boolean, thisArg?: any): boolean {
        return this._getContainedThings().every(predicate);
    }

    public find(predicate: (value: ContainedThing, index: number, obj: ContainedThing[]) => boolean, thisArg?: any): ContainedThing | undefined {
        return this._getContainedThings().find(predicate);
    }

    public findIndex(predicate: (value: ContainedThing, index: number, obj: ContainedThing[]) => unknown, thisArg?: any): number {
        return this._getContainedThings().findIndex(predicate);
    }

    public includes(searchElement: ContainedThing, fromIndex?: number | undefined): boolean {
        return this._getContainedThings().includes(searchElement, fromIndex);
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

    public slice(start?: number, end?: number): this {
        //throw new Error("Method not implemented."); //return this._getContainedThings().slice(start, end);
        const things = this._getContainedThings().slice(start, end);
        const sliced = new DocumentDefaultImpl<ContainedThing, SelfDescribingThing>();
        sliced._things = things;
        return sliced as this;
    }

    public some(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): boolean {
        return this._getContainedThings().some(predicate);
    }

    public forEach(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => void, thisArg?: any): void {
        this._getContainedThings().forEach(callbackfn, thisArg);
    }

    public map(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): unknown[] {
        return this._getContainedThings().map(callbackfn, thisArg);
    }

    // TODO: check canonical form
    public equals(other: DocumentBase<ContainedThing, SelfDescribingThing>): boolean {
        throw new Error("Not implemented.")
    }

    public filter(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => boolean): ContainedThing[] {
        return this._getContainedThings().filter(predicate);
    }
    
}

export default DocumentDefaultImpl;