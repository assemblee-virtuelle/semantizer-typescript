import Context from "../contracts/Context.js";
import { Document } from "../contracts/Document.js";
import Resource from "../contracts/Resource.js";
import Thing from "../contracts/Thing.js";
import ThingFactory from '../contracts/ThingFactory.js';

// states: Local | Distant
// states: Created | Modified | Loaded
export class DocumentDefaultImpl<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> implements Document<ContainedThing, SelfDescribingThing> {

    private _thingFactory: ThingFactory<ContainedThing, SelfDescribingThing>;
    private _uri: string;
    private _selfDescribingThing: SelfDescribingThing | null;
    private _things: ContainedThing[];
    private _context?: Context;

    public constructor(thingFactory: ThingFactory<ContainedThing, SelfDescribingThing>, uri?: string, context?: Context) {
        this._thingFactory = thingFactory;
        this._uri = uri ?? '';
        this._context = context;
        this._things = [];
        this._selfDescribingThing = null;
    }

    at(index: number): ContainedThing | null {
        throw new Error("Method not implemented.");
    }

    public add(thing: ContainedThing): Document<ContainedThing, SelfDescribingThing> {
        this._things.push(thing);
        return this;
    }

    addAll(document: Document<any, any>): Document<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }

    createLocalCopy(): Document<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }

    public delete(thingOrUri: string | Thing): Document<ContainedThing, SelfDescribingThing> {
        const thing = typeof thingOrUri === 'string'? this.get(thingOrUri): thingOrUri;
        if (thing)
            this.setThings(this.filter((filteredThing: Thing) => thing.getUri() !== filteredThing.getUri())) // Maybe use equals instead
        return this;
    }

    deleteContext(): void {
        throw new Error("Method not implemented.");
    }

    deleteMatches(uri?: string | Resource | undefined, property?: string | undefined, value?: string | undefined): Document<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }

    difference(other: Document<Thing, Thing>): Document<Thing, Thing> {
        throw new Error("Method not implemented.");
    }

    every(callbackfn: (thing: ContainedThing, document: Document<Thing, Thing>) => boolean): boolean {
        throw new Error("Method not implemented.");
    }

    find(): ContainedThing | null {
        throw new Error("Method not implemented.");
    }

    findIndex(thing: string | Resource): number {
        throw new Error("Method not implemented.");
    }

    public get(uri: string | Resource): ContainedThing | null {
        // TODO uri or resource.getUri
        const things = this.filter((thing: ContainedThing) => thing.getUri() === uri);
        return things.length > 0? things[0]: null;
    }

    has(thing: string | Resource): boolean {
        throw new Error("Method not implemented.");
    }

    hasThingThatSelfDescribes(): boolean {
        throw new Error("Method not implemented.");
    }

    includes(other: Document<Thing, Thing>): boolean {
        throw new Error("Method not implemented.");
    }
    indexOf(thing: string | Resource, fromIndex?: number | undefined): number {
        throw new Error("Method not implemented.");
    }

    isLocal(): boolean {
        throw new Error("Method not implemented.");
    }

    isDistant(): boolean {
        throw new Error("Method not implemented.");
    }

    keys(): Iterator<string, any, undefined> {
        throw new Error("Method not implemented.");
    }
    
    pop(): ContainedThing {
        throw new Error("Method not implemented.");
    }

    reduce(callbackfn: (accumulator: any, thing: ContainedThing, document: Document<Thing, Thing>) => any, initialValue?: any) {
        throw new Error("Method not implemented.");
    }

    reverse(): void {
        throw new Error("Method not implemented.");
    }

    shift(): ContainedThing {
        throw new Error("Method not implemented.");
    }

    slice(start?: number | undefined, end?: number | undefined): Document<Thing, Thing> {
        throw new Error("Method not implemented.");
    }

    some(callbackfn: (thing: ContainedThing, document: Document<ContainedThing, SelfDescribingThing>) => boolean): boolean {
        throw new Error("Method not implemented.");
    }

    sort(compareFn?: ((a: ContainedThing, b: ContainedThing) => number) | undefined): Document<Thing, Thing> {
        throw new Error("Method not implemented.");
    }

    splice(start: number, deleteCount?: number | undefined, ...items: ContainedThing[]): Document<Thing, Thing> {
        throw new Error("Method not implemented.");
    }

    toCanonical(): string {
        throw new Error("Method not implemented.");
    }

    toStream(): string {
        throw new Error("Method not implemented.");
    }

    union(other: Document<Thing, Thing>): Document<Thing, Thing> {
        throw new Error("Method not implemented.");
    }

    public forEach(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => void, thisArg?: any): void {
        this._getThings().forEach(callbackfn, thisArg);
    }

    public map(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): unknown[] {
        return this._getThings().map(callbackfn, thisArg);
    }
    
    [Symbol.iterator](): Iterator<ContainedThing, any, undefined> {
        return this._getThings()[Symbol.iterator]();
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

    public getThingFactory(): ThingFactory<ContainedThing, SelfDescribingThing> {
        return this._thingFactory;
    }

    protected setThings(things: ContainedThing[]): void {
        this._things = things;
    }

    protected addAndReturnThing(thing: ContainedThing): ContainedThing {
        this.add(thing);
        return thing;
    }

    // TODO: check canonical form
    public equals(other: Document): boolean {
        throw new Error("Not implemented.")
    }

    protected isUrl(input: string): boolean {
        return input.startsWith('http') || input.startsWith('#') || input === '';
    }

    protected generateUriWithFragment(): string {
        return this.createUriWithFragment(this.generateThingName());
    }

    protected getOrCreateNameWithHash(nameWithOrWithoutHash: string): string {
        return nameWithOrWithoutHash.startsWith('#')? nameWithOrWithoutHash: `#${nameWithOrWithoutHash}`;
    }

    protected createUriWithFragment(name: string): string {
        return this.getUri() + this.getOrCreateNameWithHash(name);
    }

    protected checkUriCanBeAddedToTheDocument(uri: string): boolean {
        return this.isUrl(uri) && !this.hasStatementsAbout(uri);
    }

    protected getSafeUriFromUri(uri: string): string {
        if (!this.checkUriCanBeAddedToTheDocument(uri))
            throw new Error(`You are trying to add the thing "${uri}" but it is already part of the document.`);
        return uri;
    }

    protected getSafeUriFromName(name: string): string {
        const uri = this.createUriWithFragment(name);
        if (!this.checkUriCanBeAddedToTheDocument(uri))
            throw new Error(`You are trying to add the thing "${uri}" but it is already part of the document.`);
        return uri;
    }

    protected getSafeUriFromNameHintOrUri(nameHintOrUri: string): string {
        return this.isUrl(nameHintOrUri)? this.getSafeUriFromUri(nameHintOrUri): this.getSafeUriFromName(nameHintOrUri);
    }


    public createThingToSelfDescribe(): SelfDescribingThing {
        const thing = this.getThingFactory().createThingToDescribeDocument(this);
        this.setThingThatSelfDescribes(thing);
        return thing;
    }

    public createThingWithUri(nameHintOrUri?: string): ContainedThing {
        const uriOfNewRegularThing = this.validateOrCreateThingUri(nameHintOrUri);
        return this.addAndReturnThing(this.getThingFactory().createThing(this, uriOfNewRegularThing));
    }

    public createThingWithoutUri(nameHint?: string): ContainedThing {
        return this.addAndReturnThing(this.validateAndCreateThingWithoutUri(nameHint));
    }

    public generateThingName(): string {
        return "generatedName"; // TODO
    }

    protected validateOrCreateThingUri(nameHintOrUri?: string): string {
        return nameHintOrUri? this.getSafeUriFromNameHintOrUri(nameHintOrUri): this.generateUriWithFragment();
    }

    protected validateNameHintForThingWithoutUri(nameHint: string): void {
        if (this.hasStatementsAbout(`_:${nameHint}`))
        throw new Error(`You are trying to add the anonymous thing "${nameHint}" but it is already part of the document.`);
    }

    protected validateAndCreateThingWithoutUri(nameHint?: string): ContainedThing {
        if (nameHint)
            this.validateNameHintForThingWithoutUri(nameHint);
        return this.getThingFactory().createThingWithoutUri(this, nameHint);
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

    private _getThings(): ContainedThing[] {
        return this._things;
    }

    public getThingThatSelfDescribes(): SelfDescribingThing | null {
        return this._selfDescribingThing;
    }

    protected setThingThatSelfDescribes(thing: SelfDescribingThing): SelfDescribingThing | null {
        return this._selfDescribingThing = thing;
    }

    public count(callbackfn?: ((thing: ContainedThing, document: Document<ContainedThing, SelfDescribingThing>) => boolean) | undefined): number {
        return this._getThings().length;
    }

    public hasStatementsAbout(subject: string | Resource, property?: string, ...hasValues: string[]): boolean {
        const uri = typeof subject === 'string'? subject: subject.getUri();
        return this._getThings().some(thing => thing.getUri() === uri);
    }

    public filter(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => boolean): ContainedThing[] {
        return this._getThings().filter(predicate);
    }

}

export default DocumentDefaultImpl;

