// type DocumentInternal<DocumentPublic extends Document<Thing<any, DocumentPublic>, Thing<any, DocumentPublic>>> = DocumentWritable<Document<ThingWritable<StatementTypeOf<ContainedThingOf<DocumentPublic>>, DocumentPublic>, ThingWritable<StatementTypeOf<SelfDescribingThingOf<DocumentPublic>>, DocumentPublic>>>;
// type DocumentConstructor<DocumentPublic extends Document<Thing<any, DocumentPublic>, Thing<any, DocumentPublic>>> = new () => DocumentInternal<DocumentPublic>;
// type ContainedThingConstructor<DocumentType extends Document<any, any>> = new (document: DocumentType) => ThingWritable<any, DocumentType>;
// type SelfDescribingThingConstructor<DocumentType extends DocumentWritable<any>> = new (document: DocumentType) => SelfDescribingThingOf<InputOf<DocumentType>>;
// type ConstructedDocumentOf<T extends DocumentConstructor<any>> = T extends DocumentConstructor<infer DocumentType> ? DocumentType : never; 
// TODO: FIND A WAY TO EXPOSE THING PUBLICLY BUT HAVE THINGWRITABLE INTERNALLY.
// Publicly: Document<Thing<any, any>, Thing<any, any>>
// Internally: DocumentWritable<ThingWritable<Thing<any, any>>, ThingWritable<Thing<any, any>>>
// Ex TypeIndex:
// Publicly : TypeIndex<TypeIndexRegistration, Thing<any, TypeIndex>> (DocumentWritable<Thing>)
// Internally : TypeIndexWritable<TypeIndex> (DocumentWritable<ThingWritable>)
// Intern2 : TypeIndexWritable<ThingWritable<TypeIndexRegistration>, ThingWritable<Thing<any, TypeIndex>>
// TypeIndexWritable<ThingWritable<ContainedThingOf<TypeIndex>>, ThingWritable<SelfDescribingThingOf<TypeIndex>>
export class DocumentDecoratedImpl {
    constructor(wrapped) {
        this._wrapped = wrapped; //new DocumentConstructor();
    }
    createStatement(about, value) {
        throw new Error("Method not implemented.");
    }
    addStatement(other) {
        throw new Error("Method not implemented.");
    }
    addStatementAll(others) {
        throw new Error("Method not implemented.");
    }
    createStatementAboutSelf(value) {
        throw new Error("Method not implemented.");
    }
    addStatementAboutSelf(other) {
        throw new Error("Method not implemented.");
    }
    addStatementAboutSelfAll(others) {
        throw new Error("Method not implemented.");
    }
    getStatement(about, property) {
        throw new Error("Method not implemented.");
    }
    getStatementAll(about, property) {
        throw new Error("Method not implemented.");
    }
    getStatementAboutSelf(property) {
        throw new Error("Method not implemented.");
    }
    getStatementAboutSelfAll(property) {
        throw new Error("Method not implemented.");
    }
    hasStatement(about, property) {
        throw new Error("Method not implemented.");
    }
    hasStatementAboutSelf() {
        throw new Error("Method not implemented.");
    }
    [Symbol.iterator]() {
        throw new Error("Method not implemented.");
    }
    createStatementType(about, value) {
        throw new Error("Method not implemented.");
    }
    addStatementType(other) {
        throw new Error("Method not implemented.");
    }
    addStatementTypeAll(others) {
        throw new Error("Method not implemented.");
    }
    createStatementTypeAboutSelf(value) {
        throw new Error("Method not implemented.");
    }
    addStatementTypeAboutSelf(other) {
        throw new Error("Method not implemented.");
    }
    addStatementTypeAboutSelfAll(others) {
        throw new Error("Method not implemented.");
    }
    delete(element) {
        throw new Error("Method not implemented.");
    }
    deleteMatches(uri, property, value) {
        throw new Error("Method not implemented.");
    }
    pop() {
        throw new Error("Method not implemented.");
    }
    reverse() {
        throw new Error("Method not implemented.");
    }
    shift() {
        throw new Error("Method not implemented.");
    }
    sort(compareFn) {
        throw new Error("Method not implemented.");
    }
    splice(start, deleteCount, ...items) {
        throw new Error("Method not implemented.");
    }
    getStatementType(about, property) {
        throw new Error("Method not implemented.");
    }
    getStatementTypeAll(about, property) {
        throw new Error("Method not implemented.");
    }
    getStatementTypeAboutSelf(property) {
        throw new Error("Method not implemented.");
    }
    getStatementTypeAboutSelfAll(property) {
        throw new Error("Method not implemented.");
    }
    hasStatementType(about, property) {
        throw new Error("Method not implemented.");
    }
    hasStatementTypeAboutSelf() {
        throw new Error("Method not implemented.");
    }
    at(index) {
        throw new Error("Method not implemented.");
    }
    contains(other) {
        throw new Error("Method not implemented.");
    }
    count() {
        throw new Error("Method not implemented.");
    }
    every(predicate, thisArg) {
        throw new Error("Method not implemented.");
    }
    filter(predicate) {
        throw new Error("Method not implemented.");
    }
    find(predicate, thisArg) {
        throw new Error("Method not implemented.");
    }
    findIndex(predicate, thisArg) {
        throw new Error("Method not implemented.");
    }
    forEach(callbackfn, thisArg) {
        throw new Error("Method not implemented.");
    }
    includes(searchElement, fromIndex) {
        throw new Error("Method not implemented.");
    }
    indexOf(searchElement, fromIndex) {
        throw new Error("Method not implemented.");
    }
    keys() {
        throw new Error("Method not implemented.");
    }
    map(callbackfn, thisArg) {
        throw new Error("Method not implemented.");
    }
    reduce(callbackfn) {
        throw new Error("Method not implemented.");
    }
    slice(start, end) {
        throw new Error("Method not implemented.");
    }
    some(predicate, thisArg) {
        throw new Error("Method not implemented.");
    }
    getUri() {
        throw new Error("Method not implemented.");
    }
    hasUri() {
        throw new Error("Method not implemented.");
    }
    isEmpty() {
        throw new Error("Method not implemented.");
    }
    getContext() {
        throw new Error("Method not implemented.");
    }
    equals(other) {
        throw new Error("Method not implemented.");
    }
    difference(other) {
        throw new Error("Method not implemented.");
    }
    toCopy() {
        throw new Error("Method not implemented.");
    }
    deleteContext() {
        throw new Error("Method not implemented.");
    }
    setContext(context) {
        throw new Error("Method not implemented.");
    }
}
export default DocumentDecoratedImpl;
// public hasUri(): boolean {
//     throw new Error("Method not implemented.");
// }
// public toCopy(): this {
//     throw new Error("Method not implemented.");
// }
// public createThingToSelfDescribe(): SelfDescribingThingOf<DocumentWrapped> {
//     return new this._SelfDescribingThingConstructor(this);
// }
// public createThingWithUri(nameHintOrUri?: string): ContainedThingOf<DocumentWrapped> {
//     return new this._ContainedThingConstructor(this);
// }
// // public createThingWithoutUri(nameHint?: string | undefined): ContainedThingOf<DocumentType> {
// //     return this.getWrappedDocument().createThingWithoutUri(nameHint);
// // }
// public addStatementType(thing: ContainedThingOf<DocumentWrapped>, value: string): void {
// }
// // thing: ThingWritable<ContainedThingOf<DocumentPublic>>?
// public add(thing: ContainedThingOf<DocumentWrapped>): this {
//     const thingWritable = new this._ContainedThingConstructor(thing);
//     return this.getWrappedDocument().add(thingWritable) as this;
// }
// public addAll(documentOrThings: DocumentWrapped | ContainedThingOf<DocumentWrapped>[]): this {
//     throw new Error("Method not implemented.");
// }
// public delete(thingOrUri: string | ContainedThingOf<DocumentWrapped>): this {
//     throw new Error("Method not implemented.");
// }
// public deleteContext(): void {
//     throw new Error("Method not implemented.");
// }
// public deleteMatches(uri?: string | Resource | undefined, property?: string | undefined, value?: string | undefined): this {
//     throw new Error("Method not implemented.");
// }
// public pop(): ContainedThingOf<DocumentWrapped> | undefined {
//     throw new Error("Method not implemented.");
// }
// public reverse(): void {
//     throw new Error("Method not implemented.");
// }
// public setContext(context: Context): void {
//     this.getWrappedDocument().setContext(context);
// }
// public shift(): ContainedThingOf<DocumentWrapped> | undefined {
//     throw new Error("Method not implemented.");
// }
// public sort(compareFn?: ((a: ContainedThingOf<DocumentWrapped>, b: ContainedThingOf<DocumentWrapped>) => number) | undefined): this {
//     throw new Error("Method not implemented.");
// }
// public splice(start: number, deleteCount?: number | undefined, ...items: ContainedThingOf<DocumentWrapped>[]): this {
//     throw new Error("Method not implemented.");
// }
// public union(other: DocumentWrapped): this {
//     throw new Error("Method not implemented.");
// }
// public getWrappedDocument(): DocumentInternal<DocumentWrapped> { 
//     return this._wrapped;
// }
// public getWrappedDocumentPublic(): DocumentWrapped {
//     return this._wrapped as unknown as DocumentWrapped;
// }
// public get(uri: string | Resource): ContainedThingOf<DocumentWrapped> | undefined {
//     return this.getWrappedDocument().get(uri) as ContainedThingOf<DocumentWrapped>;
// }
// public getContext(): Context | undefined {
//     return this.getWrappedDocument().getContext();
// }
// public getThingThatSelfDescribes(): SelfDescribingThingOf<DocumentWrapped> | undefined {
//     return this.getWrappedDocumentPublic().getThingThatSelfDescribes() as SelfDescribingThingOf<DocumentWrapped>;
// }
// public has(thing: string | Resource): boolean {
//     return this.getWrappedDocument().has(thing);
// }
// public hasThingThatSelfDescribes(): boolean {
//     return this.getWrappedDocument().hasThingThatSelfDescribes();
// }
// public isEmpty(): boolean {
//     return this.getWrappedDocument().isEmpty();
// }
// public [Symbol.iterator](): Iterator<ContainedThingOf<DocumentWrapped>> {
//     return this.getWrappedDocumentPublic()[Symbol.iterator]() as Iterator<ContainedThingOf<DocumentWrapped>>;
// }
// public getUri(): string {
//     return this.getWrappedDocument().getUri();
// }
// public at(index: number): ContainedThingOf<DocumentWrapped> | undefined {
//     return this.getWrappedDocument().at(index) as ContainedThingOf<DocumentWrapped>;
// }
// public contains(other: Document<any, any>): boolean {
//     return this.getWrappedDocument().contains(other);
// }
// public count(/*callbackfn?: (thing: ThisType<ContainedThingOf<DocumentType>>, document?: ThisType<this>) => boolean*/): number {
//     return this.getWrappedDocument().count(/*callbackfn*/);
// }
// public difference(other: this): this {
//     return this.getWrappedDocument().difference(other) as this;
// }
// public equals(other: this): boolean {
//     return this.getWrappedDocument().equals(other);
// }
// public every(predicate: (value: ContainedThingOf<DocumentWrapped>, index?: number | undefined, array?: ContainedThingOf<DocumentWrapped>[] | undefined) => boolean, thisArg?: any): boolean {
//     return this.getWrappedDocumentPublic().every(predicate);
// }
// public filter(predicate: (value: ContainedThingOf<DocumentWrapped>, index?: number | undefined, array?: ContainedThingOf<DocumentWrapped>[] | undefined) => boolean): ContainedThingOf<DocumentWrapped>[] {
//     return this.getWrappedDocumentPublic().filter(predicate);
// }
// public find(predicate: (value: ContainedThingOf<DocumentWrapped>, index?: number | undefined, obj?: ContainedThingOf<DocumentWrapped>[] | undefined) => boolean, thisArg?: any): ContainedThingOf<DocumentWrapped> | undefined {
//     return this.getWrappedDocument().find(predicate);
// }
// public findIndex(predicate: (value: ContainedThingOf<DocumentWrapped>, index?: number | undefined, obj?: ContainedThingOf<DocumentWrapped>[] | undefined) => unknown, thisArg?: any): number {
//     return this.getWrappedDocument().findIndex(predicate);
// }
// public forEach(callbackfn: (value: ContainedThingOf<DocumentWrapped>, index?: number | undefined, array?: ContainedThingOf<DocumentWrapped>[] | undefined) => void, thisArg?: any): void {
//     return this.getWrappedDocument().forEach(callbackfn);
// }
// public includes(searchElement: ContainedThingOf<DocumentWrapped>, fromIndex?: number | undefined): boolean {
//     return this.getWrappedDocument().includes(searchElement);
// }
// public indexOf(searchElement: ContainedThingOf<DocumentWrapped>, fromIndex?: number | undefined): number {
//     return this.getWrappedDocument().indexOf(searchElement);
// }
// public keys(): IterableIterator<number> {
//     return this.getWrappedDocument().keys();
// }
// public map(callbackfn: (value: ContainedThingOf<DocumentWrapped>, index?: number, array?: ContainedThingOf<DocumentWrapped>[]) => unknown, thisArg?: any): unknown[] {
//     return this.getWrappedDocument().map(callbackfn);
// }
// public reduce(callbackfn: (previousValue: ContainedThingOf<DocumentWrapped>, currentValue: ContainedThingOf<DocumentWrapped>, currentIndex: number, array: ContainedThingOf<DocumentWrapped>[]) => ContainedThingOf<DocumentWrapped>): ContainedThingOf<DocumentWrapped> {
//     return this.getWrappedDocument().reduce(callbackfn);
// }
// public slice(start?: number | undefined, end?: number | undefined): this {
//     return this.getWrappedDocument().slice(start, end) as this;
// }
// public some(predicate: (value: ContainedThingOf<DocumentWrapped>, index?: number, array?: ContainedThingOf<DocumentWrapped>[]) => unknown, thisArg?: any): boolean {
//     return this.getWrappedDocument().some(predicate);
// }
//# sourceMappingURL=Decorated.js.map