import rdf from 'rdf-ext';
import DatasetExt from "rdf-ext/lib/Dataset";
import Context from "./Context";
import { Document } from "./Document";
import Resource from "./Resource";
import Thing from "./Thing";
import ThingDefaultImpl from "./ThingDefaultImpl.js";

// states: Local | Distant
// states: Created | Modified | Loaded
export class DocumentDefaultImpl implements Document {

    private _uri: string;
    private _things: Thing[];
    private _context?: Context;

    public constructor(uri?: string, context?: Context) {
        this._uri = uri ?? '';
        this._context = context;
        this._things = [];
    }
    
    [Symbol.iterator](): Iterator<Thing, any, undefined> {
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

    public addThing(thing: Thing): Document {
        this._things.push(thing);
        return this;
    }

    protected setThings(things: Thing[]): void {
        this._things = things;
    }

    public addDocument(document: Document): Document {
        throw new Error("Method not implemented.");
    }

    public equals(other: Document): boolean {
        return this.toRdfDatasetExt().equals(other.toRdfDatasetExt());
    }

    public getThing(uri: string): Thing | null {
        const things = this.filter((thing: Thing) => thing.getUri() === uri);
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

    public createThingToSelfDescribe(): Thing {
        const thing = ThingDefaultImpl.createThingToDescribeDocument(this);
        this.addThing(thing);
        return thing;
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

    protected validateAndCreateThingWithoutUri(nameHint?: string): Thing {
        if (nameHint)
            this.validateNameHintForThingWithoutUri(nameHint);
        return ThingDefaultImpl.createThingWithoutUri(this, nameHint);
    }

    protected createAndAddRegularThing(uri: string): Thing {
        const thing = ThingDefaultImpl.createThing(this, uri);
        this.addThing(thing);
        return thing;
    }

    public createThing(nameHintOrUri?: string): Thing {
        const uriOfNewRegularThing = this.validateOrCreateThingUri(nameHintOrUri);
        return this.createAndAddRegularThing(uriOfNewRegularThing);
    }

    public createThingWithoutUri(nameHint?: string): Thing {
        const thing = this.validateAndCreateThingWithoutUri(nameHint);
        this.addThing(thing);
        return thing;
    }

    public deleteThing(thingOrUri: string | Thing): void {
        const thing = typeof thingOrUri === 'string'? this.getThing(thingOrUri): thingOrUri;
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
        return this.countThings() === 0;
    }

    private _getThings(): Thing[] {
        return this._things;
    }

    public getThingsAll(): Thing[] {
        return this._getThings();
    }

    public getThingThatSelfDescribes(): Thing | null {
        return this.getThing(this.getUri());
    }

    public countThings(): number {
        return this._getThings().length;
    }

    public hasStatementsAbout(subject: string | Resource, property?: string, ...hasValues: string[]): boolean {
        const uri = typeof subject === 'string'? subject: subject.getUri();
        return this._getThings().some(thing => thing.getUri() === uri);
    }

    public filter(predicate: (value: Thing, index: number, array: Thing[]) => boolean): Thing[] {
        return this._getThings().filter(predicate);
    }

    public toRdfDatasetExt(): DatasetExt {
        const result = rdf.dataset();
        // @ts-ignore
        this._things.forEach(thing => result.addAll(thing.toRdfDatasetExt()));
        return result;
    }

}

export default DocumentDefaultImpl;