import { Context, Resource } from "../core/Common.js";
import { DocumentWithNonDestructiveOperations, Document, StatementOf } from "../core/Document.js";
import { Statement, StatementWithDestructiveOperations } from "../core/Statement.js";
import { ThingWithNonDestructiveOperations, ThingConstructor, ThingDesctructiveOperations, Thing } from "../core/Thing.js";
import ThingImpl from "./ThingImpl.js";

export class DocumentImpl<
    ContainedThing extends Thing<any>, 
    SelfDescribingThing extends Thing<any>
> implements Document<ContainedThing, SelfDescribingThing> {
    
    // protected _uri: string;
    // protected _selfDescribingThing?: SelfDescribingThingOf<DocumentType>;
    // protected _things: ContainedThingOf<DocumentType>[]; //ResourceCollectionWritable<ContainedThingOf<DocumentType>>; //[]; // ThingWritable ? -> Thing
    // protected _context?: Context;
    // protected _factory: Factory<DocumentType>; //DocumentImpl<Document<DocumentType, DocumentTypeReadonly>>>;

    private _containedThings: ContainedThing[];
    private _selfDescribingThing: SelfDescribingThing | undefined;
    private _containedThingImpl: ThingConstructor<ContainedThing>;
    private _selfDescribingThingImpl: ThingConstructor<SelfDescribingThing>;

    public constructor(containedThingImpl: ThingConstructor<ContainedThing>, selfDescribingThingImpl: ThingConstructor<SelfDescribingThing>) {
        this._containedThings = [];
        this._selfDescribingThing = undefined;
        this._containedThingImpl = containedThingImpl;
        this._selfDescribingThingImpl = selfDescribingThingImpl;
    }
    
    getThingAllIterator(): Iterator<Thing<StatementWithDestructiveOperations>, any, undefined> {
        throw new Error("Method not implemented.");
    }
    getStatementAllIterator(): Iterator<StatementWithDestructiveOperations, any, undefined> {
        throw new Error("Method not implemented.");
    }

    protected getContainedThingsInternal(): ContainedThing[] {
        return this._containedThings;
    }

    protected getSelfDescribingThingInternal(): SelfDescribingThing | undefined {
        return this._selfDescribingThing;
    }

    public createThing(uriOrNameHint?: string | Resource): ContainedThing {
        const thing = new this._containedThingImpl(uriOrNameHint);
        this.getContainedThingsInternal().push(thing);
        return thing.toCopy() as ContainedThing;
    }

    public createThingAboutSelf(): SelfDescribingThing {
        let result = this.getThingAboutSelf();
        if (!result) {
            this._selfDescribingThing = new this._selfDescribingThingImpl();
            result = this._selfDescribingThing;
        }
        return this.getThingAboutSelf()!;
    }

    addThing(other: ThingWithNonDestructiveOperations): ContainedThing {
        throw new Error("Method not implemented.");
    }
    addThingAll(others: Iterable<ThingWithNonDestructiveOperations>): ContainedThing[] {
        throw new Error("Method not implemented.");
    }
    addThingAboutSelf(other: ThingWithNonDestructiveOperations): SelfDescribingThing {
        throw new Error("Method not implemented.");
    }
    addThingAboutSelfAll(others: Iterable<ThingWithNonDestructiveOperations>): SelfDescribingThing[] {
        throw new Error("Method not implemented.");
    }
    
    public createStatement(about: string | Resource, property: string, value: string, datatype?: string | undefined, language?: string | undefined): StatementOf<ContainedThing> {
        const thing = this._getThing(about); // TODO: or create a thing
        //if (thing) thing.createStatement(property, value, datatype, language);
        //return thing!;
        return thing? thing.createStatement(property, value, datatype, language): undefined; // weard
    }

    public createStatementAboutSelf(property: string, value: string, datatype?: string | undefined, language?: string | undefined): StatementOf<SelfDescribingThing> {
        this.createThingAboutSelf();
        return this.getSelfDescribingThingInternal()!.createStatement(property, value, datatype, language);
    }

    addStatement(other: Statement): StatementOf<ContainedThing> {
        throw new Error("Method not implemented.");
    }
    addStatementAll(others: Iterable<Statement>): StatementOf<ContainedThing>[] {
        throw new Error("Method not implemented.");
    }
    addStatementAboutSelf(other: Statement): StatementOf<SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }
    addStatementAboutSelfAll(others: Iterable<Statement>): StatementOf<SelfDescribingThing>[] {
        throw new Error("Method not implemented.");
    }
    setStatement(about: string | Resource, property: string, value: string, oldValue?: string | undefined, datatype?: string | undefined, language?: string | undefined): StatementOf<ContainedThing> {
        throw new Error("Method not implemented.");
    }
    setStatementAboutSelf(property: string, value: string, oldValue?: string | undefined, datatype?: string | undefined, language?: string | undefined): StatementOf<SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }

    public setThing(thing: ContainedThing, uri?: string): ContainedThing {
        const internalThingUri = uri? uri: thing.getUri();
        const index = this.findIndex(t => t.getUri() === internalThingUri);
        return this.setThingAt(index, thing);
    }

    public setThingAt(index: number, thing: ContainedThing): ContainedThing {
        return this.splice(index, 1, thing)[0]; // Warning here!
    }

    removeThing(thingOrUri: string | Resource): boolean {
        throw new Error("Method not implemented.");
    }

    public removeStatement(statement: Statement): boolean;
    public removeStatement(about: string | Resource, property: string, value: string, language?: string): boolean;
    public removeStatement(...params: any[]): boolean {
        const [ aboutOrstatement, property, value, language ] = params;
        throw new Error("Method not implemented.");
    }

    pop(): ContainedThing | undefined {
        throw new Error("Method not implemented.");
    }
    reverse(): void {
        throw new Error("Method not implemented.");
    }
    shift(): ContainedThing | undefined {
        throw new Error("Method not implemented.");
    }
    sort(compareFn?: ((a: ContainedThing, b: ContainedThing) => number) | undefined): ThisType<this> {
        throw new Error("Method not implemented.");
    }

    public splice(start: number, deleteCount?: number): ContainedThing[];
    public splice(start: number, deleteCount: number, ...items: ContainedThing[]): ContainedThing[];
    public splice(start: number, deleteCount?: number, ...items: ContainedThing[]): ContainedThing[] {
        const internalItems: ContainedThing[] = [];
        if (deleteCount && items) {
            items.forEach(item => internalItems.push(item.toCopy() as ContainedThing))
            this.getContainedThingsInternal().splice(start, deleteCount, ...internalItems);
        }
        else this.getContainedThingsInternal().splice(start, deleteCount);
        return internalItems;
    }

    private _getThing(about: string | Resource): ContainedThing | undefined {
        const uri = typeof about === 'string'? about: about.getUri();
        return this.getContainedThingsInternal().find(t => t.getUri() === uri);
    }

    public getThing(about: string | Resource): ContainedThing {
        let thing = this._getThing(about);
        if (thing) {
            return thing.toCopy() as ContainedThing;
        }
        throw new Error(`Unable to get the thing.`); // TODO: log the thing
    }

    public getThingAboutSelf(): SelfDescribingThing | undefined {
        return this.getSelfDescribingThingInternal()?.toCopy() as SelfDescribingThing;
    }

    hasThing(about: string | Resource): boolean {
        throw new Error("Method not implemented.");
    }
    hasThingAboutSelf(): boolean {
        throw new Error("Method not implemented.");
    }
    getStatement(about: string | Resource, property: string, language?: string | undefined): StatementOf<ContainedThing> {
        throw new Error("Method not implemented.");
    }
    
    public getStatementAll(about: string | Resource, property?: string | undefined, language?: string | undefined): StatementOf<ContainedThing>[] {
        return this.getThing(about).getStatementAll(property, language);
    }

    getStatementAboutSelf(property: string, language?: string | undefined): StatementOf<SelfDescribingThing> | undefined {
        throw new Error("Method not implemented.");
    }
    getStatementAboutSelfAll(property?: string | undefined, language?: string | undefined): StatementOf<SelfDescribingThing>[] {
        throw new Error("Method not implemented.");
    }
    hasStatement(about: string | Resource, property?: string | undefined, language?: string | undefined): boolean {
        throw new Error("Method not implemented.");
    }
    hasStatementAboutSelf(property?: string | undefined, language?: string | undefined): boolean {
        throw new Error("Method not implemented.");
    }
    at(index: number): ContainedThing | undefined {
        throw new Error("Method not implemented.");
    }
    contains(other: DocumentWithNonDestructiveOperations<any, ThingWithNonDestructiveOperations>): boolean {
        throw new Error("Method not implemented.");
    }
    count(): number {
        throw new Error("Method not implemented.");
    }
    every(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => boolean, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }
    
    public filter(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => boolean): ContainedThing[] {
        return this.getContainedThingsInternal().filter(predicate);
    }

    filterContainedStatement(predicate: (value: StatementOf<ContainedThing>, index?: number | undefined, array?: StatementOf<ContainedThing>[] | undefined) => boolean): StatementOf<ContainedThing>[] {
        throw new Error("Method not implemented.");
    }

    public find(predicate: (value: ContainedThing, index?: number | undefined, obj?: ContainedThing[] | undefined) => boolean, thisArg?: any): ContainedThing | undefined {
        return this.getContainedThingsInternal().find(predicate);
    }
    
    public findIndex(predicate: (value: ContainedThing, index?: number | undefined, obj?: ContainedThing[] | undefined) => unknown, thisArg?: any): number {
        return this.getContainedThingsInternal().findIndex(predicate);
    }

    public forEach(callbackfn: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => void, thisArg?: any): void {
        this.getContainedThingsInternal().forEach(callbackfn);
    }

    forEachStatement(callbackfn: (value: StatementOf<ContainedThing>, index?: number | undefined, array?: StatementOf<ContainedThing>[] | undefined) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }
    includes(searchElement: ContainedThing, fromIndex?: number | undefined): boolean {
        throw new Error("Method not implemented.");
    }
    indexOf(searchElement: ContainedThing, fromIndex?: number | undefined): number {
        throw new Error("Method not implemented.");
    }
    keys(): IterableIterator<number> {
        throw new Error("Method not implemented.");
    }
    map(callbackfn: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => unknown, thisArg?: any): unknown[] {
        throw new Error("Method not implemented.");
    }
    reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => ThingWithNonDestructiveOperations): ContainedThing {
        throw new Error("Method not implemented.");
    }
    slice(start?: number | undefined, end?: number | undefined): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    some(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => unknown, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }
    
    public [Symbol.iterator](): Iterator<ContainedThing> {
        return this.getContainedThingsInternal()[Symbol.iterator](); // Should be a copy?
    }

    getUri(): string {
        throw new Error("Method not implemented.");
    }
    hasUri(): boolean {
        throw new Error("Method not implemented.");
    }
    getContext(): Context | undefined {
        throw new Error("Method not implemented.");
    }
    equals(other: ThisType<this>): boolean {
        throw new Error("Method not implemented.");
    }
    difference(other: ThisType<this>): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    toCopy(): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    deleteContext(): void {
        throw new Error("Method not implemented.");
    }
    setContext(context: Context): void {
        throw new Error("Method not implemented.");
    }

}

export class DocumentImplDefault extends DocumentImpl<Thing<Statement>, Thing<Statement>> {

    public constructor() {
        super(ThingImpl, ThingImpl);
    }

}

    // public constructor(/*factory: Factory<DocumentType> /*TODO: add constraint to this type */) {//documentOrUri?: DocumentBase<ContainedThing<Wrapped>, SelfDescribingThing<Wrapped>> | string, context?: Context) {
    //     this._uri = ""; //typeof documentOrUri === 'string'? documentOrUri ?? '': documentOrUri?.getUri() ?? '';
    //     this._context = undefined; //context;
    //     this._things = [];
    // }
    
    // // public getFactoryForCopying(): FactoryForCopying<Document<DocumentType, DocumentTypeReadonly>> {
    // //     throw new Error("Method not implemented.");
    // // }

    // // public getFactory(): Factory<this> { //Document<DocumentType, DocumentTypeReadonly>> {
    // //     return this._factory;
    // // }

    // public hasUri(): boolean {
    //     throw new Error();
    // }

    // public toCopy(): this {
    //     //throw new Error("Method not implemented.");
    //     const copy = new DocumentImpl<DocumentType>() //ContainedThing, SelfDescribingThing/*, DocumentTypeReadonly*/>(/*this._factory*/);
    //     copy._uri = this._uri;
    //     return copy as this;
    // }

    // // public toCopyReadonly(): DocumentTypeReadonly {
    // //     return this.getFactoryForCopying().createDocument(this);
    // // }
   
    // // public createThingToSelfDescribe(): SelfDescribingThingOf<DocumentType> {
    // //     const thing = this.getFactory().createThingToDescribeDocument(this);
    // //     this._selfDescribingThing = thing;
    // //     return thing;
    // // }

    // // public createThingWithoutUri(nameHint?: string | undefined): ContainedThingOf<DocumentType> {
    // //     return this.getFactory().createThingWithoutUri(this);
    // // }

    // public add(thing: ContainedThingOf<DocumentType>): this {
    //     this._getContainedThingsWritable().push(thing);
    //     return this;
    // }
    
    // public addAll(documentOrThings: ContainedThingOf<DocumentType>[]): this {
    //     throw new Error("Method not implemented.");
    // }
    
    // public delete(thingOrUri: string | ContainedThingOf<DocumentType>): this {
    //     throw new Error("Method not implemented.");
    // }
    
    // public deleteContext(): void {
    //     throw new Error("Method not implemented.");
    // }
    
    // public deleteMatches(uri?: string | Resource | undefined, property?: string | undefined, value?: string | undefined): this {
    //     throw new Error("Method not implemented.");
    // }
    
    // public pop(): ContainedThingOf<DocumentType> | undefined {
    //     throw new Error("Method not implemented.");
    // }
    
    // public reverse(): void {
    //     throw new Error("Method not implemented.");
    // }
    
    // public setContext(context: Context): void {
    //     this._context = context;
    // }
    
    // public shift(): ContainedThingOf<DocumentType> | undefined {
    //     throw new Error("Method not implemented.");
    // }
    
    // public sort(compareFn?: ((a: ContainedThingOf<DocumentType>, b: ContainedThingOf<DocumentType>) => number) | undefined): this {
    //     throw new Error("Method not implemented.");
    // }
    
    // public splice(start: number, deleteCount?: number | undefined, ...items: ContainedThingOf<DocumentType>[]): this {
    //     throw new Error("Method not implemented.");
    // }
    
    // public union(other: DocumentBase<any, any>): this {
    //     throw new Error("Method not implemented.");
    // }

    // protected addAndReturnContainedThing(thing: ContainedThingOf<DocumentType>): ContainedThingOf<DocumentType> {
    //     this.add(thing);
    //     return thing;
    // }

    // public generateContainedThingName(): string {
    //     return "generatedName"; // TODO
    // }

    // protected generateUriWithFragment(): string {
    //     return this.createUriWithFragment(this.generateContainedThingName());
    // }

    // protected getOrCreateNameWithHash(nameWithOrWithoutHash: string): string {
    //     return nameWithOrWithoutHash.startsWith('#')? nameWithOrWithoutHash: `#${nameWithOrWithoutHash}`;
    // }

    // protected createUriWithFragment(name: string): string {
    //     return this.getUri() + this.getOrCreateNameWithHash(name);
    // }

    // protected checkUriCanBeAddedToTheDocument(uri: string): boolean {
    //     return this.isUrl(uri) && !this.hasStatementsAbout(uri);
    // }

    // protected getSafeUriFromUri(uri: string): string {
    //     if (!this.checkUriCanBeAddedToTheDocument(uri))
    //         throw new Error(`You are trying to add the thing "${uri}" but it is already part of the document.`);
    //     return uri;
    // }

    // protected getSafeUriFromName(name: string): string {
    //     const uri = this.createUriWithFragment(name);
    //     if (!this.checkUriCanBeAddedToTheDocument(uri))
    //         throw new Error(`You are trying to add the thing "${uri}" but it is already part of the document.`);
    //     return uri;
    // }

    // protected getSafeUriFromNameHintOrUri(nameHintOrUri: string): string {
    //     return this.isUrl(nameHintOrUri)? this.getSafeUriFromUri(nameHintOrUri): this.getSafeUriFromName(nameHintOrUri);
    // }

    // protected validateOrCreateContainedThingUri(nameHintOrUri?: string): string {
    //     return nameHintOrUri? this.getSafeUriFromNameHintOrUri(nameHintOrUri): this.generateUriWithFragment();
    // }

    // // public createThingWithUri(nameHintOrUri?: string): ContainedThingOf<DocumentType> {
    // //     const uriOfNewRegularContainedThing = this.validateOrCreateContainedThingUri(nameHintOrUri);
    // //     return this.addAndReturnContainedThing(this.getFactory().createThing(this, uriOfNewRegularContainedThing));
    // // }

    // // TODO: move to utils class?
    // protected isUrl(input: string): boolean {
    //     return input.startsWith('http') || input.startsWith('#') || input === '';
    // }

    // protected hasStatementsAbout(subject: string | Resource, property?: string, ...hasValues: string[]): boolean {
    //     const uri = typeof subject === 'string'? subject: subject.getUri();
    //     return this._getContainedThingsWritable().some(thing => thing.getUri() === uri);
    // }

    // protected _getContainedThingsWritable(): ContainedThingOf<DocumentType>[] /*ResourceCollectionWritable<ContainedThingOf<DocumentType>>*/ {
    //     return this._things;
    // }

    // public count(): number { //callbackfn?: (thing: ContainedThingOf<DocumentType>, document?: this) => boolean): number {
    //     return this._getContainedThingsWritable().length;
    // }

    // public get(uri: string | Resource): ContainedThingOf<DocumentType> | undefined {
    //     // TODO uri or resource.getUri
    //     const things = this._things.filter((thing: ContainedThingOf<DocumentType>) => thing.getUri() === uri);
    //     return things.length > 0? things[0]: undefined;
    // }
    
    // public getContext(): Context | undefined {
    //     return this._context;
    // }

    // public getThingThatSelfDescribes(): SelfDescribingThingOf<DocumentType> | undefined {
    //     return this._selfDescribingThing;
    // }
    
    // public has(uriOrResource: string | Resource): boolean {
    //     return this.get(uriOrResource)? true: false;
    // }

    // public hasThingThatSelfDescribes(): boolean {
    //     return this.getThingThatSelfDescribes() !== undefined;
    // }
    
    // public getUri(): string {
    //     return this._uri;
    // }

    // public isEmpty(): boolean {
    //     return this.count() === 0;
    // }

    // public toCanonical(): string {
    //     throw new Error("Method not implemented.");
    // }

    // public toStream(): string {
    //     throw new Error("Method not implemented.");
    // }

    // public [Symbol.iterator](): Iterator<ContainedThingOf<DocumentType>> {
    //     return this._getContainedThingsWritable()[Symbol.iterator]();
    // }

    // public at(index: number): ContainedThingOf<DocumentType> | undefined {
    //     return this._getContainedThingsWritable().at(index);
    // }

    // public contains(other: Document<any, any>): boolean {
    //     return other.every((thing: ContainedThingOf<DocumentType>) => this.includes(thing));
    // }

    // public difference(other: DocumentType): DocumentType {
    //     throw new Error("Method not implemented.");
    // }

    // public every(predicate: (value: ContainedThingOf<DocumentType>, index?: number, array?: ContainedThingOf<DocumentType>[]) => boolean, thisArg?: any): boolean {
    //     return this._getContainedThingsWritable().every(predicate);
    // }

    // public find(predicate: (value: ContainedThingOf<DocumentType>, index?: number, obj?: ContainedThingOf<DocumentType>[]) => boolean, thisArg?: any): ContainedThingOf<DocumentType> | undefined {
    //     return this._getContainedThingsWritable().find(predicate);
    // }

    // public findIndex(predicate: (value: ContainedThingOf<DocumentType>, index?: number, obj?: ContainedThingOf<DocumentType>[]) => unknown, thisArg?: any): number {
    //     return this._getContainedThingsWritable().findIndex(predicate);
    // }

    // public includes(searchElement: ContainedThingOf<DocumentType>, fromIndex?: number): boolean {
    //     return this._getContainedThingsWritable().includes(searchElement, fromIndex);
    // }

    // public indexOf(searchElement: ContainedThingOf<DocumentType>, fromIndex?: number | undefined): number {
    //     return this._getContainedThingsWritable().indexOf(searchElement, fromIndex);
    // }

    // public keys(): IterableIterator<number> {
    //     return this._getContainedThingsWritable().keys()
    // }

    // public reduce(callbackfn: (previousValue: ContainedThingOf<DocumentType>, currentValue: ContainedThingOf<DocumentType>, currentIndex: number, array: ContainedThingOf<DocumentType>[]) => ContainedThingOf<DocumentType>): ContainedThingOf<DocumentType> {
    //     return this._getContainedThingsWritable().reduce(callbackfn);
    // }

    // public slice(start?: number, end?: number): this {
    //     throw new Error("Method not implemented.");
    //     // const things = this._getContainedThings().slice(start, end);
    //     // const sliced = new DocumentImpl<ContainedThing, SelfDescribingThing>();
    //     // sliced._things = things;
    //     // return sliced as this;
    // }

    // public some(predicate: (value: ContainedThingOf<DocumentType>, index?: number, array?: ContainedThingOf<DocumentType>[]) => unknown, thisArg?: any): boolean {
    //     return this._getContainedThingsWritable().some(predicate);
    // }

    // public forEach(callbackfn: (value: ContainedThingOf<DocumentType>, index?: number, array?: ContainedThingOf<DocumentType>[]) => void, thisArg?: any): void {
    //     this._getContainedThingsWritable().forEach(callbackfn, thisArg);
    // }

    // public map(callbackfn: (value: ContainedThingOf<DocumentType>, index?: number, array?: ContainedThingOf<DocumentType>[]) => unknown, thisArg?: any): unknown[] {
    //     return this._getContainedThingsWritable().map(callbackfn, thisArg);
    // }

    // // TODO: check canonical form
    // public equals(other: DocumentBase<any, any>): boolean {
    //     throw new Error("Not implemented.")
    // }

    // public filter(predicate: (value: ContainedThingOf<DocumentType>, index?: number, array?: ContainedThingOf<DocumentType>[]) => boolean): ContainedThingOf<DocumentType>[] {
    //     return this._getContainedThingsWritable().filter(predicate);
    // }

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