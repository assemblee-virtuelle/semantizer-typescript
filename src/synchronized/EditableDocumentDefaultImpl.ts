import Context from "../contracts/Context.js";
import SynchronizedDocument from "./SynchronizedDocument.js";
import Resource from "../contracts/Resource.js";
import Thing from "../contracts/Thing.js";
import ThingFactory from '../contracts/ThingFactory.js';
import DocumentDefaultImpl from "./DocumentDefaultImpl.js";
import ThingFactoryDefaultImpl from "../default/ThingFactoryDefaultImpl.js";

// states: Local | Distant
// states: Created | Modified | Loaded
export class EditableDocumentDefaultImpl<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> extends DocumentDefaultImpl<ContainedThing, SelfDescribingThing> {

    public constructor(thingFactory: ThingFactory<ContainedThing, SelfDescribingThing>, uri?: string, context?: Context) {
        super(thingFactory, uri, context);
    }

    public add(thing: ContainedThing): SynchronizedDocument<ContainedThing, SelfDescribingThing> {
        this._getContainedThings().push(thing);
        return this;
    }

    public addAll(documentOrThings: SynchronizedDocument<ContainedThing, SelfDescribingThing> | ContainedThing[]): SynchronizedDocument<ContainedThing, SelfDescribingThing> {
        documentOrThings.forEach((thing: ContainedThing) => this.add(thing));
        // TODO: add thing with new names/uri fo document
        return this;
    }

    public delete(thingOrUri: string | ContainedThing): SynchronizedDocument<ContainedThing, SelfDescribingThing> {
        const thing = typeof thingOrUri === 'string'? this.get(thingOrUri): thingOrUri;
        if (thing)
            this.setContainedThings(this.filter((filteredContainedThing: ContainedThing) => thing.getUri() !== filteredContainedThing.getUri())) // Maybe use equals instead
        return this;
    }

    public deleteContext(): void {
        this._context = undefined;
    }

    public deleteMatches(uri?: string | Resource | undefined, property?: string | undefined, value?: string | undefined): SynchronizedDocument<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }

    public isLocal(): boolean {
        return true;
    }

    public isDistant(): boolean {
        return false;
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

    public sort(compareFn?: ((a: ContainedThing, b: ContainedThing) => number) | undefined): SynchronizedDocument<ContainedThing, SelfDescribingThing> {
        this._getContainedThings().sort(compareFn);
        return this;
    }

    public splice(start: number, deleteCount?: number | undefined, ...items: ContainedThing[]): SynchronizedDocument<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }

    public union(other: SynchronizedDocument<ContainedThing, SelfDescribingThing>): SynchronizedDocument<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }

    public map(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): unknown[] {
        return this._getContainedThings().map(callbackfn, thisArg);
    }

    public setContext(context: Context): void {
        this._context = context;
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

    public setUri(uri: string): void {
        this._uri = uri;
        // compute change in every things
    }

    protected setThingThatSelfDescribes(thing: SelfDescribingThing): SelfDescribingThing | undefined {
        return this._selfDescribingThing = thing;
    }

}

export default EditableDocumentDefaultImpl;