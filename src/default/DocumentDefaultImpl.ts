import Context from "../contracts/Context.js";
import { Document } from "../contracts/Document.js";
import Resource from "../contracts/Resource.js";
import Thing from "../contracts/Thing.js";
import ThingFactory from '../contracts/ThingFactory.js';

// states: Local | Distant
// states: Created | Modified | Loaded
export class DocumentDefaultImpl<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> implements Document {

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

    public add(thing: ContainedThing): Document {
        this._things.push(thing);
        return this;
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

    public addDocument(document: Document): Document {
        throw new Error("Method not implemented.");
    }

    // TODO: check canonical form
    public equals(other: Document): boolean {
        throw new Error("Not implemented.")
    }

    public get(uri: string): ContainedThing | null {
        const things = this.filter((thing: ContainedThing) => thing.getUri() === uri);
        return things.length > 0? things[0]: null;
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

    public createThing(nameHintOrUri?: string): ContainedThing {
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

    public delete(thingOrUri: string | Thing): void {
        const thing = typeof thingOrUri === 'string'? this.get(thingOrUri): thingOrUri;
        if (thing)
            this.setThings(this.filter((filteredThing: Thing) => thing.getUri() !== filteredThing.getUri())) // Maybe use equals instead
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

    public count(): number {
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

