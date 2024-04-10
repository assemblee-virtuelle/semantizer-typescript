import { Context } from "../core/Context.js";
import { Document, DocumentBase, DocumentReadonly } from "../core/Document.js";
import Factory from "../core/Factory.js";
import Resource from "../core/Resource.js";
import { Thing, ThingBase, ThingOfDocument, ThingReadonly } from "../core/Thing.js";
import { FactoryImpl } from "./FactoryImpl.js";

export class DocumentImpl<
    ContainedThing extends Thing<any> | ThingReadonly<any> | ThingOfDocument<any>,
    SelfDescribingThing extends Thing<any> | ThingReadonly<any> | ThingOfDocument<any>,
    //DocumentType extends Document<any>
>
implements Document<ContainedThing, SelfDescribingThing> {
    
    protected _uri: string;
    protected _selfDescribingThing?: SelfDescribingThing;
    protected _things: ContainedThing[];
    protected _context?: Context;
    protected _factory: Factory<this>;

    //public constructor(uri?: string, context?: Context);
    //public constructor(document: DocumentBase<ContainedThing<Wrapped>, SelfDescribingThing<Wrapped>>);
    public constructor(factory: Factory<any> /*TODO: add constraint to this type */) {//documentOrUri?: DocumentBase<ContainedThing<Wrapped>, SelfDescribingThing<Wrapped>> | string, context?: Context) {
        this._uri = ""; //typeof documentOrUri === 'string'? documentOrUri ?? '': documentOrUri?.getUri() ?? '';
        this._context = undefined; //context;
        this._things = [];
        this._factory = factory; //new FactoryImpl<DocumentImpl<ContainedThing, SelfDescribingThing>>();
    }

    public getFactory(): Factory<Document<ContainedThing, SelfDescribingThing>> {
        return this._factory;
    }

    public toCopy(): this {
        //throw new Error("Method not implemented.");
        const copy = new DocumentImpl<ContainedThing, SelfDescribingThing>(this._factory);
        copy._uri = this._uri;
        return copy as this;
    }

    public toCopyReadonly<DocumentCopied extends DocumentReadonly<any, any>>(): DocumentCopied {
        throw new Error("Method not implemented.");
        // const readonlyThings = [];
        // this.forEach(thing => readonlyThings.push(thing.toCopyReadonly())); // or use this.reduce
        // return this as DocumentReadonly<ContainedThing, SelfDescribingThing>;
    }

    public toCopyWritable<DocumentCopied extends Document<any, any>>(): DocumentCopied {
        throw new Error("Method not implemented.");
    }
   
    public createThingToSelfDescribe(): SelfDescribingThing {
        return this.getFactory().createThingToDescribeDocument(this);
    }

    public createThingWithoutUri(nameHint?: string | undefined): ContainedThing {
        return this.getFactory().createThingWithoutUri(this);
    }

    public add(thing: ContainedThing): this {
        this._getContainedThings().push(thing);
        return this;
    }
    
    public addAll(documentOrThings: DocumentBase<any, any> | ContainedThing[]): this {
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
    
    public union(other: DocumentBase<any, any>): this {
        throw new Error("Method not implemented.");
    }

    protected addAndReturnContainedThing(thing: ContainedThing): ContainedThing {
        this.add(thing);
        return thing;
    }

    public generateContainedThingName(): string {
        return "generatedName"; // TODO
    }

    protected generateUriWithFragment(): string {
        return this.createUriWithFragment(this.generateContainedThingName());
    }

    protected getOrCreateNameWithHash(nameWithOrWithoutHash: string): string {
        return nameWithOrWithoutHash.startsWith('#')? nameWithOrWithoutHash: `#${nameWithOrWithoutHash}`;
    }

    protected createUriWithFragment(name: string): string {
        return this.getUri() + this.getOrCreateNameWithHash(name);
    }

    protected checkUriCanBeAddedToTheDocument<ContainedThing, SelfDescribingThing>(uri: string): boolean {
        return this.isUrl(uri) && !this.hasStatementsAbout(uri);
    }

    protected getSafeUriFromUri(uri: string): string {
        if (!this.checkUriCanBeAddedToTheDocument<ContainedThing, SelfDescribingThing>(uri))
            throw new Error(`You are trying to add the thing "${uri}" but it is already part of the document.`);
        return uri;
    }

    protected getSafeUriFromName(name: string): string {
        const uri = this.createUriWithFragment(name);
        if (!this.checkUriCanBeAddedToTheDocument<ContainedThing, SelfDescribingThing>(uri))
            throw new Error(`You are trying to add the thing "${uri}" but it is already part of the document.`);
        return uri;
    }

    protected getSafeUriFromNameHintOrUri(nameHintOrUri: string): string {
        return this.isUrl(nameHintOrUri)? this.getSafeUriFromUri(nameHintOrUri): this.getSafeUriFromName(nameHintOrUri);
    }

    protected validateOrCreateContainedThingUri(nameHintOrUri?: string): string {
        return nameHintOrUri? this.getSafeUriFromNameHintOrUri(nameHintOrUri): this.generateUriWithFragment();
    }

    public createThingWithUri(nameHintOrUri?: string): ContainedThing {
        const uriOfNewRegularContainedThing = this.validateOrCreateContainedThingUri(nameHintOrUri);
        return this.addAndReturnContainedThing(this.getFactory().createThing(this, uriOfNewRegularContainedThing));
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

    public difference(other: DocumentBase<any, any>): this {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
        // const things = this._getContainedThings().slice(start, end);
        // const sliced = new DocumentImpl<ContainedThing, SelfDescribingThing>();
        // sliced._things = things;
        // return sliced as this;
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
    public equals(other: DocumentBase<any, any>): boolean {
        throw new Error("Not implemented.")
    }

    public filter(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => boolean): ContainedThing[] {
        return this._getContainedThings().filter(predicate);
    }
    
}

export default DocumentImpl;