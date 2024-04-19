import { Context, Resource } from "../core/Common.js";
import { Document, DocumentBase, DocumentWritable } from "../core/Document.js";
import { Thing } from "../core/Thing.js";

// This is an internal implementation of Document.
// For a generic purpose document implementation, we should use 
// a DocumentedDecorated for generic purpose.

export class DocumentImpl<
    ContainedThing extends Thing<any, any>, // DocumentType extends DocumentBase<any, any>, //DocumentBase<Thing<Statement<any>, any>, any>, any>,
    SelfDescribingThing extends Thing<any, any> //DocumentTypeReadonly extends Document<any, any> //ThingReadonly<StatementReadonly<any>, any>, ThingReadonly<StatementReadonly<any>, any>> // DocumentReadonly<any, any>
>
implements DocumentWritable<ContainedThing, SelfDescribingThing> {
    
    protected _uri: string;
    protected _selfDescribingThing?: SelfDescribingThing;
    protected _things: ContainedThing[]; //ResourceCollectionWritable<ContainedThingOf<DocumentType>>; //[]; // ThingWritable ? -> Thing
    protected _context?: Context;
    // protected _factory: Factory<DocumentType>; //DocumentImpl<Document<DocumentType, DocumentTypeReadonly>>>;

    //public constructor(uri?: string, context?: Context);
    //public constructor(document: DocumentBase<ContainedThing<Wrapped>, SelfDescribingThing<Wrapped>>);
    //public constructor(...args: any[]) {}
    //public constructor() {
    public constructor(/*factory: Factory<DocumentType> /*TODO: add constraint to this type */) {//documentOrUri?: DocumentBase<ContainedThing<Wrapped>, SelfDescribingThing<Wrapped>> | string, context?: Context) {
        this._uri = ""; //typeof documentOrUri === 'string'? documentOrUri ?? '': documentOrUri?.getUri() ?? '';
        this._context = undefined; //context;
        this._things = [];
        // this._factory = factory;
    }
    
    // public getFactoryForCopying(): FactoryForCopying<Document<DocumentType, DocumentTypeReadonly>> {
    //     throw new Error("Method not implemented.");
    // }

    // public getFactory(): Factory<this> { //Document<DocumentType, DocumentTypeReadonly>> {
    //     return this._factory;
    // }

    public hasUri(): boolean {
        throw new Error();
    }

    public toCopy(): this {
        //throw new Error("Method not implemented.");
        const copy = new DocumentImpl<ContainedThing, SelfDescribingThing/*, DocumentTypeReadonly*/>(/*this._factory*/);
        copy._uri = this._uri;
        return copy as this;
    }

    // public toCopyReadonly(): DocumentTypeReadonly {
    //     return this.getFactoryForCopying().createDocument(this);
    // }
   
    // public createThingToSelfDescribe(): SelfDescribingThingOf<DocumentType> {
    //     const thing = this.getFactory().createThingToDescribeDocument(this);
    //     this._selfDescribingThing = thing;
    //     return thing;
    // }

    // public createThingWithoutUri(nameHint?: string | undefined): ContainedThingOf<DocumentType> {
    //     return this.getFactory().createThingWithoutUri(this);
    // }

    public add(thing: ContainedThing): this {
        this._getContainedThingsWritable().push(thing);
        return this;
    }
    
    public addAll(documentOrThings: ContainedThing[]): this {
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

    protected validateOrCreateContainedThingUri(nameHintOrUri?: string): string {
        return nameHintOrUri? this.getSafeUriFromNameHintOrUri(nameHintOrUri): this.generateUriWithFragment();
    }

    // public createThingWithUri(nameHintOrUri?: string): ContainedThingOf<DocumentType> {
    //     const uriOfNewRegularContainedThing = this.validateOrCreateContainedThingUri(nameHintOrUri);
    //     return this.addAndReturnContainedThing(this.getFactory().createThing(this, uriOfNewRegularContainedThing));
    // }

    // TODO: move to utils class?
    protected isUrl(input: string): boolean {
        return input.startsWith('http') || input.startsWith('#') || input === '';
    }

    protected hasStatementsAbout(subject: string | Resource, property?: string, ...hasValues: string[]): boolean {
        const uri = typeof subject === 'string'? subject: subject.getUri();
        return this._getContainedThingsWritable().some(thing => thing.getUri() === uri);
    }

    protected _getContainedThingsWritable(): ContainedThing[] /*ResourceCollectionWritable<ContainedThingOf<DocumentType>>*/ {
        return this._things;
    }

    public count(): number { //callbackfn?: (thing: ContainedThingOf<DocumentType>, document?: this) => boolean): number {
        return this._getContainedThingsWritable().length;
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
        return this._getContainedThingsWritable()[Symbol.iterator]();
    }

    public at(index: number): ContainedThing | undefined {
        return this._getContainedThingsWritable().at(index);
    }

    public contains(other: Document<any, any>): boolean {
        return other.every((thing: ContainedThing) => this.includes(thing));
    }

    public difference(other: DocumentType): DocumentType {
        throw new Error("Method not implemented.");
    }

    public every(predicate: (value: ContainedThing, index?: number, array?: ContainedThing[]) => boolean, thisArg?: any): boolean {
        return this._getContainedThingsWritable().every(predicate);
    }

    public find(predicate: (value: ContainedThing, index?: number, obj?: ContainedThing[]) => boolean, thisArg?: any): ContainedThing | undefined {
        return this._getContainedThingsWritable().find(predicate);
    }

    public findIndex(predicate: (value: ContainedThing, index?: number, obj?: ContainedThing[]) => unknown, thisArg?: any): number {
        return this._getContainedThingsWritable().findIndex(predicate);
    }

    public includes(searchElement: ContainedThing, fromIndex?: number): boolean {
        return this._getContainedThingsWritable().includes(searchElement, fromIndex);
    }

    public indexOf(searchElement: ContainedThing, fromIndex?: number | undefined): number {
        return this._getContainedThingsWritable().indexOf(searchElement, fromIndex);
    }

    public keys(): IterableIterator<number> {
        return this._getContainedThingsWritable().keys()
    }

    public reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => ContainedThing): ContainedThing {
        return this._getContainedThingsWritable().reduce(callbackfn);
    }

    public slice(start?: number, end?: number): this {
        throw new Error("Method not implemented.");
        // const things = this._getContainedThings().slice(start, end);
        // const sliced = new DocumentImpl<ContainedThing, SelfDescribingThing>();
        // sliced._things = things;
        // return sliced as this;
    }

    public some(predicate: (value: ContainedThing, index?: number, array?: ContainedThing[]) => unknown, thisArg?: any): boolean {
        return this._getContainedThingsWritable().some(predicate);
    }

    public forEach(callbackfn: (value: ContainedThing, index?: number, array?: ContainedThing[]) => void, thisArg?: any): void {
        this._getContainedThingsWritable().forEach(callbackfn, thisArg);
    }

    public map(callbackfn: (value: ContainedThing, index?: number, array?: ContainedThing[]) => unknown, thisArg?: any): unknown[] {
        return this._getContainedThingsWritable().map(callbackfn, thisArg);
    }

    // TODO: check canonical form
    public equals(other: DocumentBase<any, any>): boolean {
        throw new Error("Not implemented.")
    }

    public filter(predicate: (value: ContainedThing, index?: number, array?: ContainedThing[]) => boolean): ContainedThing[] {
        return this._getContainedThingsWritable().filter(predicate);
    }
    
}

// export class DocumentImplReadonly<
//     DocumentType extends DocumentBase<Thing<Statement<any, any>, any>, Thing<Statement<any, any>, any>>, 
//     DocumentTypeWritable extends DocumentBase<any, any>,
//     // ContainedThing extends ThingReadonly<StatementReadonly<any>, any>,
//     // SelfDescribingThing extends ThingReadonly<StatementReadonly<any>, any>, 
//     // ContainedThingWritable extends Thing<Statement<any>, any> | ThingReadonly<any, any>,
//     // SelfDescribingThingWritable extends Thing<Statement<any>, any> | ThingReadonly<any, any>,
// > implements Document<DocumentType, DocumentTypeWritable> {

//     constructor(document: Document<any, any>) {
//         // execute copy code
//     }

//     get(uri: string | Resource): ContainedThingOf<DocumentType> | undefined {
//         throw new Error("Method not implemented.");
//     }
//     getContext(): Context | undefined {
//         throw new Error("Method not implemented.");
//     }
//     getThingThatSelfDescribes(): SelfDescribingThingOf<DocumentType> | undefined {
//         throw new Error("Method not implemented.");
//     }
//     has(thing: string | Resource): boolean {
//         throw new Error("Method not implemented.");
//     }
//     hasThingThatSelfDescribes(): boolean {
//         throw new Error("Method not implemented.");
//     }
//     isEmpty(): boolean {
//         throw new Error("Method not implemented.");
//     }
//     toCanonical(): string {
//         throw new Error("Method not implemented.");
//     }
//     toStream(): string {
//         throw new Error("Method not implemented.");
//     }
//     toCopy(): ThisType<this> {
//         throw new Error("Method not implemented.");
//     }
//     [Symbol.iterator](): Iterator<ContainedThingOf<DocumentType>, any, undefined> {
//         throw new Error("Method not implemented.");
//     }
//     getUri(): string {
//         throw new Error("Method not implemented.");
//     }
//     getFactoryForCopying(): FactoryForCopying<DocumentReadonly<DocumentType, DocumentTypeWritable>> {
//         throw new Error("Method not implemented.");
//     }
//     at(index: number): ContainedThingOf<DocumentType> | undefined {
//         throw new Error("Method not implemented.");
//     }
//     contains(other: ThisType<this>): boolean {
//         throw new Error("Method not implemented.");
//     }
//     count(callbackfn?: ((thing: ContainedThingOf<DocumentType>, document?: ThisType<this> | undefined) => boolean) | undefined): number {
//         throw new Error("Method not implemented.");
//     }
//     difference(other: ThisType<this>): ThisType<this> {
//         throw new Error("Method not implemented.");
//     }
//     equals(other: ThisType<this>): boolean {
//         throw new Error("Method not implemented.");
//     }
//     every(predicate: (value: ContainedThingOf<DocumentType>, index?: number | undefined, array?: ContainedThingOf<DocumentType>[] | undefined) => boolean, thisArg?: any): boolean {
//         throw new Error("Method not implemented.");
//     }
//     filter(predicate: (value: ContainedThingOf<DocumentType>, index?: number | undefined, array?: ContainedThingOf<DocumentType>[] | undefined) => boolean): ContainedThingOf<DocumentType>[] {
//         throw new Error("Method not implemented.");
//     }
//     find(predicate: (value: ContainedThingOf<DocumentType>, index?: number | undefined, obj?: ContainedThingOf<DocumentType>[] | undefined) => boolean, thisArg?: any): ContainedThingOf<DocumentType> | undefined {
//         throw new Error("Method not implemented.");
//     }
//     findIndex(predicate: (value: ContainedThingOf<DocumentType>, index?: number | undefined, obj?: ContainedThingOf<DocumentType>[] | undefined) => unknown, thisArg?: any): number {
//         throw new Error("Method not implemented.");
//     }
//     forEach(callbackfn: (value: ContainedThingOf<DocumentType>, index?: number | undefined, array?: ContainedThingOf<DocumentType>[] | undefined) => void, thisArg?: any): void {
//         throw new Error("Method not implemented.");
//     }
//     includes(searchElement: ContainedThingOf<DocumentType>, fromIndex?: number | undefined): boolean {
//         throw new Error("Method not implemented.");
//     }
//     indexOf(searchElement: ContainedThingOf<DocumentType>, fromIndex?: number | undefined): number {
//         throw new Error("Method not implemented.");
//     }
//     keys(): IterableIterator<number> {
//         throw new Error("Method not implemented.");
//     }
//     map(callbackfn: (value: ContainedThingOf<DocumentType>, index: number, array: ContainedThingOf<DocumentType>[]) => unknown, thisArg?: any): unknown[] {
//         throw new Error("Method not implemented.");
//     }
//     reduce(callbackfn: (previousValue: ContainedThingOf<DocumentType>, currentValue: ContainedThingOf<DocumentType>, currentIndex: number, array: ContainedThingOf<DocumentType>[]) => ContainedThingOf<DocumentType>): ContainedThingOf<DocumentType> {
//         throw new Error("Method not implemented.");
//     }
//     slice(start?: number | undefined, end?: number | undefined): ThisType<this> {
//         throw new Error("Method not implemented.");
//     }
//     some(predicate: (value: ContainedThingOf<DocumentType>, index: number, array: ContainedThingOf<DocumentType>[]) => unknown, thisArg?: any): boolean {
//         throw new Error("Method not implemented.");
//     }
//     toCopyWritable(): DocumentTypeWritable {
//         throw new Error("Method not implemented.");
//     }

// }

export default DocumentImpl;