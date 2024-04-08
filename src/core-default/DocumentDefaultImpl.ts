import Context from "../core/Context.js";
import { Document, DocumentBase, DocumentReadonly } from "../core/Document.js";
import Resource from "../core/Resource.js";
import { ThingBase, ThingReadonly } from "../core/Thing.js";

//type ContainedThingOf<T extends DocumentBase<any, any>> = T extends DocumentBase<infer TypeArg, any> ? TypeArg : never;
//type SelfDescribingThingOf<T extends DocumentBase<any, any>> = T extends DocumentBase<any, infer TypeArg> ? TypeArg : never;

export class DocumentDefaultImpl<
    ContainedThing extends ThingBase<any> = ThingBase, 
    SelfDescribingThing extends ThingBase<any> = ThingBase,
    //Wrapped extends DocumentBase<ContainedThing, SelfDescribingThing> & WithReadOperations<Wrapped> = DocumentBaseDefaultImpl<ContainedThing, SelfDescribingThing, DocumentBase<ContainedThing, SelfDescribingThing> & WithReadOperations<DocumentBase<ContainedThing, SelfDescribingThing>>>
>
implements Document<ContainedThing, SelfDescribingThing>
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

    toCopy(): this {
        throw new Error("Method not implemented.");
    }

    toCopyReadonly<ContainedThingReadonly extends ThingReadonly<any>, SelfDescribingThingReadonly extends ThingReadonly<any>>(): DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly> {
        throw new Error("Method not implemented.");
    }

    toCopyWritable(): Document<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }
   
    createThingToSelfDescribe(): SelfDescribingThing {
        throw new Error("Method not implemented.");
    }
    createThingWithoutUri(nameHint?: string | undefined): ContainedThing {
        throw new Error("Method not implemented.");
    }

    add(thing: ContainedThing): this {
        throw new Error("Method not implemented.");
    }
    addAll(documentOrThings: this | ContainedThing[]): this {
        throw new Error("Method not implemented.");
    }
    delete(thingOrUri: string | ContainedThing): this {
        throw new Error("Method not implemented.");
    }
    deleteContext(): void {
        throw new Error("Method not implemented.");
    }
    deleteMatches(uri?: string | Resource | undefined, property?: string | undefined, value?: string | undefined): this {
        throw new Error("Method not implemented.");
    }
    pop(): ContainedThing | undefined {
        throw new Error("Method not implemented.");
    }
    reverse(): void {
        throw new Error("Method not implemented.");
    }
    setContext(context: Context): void {
        throw new Error("Method not implemented.");
    }
    shift(): ContainedThing | undefined {
        throw new Error("Method not implemented.");
    }
    sort(compareFn?: ((a: ContainedThing, b: ContainedThing) => number) | undefined): this {
        throw new Error("Method not implemented.");
    }
    splice(start: number, deleteCount?: number | undefined, ...items: ContainedThing[]): this {
        throw new Error("Method not implemented.");
    }
    union(other: this): this {
        throw new Error("Method not implemented.");
    }

    public createThingWithUri(nameHintOrUri?: string): ContainedThing {
        throw new Error("Method not implemented.");
        // const uriOfNewRegularContainedThing = this.validateOrCreateContainedThingUri(nameHintOrUri);
        // return new ThingBaseDefaultImpl(this);
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

    public count(callbackfn?: ((thing: ContainedThing, document?: this) => boolean) | undefined): number {
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

export class DocumentDecoratedDefaultImpl<
    ContainedThing extends ThingBase<any> = ThingBase, 
    SelfDescribingThing extends ThingBase<any> = ThingBase,
>
implements Document<ContainedThing, SelfDescribingThing> { //ContainedThingReadonlyOf<Wrapped>, SelfDescribingThingReadonlyOf<Wrapped>> {
    
    protected _wrapped: Document<ContainedThing, SelfDescribingThing>;

    public constructor(wrapped: Document<ContainedThing, SelfDescribingThing>) {
        this._wrapped = wrapped; //new DocumentBaseDefaultImpl<ContainedThingOf<Wrapped>, SelfDescribingThingOf<Wrapped>>();
    }

    toCopy(): this {
        throw new Error("Method not implemented.");
    }

    toCopyReadonly<ContainedThingReadonly extends ThingReadonly<any>, SelfDescribingThingReadonly extends ThingReadonly<any>>(): DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly> {
        throw new Error("Method not implemented.");
    }
    toCopyWritable(): Document<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }

    createThingToSelfDescribe(): SelfDescribingThing {
        throw new Error("Method not implemented.");
    }
    createThingWithoutUri(nameHint?: string | undefined): ContainedThing {
        throw new Error("Method not implemented.");
    }

    add(thing: ContainedThing): this {
        return this.getWrappedDocument().add(thing) as this;
    }
    addAll(documentOrThings: this | ContainedThing[]): this {
        throw new Error("Method not implemented.");
    }
    delete(thingOrUri: string | ContainedThing): this {
        throw new Error("Method not implemented.");
    }
    deleteContext(): void {
        throw new Error("Method not implemented.");
    }
    deleteMatches(uri?: string | Resource | undefined, property?: string | undefined, value?: string | undefined): this {
        throw new Error("Method not implemented.");
    }
    pop(): ContainedThing | undefined {
        throw new Error("Method not implemented.");
    }
    reverse(): void {
        throw new Error("Method not implemented.");
    }
    setContext(context: Context): void {
        throw new Error("Method not implemented.");
    }
    shift(): ContainedThing | undefined {
        throw new Error("Method not implemented.");
    }
    sort(compareFn?: ((a: ContainedThing, b: ContainedThing) => number) | undefined): this {
        throw new Error("Method not implemented.");
    }
    splice(start: number, deleteCount?: number | undefined, ...items: ContainedThing[]): this {
        throw new Error("Method not implemented.");
    }
    union(other: this): this {
        throw new Error("Method not implemented.");
    }

    public createThingWithUri(nameHintOrUri?: string): ContainedThing {
        throw new Error(); //return this.getWrappedDocument().crea
    }

    protected getWrappedDocument(): Document<ContainedThing, SelfDescribingThing> {
        return this._wrapped;
    }

    public get(uri: string | Resource): ContainedThing | undefined {
        return this.getWrappedDocument().get(uri);
    }

    public getContext(): Context | undefined {
        return this.getWrappedDocument().getContext();
    }

    public getThingThatSelfDescribes(): SelfDescribingThing | undefined {
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

    public [Symbol.iterator](): Iterator<ContainedThing> {
        return this.getWrappedDocument()[Symbol.iterator]();
    }

    public getUri(): string {
        return this.getWrappedDocument().getUri();
    }

    public at(index: number): ContainedThing | undefined {
        return this.getWrappedDocument().at(index);
    }

    public contains(other: this): boolean {
        return this.getWrappedDocument().contains(other);
    }

    public count(callbackfn?: ((thing: ContainedThing, document?: this | undefined) => boolean) | undefined): number {
        return this.getWrappedDocument().count(callbackfn);
    }

    public difference(other: this): this {
        return this.getWrappedDocument().difference(other) as this;
    }

    public equals(other: this): boolean {
        return this.getWrappedDocument().equals(other);
    }

    public every(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => boolean, thisArg?: any): boolean {
        return this.getWrappedDocument().every(predicate);
    }

    public filter(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => boolean): ContainedThing[] {
        return this.getWrappedDocument().filter(predicate);
    }

    public find(predicate: (value: ContainedThing, index?: number | undefined, obj?: ContainedThing[] | undefined) => boolean, thisArg?: any): ContainedThing | undefined {
        return this.getWrappedDocument().find(predicate);
    }

    public findIndex(predicate: (value: ContainedThing, index?: number | undefined, obj?: ContainedThing[] | undefined) => unknown, thisArg?: any): number {
        return this.getWrappedDocument().findIndex(predicate);
    }

    public forEach(callbackfn: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => void, thisArg?: any): void {
        return this.getWrappedDocument().forEach(callbackfn);
    }

    public includes(searchElement: ContainedThing, fromIndex?: number | undefined): boolean {
        return this.getWrappedDocument().includes(searchElement);
    }

    public indexOf(searchElement: ContainedThing, fromIndex?: number | undefined): number {
        return this.getWrappedDocument().indexOf(searchElement);
    }

    public keys(): IterableIterator<number> {
        return this.getWrappedDocument().keys();
    }

    public map(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): unknown[] {
        return this.getWrappedDocument().map(callbackfn);
    }

    public reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => ContainedThing): ContainedThing {
        return this.getWrappedDocument().reduce(callbackfn);
    }

    public slice(start?: number | undefined, end?: number | undefined): this {
        return this.getWrappedDocument().slice(start, end) as this;
    }

    public some(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): boolean {
        return this.getWrappedDocument().some(predicate);
    }
    
}