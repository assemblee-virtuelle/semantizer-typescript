import Context from "../contracts/Context.js";
import Document from "../contracts/Document.js";
import Resource from "../contracts/Resource.js";
import Thing from "../contracts/Thing.js";
import ThingFactory from '../contracts/ThingFactory.js';
import ThingFactoryDefaultImpl from "./ThingFactoryDefaultImpl.js";

// states: Local | Distant
// states: Created | Modified | Loaded
export class EditableDocumentDefaultImpl<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> implements Document<ContainedThing, SelfDescribingThing> {

    private _thingFactory: ThingFactory<ContainedThing, SelfDescribingThing>;
    private _uri: string;
    private _selfDescribingThing?: SelfDescribingThing;
    private _things: ContainedThing[];
    private _context?: Context;

    public constructor(thingFactory: ThingFactory<ContainedThing, SelfDescribingThing>, uri?: string, context?: Context) {
        this._thingFactory = thingFactory;
        this._uri = uri ?? '';
        this._context = context;
        this._things = [];
    }

    public at(index: number): ContainedThing | undefined {
        return this._getContainedThings().at(index);
    }

    public add(thing: ContainedThing): Document<ContainedThing, SelfDescribingThing> {
        this._things.push(thing);
        return this;
    }

    public addAll(documentOrThings: Document<ContainedThing, SelfDescribingThing> | ContainedThing[]): Document<ContainedThing, SelfDescribingThing> {
        documentOrThings.forEach((thing: ContainedThing) => this.add(thing));
        // TODO: add thing with new names/uri fo document
        return this;
    }

    public contains(other: Document<ContainedThing, SelfDescribingThing>): boolean {
        return other.every((thing: ContainedThing) => this.includes(thing));
    }

    createLocalCopy(): Document<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
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

    deleteMatches(uri?: string | Resource | undefined, property?: string | undefined, value?: string | undefined): Document<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }

    difference(other: Document<ContainedThing, SelfDescribingThing>): Document<ContainedThing, SelfDescribingThing> {
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

    isLocal(): boolean {
        throw new Error("Method not implemented.");
    }

    isDistant(): boolean {
        throw new Error("Method not implemented.");
    }

    public keys(): IterableIterator<number> {
        return this._getContainedThings().keys()
    }
    
    public pop(): ContainedThing | undefined {
        return this._getContainedThings().pop();
    }

    public reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => ContainedThing): ContainedThing {
        return this._getContainedThings().reduce(callbackfn);
    }

    public reverse(): void {
        this._getContainedThings().reverse();
    }

    public shift(): ContainedThing | undefined {
        return this._getContainedThings().shift();
    }

    slice(start?: number, end?: number): Document<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented."); //return this._getContainedThings().slice(start, end);
    }

    public some(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): boolean {
        return this._getContainedThings().some(predicate);
    }

    public sort(compareFn?: ((a: ContainedThing, b: ContainedThing) => number) | undefined): Document<ContainedThing, SelfDescribingThing> {
        this._getContainedThings().sort(compareFn);
        return this;
    }

    splice(start: number, deleteCount?: number | undefined, ...items: ContainedThing[]): Document<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }

    toCanonical(): string {
        throw new Error("Method not implemented.");
    }

    public toGenericDocument(): Document<Thing, Thing> {
        const factory = new ThingFactoryDefaultImpl();
        const document: Document<Thing, Thing> = new DocumentDefaultImpl<Thing, Thing>(factory, this._uri, this._context);
        this.forEach(thing => document.add(thing)); // We should be able to use addAll
        return document;
    }

    toStream(): string {
        throw new Error("Method not implemented.");
    }

    union(other: Document<ContainedThing, SelfDescribingThing>): Document<ContainedThing, SelfDescribingThing> {
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

    protected setContainedThings(things: ContainedThing[]): void {
        this._things = things;
    }

    protected addAndReturnContainedThing(thing: ContainedThing): ContainedThing {
        this.add(thing);
        return thing;
    }

    // TODO: check canonical form
    public equals(other: Document<ContainedThing, SelfDescribingThing>): boolean {
        throw new Error("Not implemented.")
    }

    protected isUrl(input: string): boolean {
        return input.startsWith('http') || input.startsWith('#') || input === '';
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

    public getUri(): string {
        return this._uri;
    }

    public setUri(uri: string): void {
        this._uri = uri;
        // compute change in every things
    }

    public isEmpty(): boolean {
        return this.count() === 0;
    }

    private _getContainedThings(): ContainedThing[] {
        return this._things;
    }

    public getThingThatSelfDescribes(): SelfDescribingThing | undefined {
        return this._selfDescribingThing;
    }

    protected setThingThatSelfDescribes(thing: SelfDescribingThing): SelfDescribingThing | undefined {
        return this._selfDescribingThing = thing;
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

export default EditableDocumentDefaultImpl;