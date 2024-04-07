import Context from "../core/Context.js";
import { Document, DocumentBase, DocumentReadonly, DocumentWrapped, WithReadOperations, WithWriteOperations } from "../core/Document.js";
import Resource from "../core/Resource.js";
import { StatementBase } from "../core/Statement.js";
import Thing, { ThingBase, ThingReadonly } from "../core/Thing.js";
import ThingFactory from '../core/ThingFactory.js';
import ThingFactoryDefaultImpl from "./ThingFactoryDefaultImpl.js";

type ContainedThingOf<T extends DocumentBase> = T extends DocumentBase<infer TypeArg, any> ? TypeArg : never;
type SelfDescribingThingOf<T extends DocumentBase> = T extends DocumentBase<any, infer TypeArg> ? TypeArg : never;

// ContainedThing extends ThingBase<StatementBase> = ThingBase<StatementBase>, 
// SelfDescribingThing extends ThingBase<StatementBase> = ThingBase<StatementBase>
export class DocumentBaseDefaultImpl<
    Wrapped extends DocumentWrapped<any>
>
implements DocumentWrapped<Wrapped> {
    
    protected _uri: string;
    protected _selfDescribingThing?: SelfDescribingThingOf<Wrapped>;
    protected _things: ContainedThingOf<Wrapped>[];
    protected _context?: Context;

    //public constructor(uri?: string, context?: Context);
    //public constructor(document: DocumentBase<ContainedThing<Wrapped>, SelfDescribingThing<Wrapped>>);
    public constructor() {//documentOrUri?: DocumentBase<ContainedThing<Wrapped>, SelfDescribingThing<Wrapped>> | string, context?: Context) {
        this._uri = ""; //typeof documentOrUri === 'string'? documentOrUri ?? '': documentOrUri?.getUri() ?? '';
        this._context = undefined; //context;
        this._things = [];
    }

    // TODO: move to utils class?
    protected isUrl(input: string): boolean {
        return input.startsWith('http') || input.startsWith('#') || input === '';
    }

    protected hasStatementsAbout(subject: string | Resource, property?: string, ...hasValues: string[]): boolean {
        const uri = typeof subject === 'string'? subject: subject.getUri();
        return this._getContainedThings().some(thing => thing.getUri() === uri);
    }

    protected _getContainedThings(): ContainedThingOf<Wrapped>[] {
        return this._things;
    }

    public count(callbackfn?: ((thing: ContainedThingOf<Wrapped>, document?: Wrapped) => boolean) | undefined): number {
        return this._things.length;
    }

    public get(uri: string | Resource): ContainedThingOf<Wrapped> | undefined {
        // TODO uri or resource.getUri
        const things = this._things.filter((thing: ContainedThingOf<Wrapped>) => thing.getUri() === uri);
        return things.length > 0? things[0]: undefined;
    }
    
    public getContext(): Context | undefined {
        return this._context;
    }

    public getThingThatSelfDescribes(): SelfDescribingThingOf<Wrapped> | undefined {
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

    public [Symbol.iterator](): Iterator<ContainedThingOf<Wrapped>> {
        return this._things[Symbol.iterator]();
    }

    public at(index: number): ContainedThingOf<Wrapped> | undefined {
        return this._getContainedThings().at(index);
    }

    public contains(other: Wrapped): boolean {
        return other.every((thing: ContainedThingOf<Wrapped>) => this.includes(thing));
    }

    public difference(other: Wrapped): Wrapped {
        throw new Error("Method not implemented.");
    }

    public every(predicate: (value: ContainedThingOf<Wrapped>, index: number, array: ContainedThingOf<Wrapped>[]) => boolean, thisArg?: any): boolean {
        return this._getContainedThings().every(predicate);
    }

    public find(predicate: (value: ContainedThingOf<Wrapped>, index: number, obj: ContainedThingOf<Wrapped>[]) => boolean, thisArg?: any): ContainedThingOf<Wrapped> | undefined {
        return this._getContainedThings().find(predicate);
    }

    public findIndex(predicate: (value: ContainedThingOf<Wrapped>, index: number, obj: ContainedThingOf<Wrapped>[]) => unknown, thisArg?: any): number {
        return this._getContainedThings().findIndex(predicate);
    }

    public includes(searchElement: ContainedThingOf<Wrapped>, fromIndex?: number | undefined): boolean {
        return this._getContainedThings().includes(searchElement, fromIndex);
    }

    public indexOf(searchElement: ContainedThingOf<Wrapped>, fromIndex?: number | undefined): number {
        return this._getContainedThings().indexOf(searchElement, fromIndex);
    }

    public keys(): IterableIterator<number> {
        return this._getContainedThings().keys()
    }

    public reduce(callbackfn: (previousValue: ContainedThingOf<Wrapped>, currentValue: ContainedThingOf<Wrapped>, currentIndex: number, array: ContainedThingOf<Wrapped>[]) => ContainedThingOf<Wrapped>): ContainedThingOf<Wrapped> {
        return this._getContainedThings().reduce(callbackfn);
    }

    public slice(start?: number, end?: number): Wrapped {
        throw new Error("Method not implemented."); //return this._getContainedThings().slice(start, end);
    }

    public some(predicate: (value: ContainedThingOf<Wrapped>, index: number, array: ContainedThingOf<Wrapped>[]) => unknown, thisArg?: any): boolean {
        return this._getContainedThings().some(predicate);
    }

    public forEach(callbackfn: (value: ContainedThingOf<Wrapped>, index: number, array: ContainedThingOf<Wrapped>[]) => void, thisArg?: any): void {
        this._getContainedThings().forEach(callbackfn, thisArg);
    }

    public map(callbackfn: (value: ContainedThingOf<Wrapped>, index: number, array: ContainedThingOf<Wrapped>[]) => unknown, thisArg?: any): unknown[] {
        return this._getContainedThings().map(callbackfn, thisArg);
    }

    // TODO: check canonical form
    public equals(other: Wrapped): boolean {
        throw new Error("Not implemented.")
    }

    public filter(predicate: (value: ContainedThingOf<Wrapped>, index: number, array: ContainedThingOf<Wrapped>[]) => boolean): ContainedThingOf<Wrapped>[] {
        return this._getContainedThings().filter(predicate);
    }
    
}

export class DocumentReadonlyDefaultImpl<Wrapped extends DocumentReadonly<any>> extends DocumentBaseDefaultImpl<Wrapped> implements DocumentReadonly<Wrapped> {

    public constructor() {
        super(); //documentOrUri, context);
    }

    public toCopy(): Wrapped {
        throw new Error("Method not implemented.");
    }

    public toCopyWritable<ContainedWritableThing extends Thing = Thing, SelfDescribingWritableThing extends Thing = Thing>(): Document<ContainedWritableThing, SelfDescribingWritableThing> {
        throw new Error("Method not implemented.");
    }
}


export class DocumentDefaultImpl<
    ContainedThing extends Thing = Thing, 
    SelfDescribingThing extends Thing = Thing
> extends DocumentBaseDefaultImpl<ContainedThing, SelfDescribingThing> implements Document<ContainedThing, SelfDescribingThing>, WithWriteOperations<ContainedThing, SelfDescribingThing> {
        
    protected _thingFactory: ThingFactory<ContainedThing, SelfDescribingThing>;

    constructor(...args: any[]) {
        super();
        this._thingFactory = new ThingFactoryDefaultImpl<ContainedThing, SelfDescribingThing>();
    }

    public setContext(context: Context): void {

    }

    public getContainedThingFactory(): ThingFactory<ContainedThing, SelfDescribingThing> {
        return this._thingFactory;
    }

    public add(thing: ContainedThing): Document<ContainedThing, SelfDescribingThing> {
        this._getContainedThings().push(thing);
        return this;
    }

    public addAll(documentOrThings: DocumentBase<ContainedThing, SelfDescribingThing> | ContainedThing[]): Document<ContainedThing, SelfDescribingThing> {
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

    public toCopy(): Document<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }

    public toCopyReadonly<ContainedThingReadonly extends ThingReadonly = ThingReadonly, SelfDescribingThingReadonly extends ThingReadonly = ThingReadonly>(): DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly> {
        throw new Error("Method not implemented.");
    }
}

export default DocumentDefaultImpl;