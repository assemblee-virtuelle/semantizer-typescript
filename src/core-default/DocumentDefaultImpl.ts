import Context from "../core/Context.js";
import { ContainedThingOf, ContainedThingReadonlyOf, Document, DocumentBase, DocumentBaseReadonly, DocumentReadonly, SelfDescribingThingOf, SelfDescribingThingReadonlyOf, WithReadOperations } from "../core/Document.js";
import Resource from "../core/Resource.js";
import { StatementBase } from "../core/Statement.js";
import { ThingBase, ThingReadonly } from "../core/Thing.js";
import ThingFactory from '../core/ThingFactory.js';
import ThingFactoryDefaultImpl from "./ThingFactoryDefaultImpl.js";

//type ContainedThingOf<T extends DocumentBase<any, any>> = T extends DocumentBase<infer TypeArg, any> ? TypeArg : never;
//type SelfDescribingThingOf<T extends DocumentBase<any, any>> = T extends DocumentBase<any, infer TypeArg> ? TypeArg : never;

export class DocumentBaseDefaultImpl<
    ContainedThing extends ThingBase<any> = ThingBase<StatementBase>, 
    SelfDescribingThing extends ThingBase<any> = ThingBase<StatementBase>,
    //Wrapped extends DocumentBase<ContainedThing, SelfDescribingThing> & WithReadOperations<Wrapped> = DocumentBaseDefaultImpl<ContainedThing, SelfDescribingThing, DocumentBase<ContainedThing, SelfDescribingThing> & WithReadOperations<DocumentBase<ContainedThing, SelfDescribingThing>>>
>
implements DocumentBase<ContainedThing, SelfDescribingThing>
{
//WithReadOperations<Wrapped> {
//WithReadOperations<DocumentBase<ContainedThing, SelfDescribingThing>> {
    
    protected _uri: string;
    protected _selfDescribingThing?: SelfDescribingThing;
    protected _things: ContainedThing[];
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

    protected _getContainedThings(): ContainedThing[] {
        return this._things;
    }

    public count(callbackfn?: ((thing: ContainedThing, document?: ThisType<this>) => boolean) | undefined): number {
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

    public contains(other: DocumentBase<ContainedThing, SelfDescribingThing> & WithReadOperations<DocumentBase<ContainedThing, SelfDescribingThing>>): boolean {
        return other.every((thing: ContainedThing) => this.includes(thing));
    }

    public difference(other: ThisType<this>): ThisType<this> {
        //throw new Error("Method not implemented.");
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

    public slice(start?: number, end?: number): ThisType<this> {
        throw new Error("Method not implemented."); //return this._getContainedThings().slice(start, end);
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

export class DocumentDecoratedDefaultImpl<
    Wrapped extends DocumentBase<ContainedThingOf<Wrapped>, SelfDescribingThingOf<Wrapped>>
>
implements DocumentBase<ContainedThingOf<Wrapped>, SelfDescribingThingOf<Wrapped>> {
    
    protected _wrapped: Wrapped;

    public constructor(wrapped: Wrapped) {
        this._wrapped = wrapped; //new DocumentBaseDefaultImpl<ContainedThingOf<Wrapped>, SelfDescribingThingOf<Wrapped>>();
    }

    protected getWrappedDocument(): Wrapped {
        return this._wrapped;
    }

    public get(uri: string | Resource): ContainedThingOf<Wrapped> | undefined {
        return this.getWrappedDocument().get(uri);
    }

    public getContext(): Context | undefined {
        return this.getWrappedDocument().getContext();
    }

    public getThingThatSelfDescribes(): SelfDescribingThingOf<Wrapped> | undefined {
        return this.getWrappedDocument().getThingThatSelfDescribes();
    }

    public has(thing: string | Resource): boolean {
        return this.getWrappedDocument().has(thing);
    }

    public hasThingThatSelfDescribes(): boolean {
        return this.getWrappedDocument().hasThingThatSelfDescribes();
    }

    public isEmpty(): boolean {
        return this.getWrappedDocument().isEmpty();
    }

    public toCanonical(): string {
        return this.getWrappedDocument().toCanonical();
    }

    public toStream(): string {
        return this.getWrappedDocument().toStream();
    }

    public [Symbol.iterator](): Iterator<ContainedThingOf<Wrapped>> {
        return this.getWrappedDocument()[Symbol.iterator]();
    }

    public getUri(): string {
        return this.getWrappedDocument().getUri();
    }

    public at(index: number): ContainedThingOf<Wrapped> | undefined {
        return this.getWrappedDocument().at(index);
    }

    public contains(other: Wrapped): boolean {
        return this.getWrappedDocument().contains(other);
    }

    public count(callbackfn?: ((thing: ContainedThingOf<Wrapped>, document?: ThisType<Wrapped> | undefined) => boolean) | undefined): number {
        return this.getWrappedDocument().count(callbackfn);
    }

    public difference(other: ThisType<Wrapped>): ThisType<Wrapped> {
        return this.getWrappedDocument().difference(other);
    }

    public equals(other: Wrapped): boolean {
        return this.getWrappedDocument().equals(other);
    }

    public every(predicate: (value: ContainedThingOf<Wrapped>, index?: number | undefined, array?: ContainedThingOf<Wrapped>[] | undefined) => boolean, thisArg?: any): boolean {
        return this.getWrappedDocument().every(predicate);
    }

    public filter(predicate: (value: ContainedThingOf<Wrapped>, index?: number | undefined, array?: ContainedThingOf<Wrapped>[] | undefined) => boolean): ContainedThingOf<Wrapped>[] {
        return this.getWrappedDocument().filter(predicate);
    }

    public find(predicate: (value: ContainedThingOf<Wrapped>, index?: number | undefined, obj?: ContainedThingOf<Wrapped>[] | undefined) => boolean, thisArg?: any): ContainedThingOf<Wrapped> | undefined {
        return this.getWrappedDocument().find(predicate);
    }

    public findIndex(predicate: (value: ContainedThingOf<Wrapped>, index?: number | undefined, obj?: ContainedThingOf<Wrapped>[] | undefined) => unknown, thisArg?: any): number {
        return this.getWrappedDocument().findIndex(predicate);
    }

    public forEach(callbackfn: (value: ContainedThingOf<Wrapped>, index?: number | undefined, array?: ContainedThingOf<Wrapped>[] | undefined) => void, thisArg?: any): void {
        return this.getWrappedDocument().forEach(callbackfn);
    }

    public includes(searchElement: ContainedThingOf<Wrapped>, fromIndex?: number | undefined): boolean {
        return this.getWrappedDocument().includes(searchElement);
    }

    public indexOf(searchElement: ContainedThingOf<Wrapped>, fromIndex?: number | undefined): number {
        return this.getWrappedDocument().indexOf(searchElement);
    }

    public keys(): IterableIterator<number> {
        return this.getWrappedDocument().keys();
    }

    public map(callbackfn: (value: ContainedThingOf<Wrapped>, index: number, array: ContainedThingOf<Wrapped>[]) => unknown, thisArg?: any): unknown[] {
        return this.getWrappedDocument().map(callbackfn);
    }

    public reduce(callbackfn: (previousValue: ContainedThingOf<Wrapped>, currentValue: ContainedThingOf<Wrapped>, currentIndex: number, array: ContainedThingOf<Wrapped>[]) => ContainedThingOf<Wrapped>): ContainedThingOf<Wrapped> {
        return this.getWrappedDocument().reduce(callbackfn);
    }

    public slice(start?: number | undefined, end?: number | undefined): ThisType<Wrapped> {
        return this.getWrappedDocument().slice(start, end);
    }

    public some(predicate: (value: ContainedThingOf<Wrapped>, index: number, array: ContainedThingOf<Wrapped>[]) => unknown, thisArg?: any): boolean {
        return this.getWrappedDocument().some(predicate);
    }
    
}

export class DocumentReadonlyDecoratedDefaultImpl<
    Wrapped extends DocumentBaseReadonly<ContainedThingReadonlyOf<Wrapped>, SelfDescribingThingReadonlyOf<Wrapped>>
>
implements DocumentBaseReadonly<ContainedThingReadonlyOf<Wrapped>, SelfDescribingThingReadonlyOf<Wrapped>> {
    
    protected _wrapped: Wrapped;

    public constructor(wrapped: Wrapped) {
        this._wrapped = wrapped; //new DocumentBaseDefaultImpl<ContainedThingOf<Wrapped>, SelfDescribingThingOf<Wrapped>>();
    }

    protected getWrappedDocument(): Wrapped {
        return this._wrapped;
    }

    public get(uri: string | Resource): ContainedThingReadonlyOf<Wrapped> | undefined {
        return this.getWrappedDocument().get(uri);
    }

    public getContext(): Context | undefined {
        return this.getWrappedDocument().getContext();
    }

    public getThingThatSelfDescribes(): SelfDescribingThingReadonlyOf<Wrapped> | undefined {
        return this.getWrappedDocument().getThingThatSelfDescribes();
    }

    public has(thing: string | Resource): boolean {
        return this.getWrappedDocument().has(thing);
    }

    public hasThingThatSelfDescribes(): boolean {
        return this.getWrappedDocument().hasThingThatSelfDescribes();
    }

    public isEmpty(): boolean {
        return this.getWrappedDocument().isEmpty();
    }

    public toCanonical(): string {
        return this.getWrappedDocument().toCanonical();
    }

    public toStream(): string {
        return this.getWrappedDocument().toStream();
    }

    public [Symbol.iterator](): Iterator<ContainedThingReadonlyOf<Wrapped>> {
        return this.getWrappedDocument()[Symbol.iterator]();
    }

    public getUri(): string {
        return this.getWrappedDocument().getUri();
    }

    public at(index: number): ContainedThingReadonlyOf<Wrapped> | undefined {
        return this.getWrappedDocument().at(index);
    }

    public contains(other: Wrapped): boolean {
        return this.getWrappedDocument().contains(other);
    }

    public count(callbackfn?: ((thing: ContainedThingReadonlyOf<Wrapped>, document?: ThisType<Wrapped> | undefined) => boolean) | undefined): number {
        return this.getWrappedDocument().count(callbackfn);
    }

    public difference(other: ThisType<Wrapped>): ThisType<Wrapped> {
        return this.getWrappedDocument().difference(other);
    }

    public equals(other: Wrapped): boolean {
        return this.getWrappedDocument().equals(other);
    }

    public every(predicate: (value: ContainedThingReadonlyOf<Wrapped>, index?: number | undefined, array?: ContainedThingReadonlyOf<Wrapped>[] | undefined) => boolean, thisArg?: any): boolean {
        return this.getWrappedDocument().every(predicate);
    }

    public filter(predicate: (value: ContainedThingReadonlyOf<Wrapped>, index?: number | undefined, array?: ContainedThingReadonlyOf<Wrapped>[] | undefined) => boolean): ContainedThingReadonlyOf<Wrapped>[] {
        return this.getWrappedDocument().filter(predicate);
    }

    public find(predicate: (value: ContainedThingReadonlyOf<Wrapped>, index?: number | undefined, obj?: ContainedThingReadonlyOf<Wrapped>[] | undefined) => boolean, thisArg?: any): ContainedThingReadonlyOf<Wrapped> | undefined {
        return this.getWrappedDocument().find(predicate);
    }

    public findIndex(predicate: (value: ContainedThingReadonlyOf<Wrapped>, index?: number | undefined, obj?: ContainedThingReadonlyOf<Wrapped>[] | undefined) => unknown, thisArg?: any): number {
        return this.getWrappedDocument().findIndex(predicate);
    }

    public forEach(callbackfn: (value: ContainedThingReadonlyOf<Wrapped>, index?: number | undefined, array?: ContainedThingReadonlyOf<Wrapped>[] | undefined) => void, thisArg?: any): void {
        return this.getWrappedDocument().forEach(callbackfn);
    }

    public includes(searchElement: ContainedThingReadonlyOf<Wrapped>, fromIndex?: number | undefined): boolean {
        return this.getWrappedDocument().includes(searchElement);
    }

    public indexOf(searchElement: ContainedThingReadonlyOf<Wrapped>, fromIndex?: number | undefined): number {
        return this.getWrappedDocument().indexOf(searchElement);
    }

    public keys(): IterableIterator<number> {
        return this.getWrappedDocument().keys();
    }

    public map(callbackfn: (value: ContainedThingReadonlyOf<Wrapped>, index: number, array: ContainedThingReadonlyOf<Wrapped>[]) => unknown, thisArg?: any): unknown[] {
        return this.getWrappedDocument().map(callbackfn);
    }

    public reduce(callbackfn: (previousValue: ContainedThingReadonlyOf<Wrapped>, currentValue: ContainedThingReadonlyOf<Wrapped>, currentIndex: number, array: ContainedThingReadonlyOf<Wrapped>[]) => ContainedThingReadonlyOf<Wrapped>): ContainedThingReadonlyOf<Wrapped> {
        return this.getWrappedDocument().reduce(callbackfn);
    }

    public slice(start?: number | undefined, end?: number | undefined): ThisType<Wrapped> {
        return this.getWrappedDocument().slice(start, end);
    }

    public some(predicate: (value: ContainedThingReadonlyOf<Wrapped>, index: number, array: ContainedThingReadonlyOf<Wrapped>[]) => unknown, thisArg?: any): boolean {
        return this.getWrappedDocument().some(predicate);
    }
    
}

export class DocumentReadonlyDefaultImpl<
    Wrapped extends DocumentBaseReadonly<any, any>// & WithReadOperations<Wrapped>
> extends DocumentReadonlyDecoratedDefaultImpl<Wrapped> implements DocumentBaseReadonly<ContainedThingReadonlyOf<Wrapped>, SelfDescribingThingReadonlyOf<Wrapped>> {

    public constructor(wrapped: Wrapped) {
        super(wrapped);
    }

    public toCopy(): Wrapped {
        return this.getWrappedDocument();
    }

    public toCopyWritable<ReturnedDocument extends Document<any>>(): Document<ReturnedDocument> {
        throw new Error("Method not implemented.");
    }
}


export class DocumentDefaultImpl<
    Wrapped extends Document<Wrapped>// & WithReadOperations<Wrapped>
> extends DocumentDecoratedDefaultImpl<Wrapped> implements Document<Wrapped> {
        
    protected _thingFactory: ThingFactory<Wrapped>;

    constructor(wrapped: Wrapped) {
        super(wrapped);
        this._thingFactory = new ThingFactoryDefaultImpl<Wrapped>();
    }

    public setContext(context: Context): void {

    }

    public getContainedThingFactory(): ThingFactory<Wrapped> {
        return this._thingFactory;
    }

    public add(thing: ContainedThingOf<Wrapped>): Wrapped {
        this._getContainedThings().push(thing);
        return this._wrapped!;
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
    
    public pop(): ContainedThingOf<Wrapped> | undefined {
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

    public splice(start: number, deleteCount?: number | undefined, ...items: ContainedThingOf<Wrapped>[]): Wrapped {
        // throw new Error("Method not implemented.");
        return this;
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