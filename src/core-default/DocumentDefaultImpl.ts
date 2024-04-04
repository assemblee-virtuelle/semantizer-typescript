import Context from "../core/Context.js";
import { DocumentBase, ReadonlyDocument, Document } from "../core/Document.js";
import Resource from "../core/Resource.js";
import Thing, { ReadonlyThing } from "../core/Thing.js";
import ThingFactory from '../core/ThingFactory.js';
import ThingFactoryDefaultImpl from "./ThingFactoryDefaultImpl.js";

export class ReadonlyDocumentDefaultImpl<ContainedThing extends ReadonlyThing = ReadonlyThing, SelfDescribingThing extends ReadonlyThing = ReadonlyThing> implements ReadonlyDocument<ContainedThing, SelfDescribingThing> {

    protected _uri: string;
    protected _selfDescribingThing?: SelfDescribingThing;
    protected _things: ContainedThing[];
    protected _context?: Context;

    //public constructor(uri?: string, context?: Context);
    //public constructor(document: DocumentBase<ContainedThing, SelfDescribingThing>);
    public constructor(documentOrUri?: DocumentBase<ContainedThing, SelfDescribingThing> | string, context?: Context) {
        this._uri = typeof documentOrUri === 'string'? documentOrUri ?? '': documentOrUri?.getUri() ?? '';
        this._context = context;
        this._things = [];
    }

    public at(index: number): ContainedThing | undefined {
        return this._getContainedThings().at(index);
    }

    public contains(other: ReadonlyDocument<ContainedThing, SelfDescribingThing>): boolean {
        return other.every((thing: ContainedThing) => this.includes(thing));
    }

    public difference(other: ReadonlyDocument<ContainedThing, SelfDescribingThing>): ReadonlyDocument<ContainedThing, SelfDescribingThing> {
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

    public slice(start?: number, end?: number): ReadonlyDocument<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented."); //return this._getContainedThings().slice(start, end);
    }

    public some(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): boolean {
        return this._getContainedThings().some(predicate);
    }

    public toCanonical(): string {
        throw new Error("Method not implemented.");
    }

    public toGenericDocument(): DocumentBase<Thing, Thing> {
        const factory = new ThingFactoryDefaultImpl<Thing, Thing>();
        const document: DocumentBase<Thing, Thing> = new DocumentDefaultImpl<Thing, Thing>(this._uri, this._context, factory);
        //this.forEach(thing => document.add(thing)); // We should be able to use addAll
        return document;
    }

    public toStream(): string {
        throw new Error("Method not implemented.");
    }

    public forEach(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => void, thisArg?: any): void {
        this._getContainedThings().forEach(callbackfn, thisArg);
    }

    public map(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): unknown[] {
        return this._getContainedThings().map(callbackfn, thisArg);
    }
    
    public [Symbol.iterator](): Iterator<ContainedThing> {
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

    // TODO: check canonical form
    public equals(other: DocumentBase<ContainedThing, SelfDescribingThing>): boolean {
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

    public count(callbackfn?: ((thing: ContainedThing, document?: ReadonlyDocument<ContainedThing, SelfDescribingThing>) => boolean) | undefined): number {
        return this._getContainedThings().length;
    }

    public hasStatementsAbout(subject: string | Resource, property?: string, ...hasValues: string[]): boolean {
        const uri = typeof subject === 'string'? subject: subject.getUri();
        return this._getContainedThings().some(thing => thing.getUri() === uri);
    }

    public filter(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => boolean): ContainedThing[] {
        return this._getContainedThings().filter(predicate);
    }

    public toGenericReadonlyDocument(): ReadonlyDocument<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }

}

export class DocumentDefaultImpl<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> extends ReadonlyDocumentDefaultImpl<ContainedThing, SelfDescribingThing> implements Document<ContainedThing, SelfDescribingThing> {

    protected _thingFactory: ThingFactory<ContainedThing, SelfDescribingThing>;
    //protected _uri: string;
    //protected _selfDescribingThing?: SelfDescribingThing;
    //protected _things: ContainedThing[];
    //protected _context?: Context;

    public constructor(uri?: string, context?: Context, thingFactory?: ThingFactory<ContainedThing, SelfDescribingThing>);
    public constructor(document: DocumentBase<ContainedThing, SelfDescribingThing>);
    public constructor(documentOrUri?: DocumentBase<ContainedThing, SelfDescribingThing> | string, context?: Context, thingFactory?: ThingFactory<ContainedThing, SelfDescribingThing>) {
        super(documentOrUri, context)
        this._thingFactory = thingFactory ?? new ThingFactoryDefaultImpl<ContainedThing, SelfDescribingThing>();
        //this._uri = typeof documentOrUri === 'string'? documentOrUri ?? '': documentOrUri?.getUri() ?? '';
        //this._context = context;
        //this._things = [];
    }

    /*public at(index: number): ContainedThing | undefined {
        return this._getContainedThings().at(index);
    }

    public contains(other: ReadonlyDocument<ContainedThing, SelfDescribingThing>): boolean {
        return other.every((thing: ContainedThing) => this.includes(thing));
    }

    public difference(other: ReadonlyDocument<ContainedThing, SelfDescribingThing>): ReadonlyDocument<ContainedThing, SelfDescribingThing> {
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

    public slice(start?: number, end?: number): ReadonlyDocument<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented."); //return this._getContainedThings().slice(start, end);
    }

    public some(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): boolean {
        return this._getContainedThings().some(predicate);
    }

    public toCanonical(): string {
        throw new Error("Method not implemented.");
    }

    public toGenericDocument(): DocumentBase<ContainedThing, SelfDescribingThing> {
        const factory = new ThingFactoryDefaultImpl<ContainedThing, SelfDescribingThing>();
        const document: DocumentBase<ContainedThing, SelfDescribingThing> = new DocumentDefaultImpl<ContainedThing, SelfDescribingThing>(this._uri, this._context, factory);
        //this.forEach(thing => document.add(thing)); // We should be able to use addAll
        return document;
    }

    public toStream(): string {
        throw new Error("Method not implemented.");
    }

    public forEach(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => void, thisArg?: any): void {
        this._getContainedThings().forEach(callbackfn, thisArg);
    }

    public map(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): unknown[] {
        return this._getContainedThings().map(callbackfn, thisArg);
    }
    
    public [Symbol.iterator](): Iterator<ContainedThing> {
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
    public equals(other: DocumentBase<ContainedThing, SelfDescribingThing>): boolean {
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

    public count(callbackfn?: ((thing: ContainedThing, document?: ReadonlyDocument<ContainedThing, SelfDescribingThing>) => boolean) | undefined): number {
        return this._getContainedThings().length;
    }

    public hasStatementsAbout(subject: string | Resource, property?: string, ...hasValues: string[]): boolean {
        const uri = typeof subject === 'string'? subject: subject.getUri();
        return this._getContainedThings().some(thing => thing.getUri() === uri);
    }

    public filter(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => boolean): ContainedThing[] {
        return this._getContainedThings().filter(predicate);
    }
*/

    public getContainedThingFactory(): ThingFactory<ContainedThing, SelfDescribingThing> {
        return this._thingFactory;
    }

    // DESTRUCTIVE OPERATIONS
    public add(thing: ContainedThing): Document<ContainedThing, SelfDescribingThing> {
        this._getContainedThings().push(thing);
        return this;
    }

    public addAll(documentOrThings: ReadonlyDocument<ContainedThing, SelfDescribingThing> | ContainedThing[]): Document<ContainedThing, SelfDescribingThing> {
        documentOrThings.forEach((thing: ContainedThing) => this.add(thing));
        // TODO: add thing with new names/uri fo document
        return this;
    }

    public delete(thingOrUri: string | ContainedThing): Document<ContainedThing, SelfDescribingThing> {
        const thing = typeof thingOrUri === 'string'? this.get(thingOrUri): thingOrUri;
        if (thing)
            this.setContainedThings(this.filter((filteredContainedThing: ContainedThing) => thing.getUri() !== filteredContainedThing.getUri())) // Maybe use equals instead
        return this;
    }

    public deleteContext(): void {
        this._context = undefined;
    }

    public deleteMatches(uri?: string | Resource | undefined, property?: string | undefined, value?: string | undefined): Document<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }
    
    public pop(): ContainedThing | undefined {
        return this._getContainedThings().pop();
    }

    public reverse(): void {
        this._getContainedThings().reverse();
    }

    public shift(): ContainedThing | undefined {
        return this._getContainedThings().shift();
    }

    public sort(compareFn?: ((a: ContainedThing, b: ContainedThing) => number) | undefined): Document<ContainedThing, SelfDescribingThing> {
        this._getContainedThings().sort(compareFn);
        return this;
    }

    public splice(start: number, deleteCount?: number | undefined, ...items: ContainedThing[]): Document<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }

    public union(other: DocumentBase<ContainedThing, SelfDescribingThing>): Document<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }

    protected setContainedThings(things: ContainedThing[]): void {
        this._things = things;
    }

    protected addAndReturnContainedThing(thing: ContainedThing): ContainedThing {
        this.add(thing);
        return thing;
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


    public createThingToSelfDescribe(): SelfDescribingThing {
        const thing = this.getContainedThingFactory().createThingToDescribeDocument(this);
        this.setThingThatSelfDescribes(thing);
        return thing;
    }

    public createThingWithUri(nameHintOrUri?: string): ContainedThing {
        const uriOfNewRegularContainedThing = this.validateOrCreateContainedThingUri(nameHintOrUri);
        return this.addAndReturnContainedThing(this.getContainedThingFactory().createThing(this, uriOfNewRegularContainedThing));
    }

    public createThingWithoutUri(nameHint?: string): ContainedThing {
        return this.addAndReturnContainedThing(this.validateAndCreateContainedThingWithoutUri(nameHint));
    }

    public generateContainedThingName(): string {
        return "generatedName"; // TODO
    }

    protected validateOrCreateContainedThingUri(nameHintOrUri?: string): string {
        return nameHintOrUri? this.getSafeUriFromNameHintOrUri(nameHintOrUri): this.generateUriWithFragment();
    }

    protected validateNameHintForContainedThingWithoutUri(nameHint: string): void {
        if (this.hasStatementsAbout(`_:${nameHint}`))
        throw new Error(`You are trying to add the anonymous thing "${nameHint}" but it is already part of the document.`);
    }

    protected validateAndCreateContainedThingWithoutUri(nameHint?: string): ContainedThing {
        if (nameHint)
            this.validateNameHintForContainedThingWithoutUri(nameHint);
        return this.getContainedThingFactory().createThingWithoutUri(this, nameHint);
    }

    public setUri(uri: string): void {
        this._uri = uri;
        // compute change in every things
    }

    protected setThingThatSelfDescribes(thing: SelfDescribingThing): SelfDescribingThing | undefined {
        return this._selfDescribingThing = thing;
    }

    public toGenericDocument(): Document<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }

}

export default DocumentDefaultImpl;

