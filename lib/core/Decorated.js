export {};
// type DocumentInternal<DocumentPublic extends Document<Thing<any, DocumentPublic>, Thing<any, DocumentPublic>>> = DocumentWritable<Document<ThingWritable<StatementTypeOf<ContainedThingOf<DocumentPublic>>, DocumentPublic>, ThingWritable<StatementTypeOf<SelfDescribingThingOf<DocumentPublic>>, DocumentPublic>>>;
// type DocumentConstructor<DocumentPublic extends Document<Thing<any, DocumentPublic>, Thing<any, DocumentPublic>>> = new () => DocumentInternal<DocumentPublic>;
// type ContainedThingConstructor<DocumentType extends Document<any, any>> = new (document: DocumentType) => ThingWritable<any, DocumentType>;
// type SelfDescribingThingConstructor<DocumentType extends DocumentWritable<any>> = new (document: DocumentType) => SelfDescribingThingOf<InputOf<DocumentType>>;
// type ConstructedDocumentOf<T extends DocumentConstructor<any>> = T extends DocumentConstructor<infer DocumentType> ? DocumentType : never; 
// export class DocumentDecoratedImpl<
//     ContainedStatement extends Statement = Statement,
//     SelfDescribingStatement extends Statement = Statement
// > implements DocumentWritable<ContainedStatement, SelfDescribingStatement> {
//     protected _wrapped: DocumentWritable<ContainedStatement, SelfDescribingStatement>;
//     public constructor(wrapped: DocumentWritable<ContainedStatement, SelfDescribingStatement>) { //DocumentConstructor: DocumentWritableConstructor<ContainedStatement, SelfDescribingStatement>) { //} | DocumentWritableDecoratedConstructor<ContainedStatement, SelfDescribingStatement>) { 
//         this._wrapped = wrapped; //new DocumentConstructor();
//     }
//     createThing(about: string, value: string): ContainedStatement {
//         throw new Error("Method not implemented.");
//     }
//     addThing(other: ContainedStatement): ThisType<this> {
//         throw new Error("Method not implemented.");
//     }
//     addThingAll(others: Iterable<ContainedStatement>): ThisType<this> {
//         throw new Error("Method not implemented.");
//     }
//     createThingAboutSelf(value: string): ThisType<this> {
//         throw new Error("Method not implemented.");
//     }
//     addStatementAboutSelf(other: ContainedStatement): ThisType<this> {
//         throw new Error("Method not implemented.");
//     }
//     addStatementAboutSelfAll(others: Iterable<ContainedStatement>): ThisType<this> {
//         throw new Error("Method not implemented.");
//     }
//     getStatement(about: string, property: string): ContainedStatement {
//         throw new Error("Method not implemented.");
//     }
//     getStatementAll(about: string, property: string): ContainedStatement[] {
//         throw new Error("Method not implemented.");
//     }
//     getStatementAboutSelf(property: string): SelfDescribingStatement {
//         throw new Error("Method not implemented.");
//     }
//     getStatementAboutSelfAll(property: string): SelfDescribingStatement[] {
//         throw new Error("Method not implemented.");
//     }
//     hasStatement(about: string, property: string): boolean {
//         throw new Error("Method not implemented.");
//     }
//     hasStatementAboutSelf(): boolean {
//         throw new Error("Method not implemented.");
//     }
//     [Symbol.iterator](): Iterator<ContainedStatement, any, undefined> {
//         throw new Error("Method not implemented.");
//     }
//     createStatementType(about: string, value: string): ThisType<this> {
//         throw new Error("Method not implemented.");
//     }
//     addStatementType(other: ContainedStatement): ThisType<this> {
//         throw new Error("Method not implemented.");
//     }
//     addStatementTypeAll(others: Iterable<ContainedStatement>): ThisType<this> {
//         throw new Error("Method not implemented.");
//     }
//     createStatementTypeAboutSelf(value: string): ThisType<this> {
//         throw new Error("Method not implemented.");
//     }
//     addStatementTypeAboutSelf(other: ContainedStatement): ThisType<this> {
//         throw new Error("Method not implemented.");
//     }
//     addStatementTypeAboutSelfAll(others: Iterable<ContainedStatement>): ThisType<this> {
//         throw new Error("Method not implemented.");
//     }
//     deleteStatement(element: ContainedStatement): ThisType<this> {
//         throw new Error("Method not implemented.");
//     }
//     deleteMatches(uri?: string | Resource | undefined, property?: string | undefined, value?: string | undefined): ThisType<this> {
//         throw new Error("Method not implemented.");
//     }
//     pop(): ContainedStatement | undefined {
//         throw new Error("Method not implemented.");
//     }
//     reverse(): void {
//         throw new Error("Method not implemented.");
//     }
//     shift(): ContainedStatement | undefined {
//         throw new Error("Method not implemented.");
//     }
//     sort(compareFn?: ((a: ContainedStatement, b: ContainedStatement) => number) | undefined): ThisType<this> {
//         throw new Error("Method not implemented.");
//     }
//     splice(start: number, deleteCount?: number | undefined, ...items: ContainedStatement[]): ThisType<this> {
//         throw new Error("Method not implemented.");
//     }
//     getStatementType(about: string, property: string): ContainedStatement {
//         throw new Error("Method not implemented.");
//     }
//     getStatementTypeAll(about: string, property: string): ContainedStatement[] {
//         throw new Error("Method not implemented.");
//     }
//     getStatementTypeAboutSelf(property: string): ContainedStatement {
//         throw new Error("Method not implemented.");
//     }
//     getStatementTypeAboutSelfAll(property: string): ContainedStatement[] {
//         throw new Error("Method not implemented.");
//     }
//     hasStatementType(about: string, property: string): boolean {
//         throw new Error("Method not implemented.");
//     }
//     hasStatementTypeAboutSelf(): boolean {
//         throw new Error("Method not implemented.");
//     }
//     at(index: number): ContainedStatement | undefined {
//         throw new Error("Method not implemented.");
//     }
//     contains(other: Document): boolean {
//         throw new Error("Method not implemented.");
//     }
//     count(): number {
//         throw new Error("Method not implemented.");
//     }
//     every(predicate: (value: ContainedStatement, index?: number | undefined, array?: ContainedStatement[] | undefined) => boolean, thisArg?: any): boolean {
//         throw new Error("Method not implemented.");
//     }
//     filter(predicate: (value: ContainedStatement, index?: number | undefined, array?: ContainedStatement[] | undefined) => boolean): ContainedStatement[] {
//         throw new Error("Method not implemented.");
//     }
//     find(predicate: (value: ContainedStatement, index?: number | undefined, obj?: ContainedStatement[] | undefined) => boolean, thisArg?: any): ContainedStatement | undefined {
//         throw new Error("Method not implemented.");
//     }
//     findIndex(predicate: (value: ContainedStatement, index?: number | undefined, obj?: ContainedStatement[] | undefined) => unknown, thisArg?: any): number {
//         throw new Error("Method not implemented.");
//     }
//     forEach(callbackfn: (value: ContainedStatement, index?: number | undefined, array?: ContainedStatement[] | undefined) => void, thisArg?: any): void {
//         throw new Error("Method not implemented.");
//     }
//     includes(searchElement: ContainedStatement, fromIndex?: number | undefined): boolean {
//         throw new Error("Method not implemented.");
//     }
//     indexOf(searchElement: ContainedStatement, fromIndex?: number | undefined): number {
//         throw new Error("Method not implemented.");
//     }
//     keys(): IterableIterator<number> {
//         throw new Error("Method not implemented.");
//     }
//     map(callbackfn: (value: ContainedStatement, index?: number | undefined, array?: ContainedStatement[] | undefined) => unknown, thisArg?: any): unknown[] {
//         throw new Error("Method not implemented.");
//     }
//     reduce(callbackfn: (previousValue: ContainedStatement, currentValue: ContainedStatement, currentIndex: number, array: ContainedStatement[]) => ContainedStatement): ContainedStatement {
//         throw new Error("Method not implemented.");
//     }
//     slice(start?: number | undefined, end?: number | undefined): Document {
//         throw new Error("Method not implemented.");
//     }
//     some(predicate: (value: ContainedStatement, index?: number | undefined, array?: ContainedStatement[] | undefined) => unknown, thisArg?: any): boolean {
//         throw new Error("Method not implemented.");
//     }
//     getUri(): string {
//         throw new Error("Method not implemented.");
//     }
//     hasUri(): boolean {
//         throw new Error("Method not implemented.");
//     }
//     isEmpty(): boolean {
//         throw new Error("Method not implemented.");
//     }
//     getContext(): Context | undefined {
//         throw new Error("Method not implemented.");
//     }
//     equals(other: ThisType<this>): boolean {
//         throw new Error("Method not implemented.");
//     }
//     difference(other: ThisType<this>): ThisType<this> {
//         throw new Error("Method not implemented.");
//     }
//     toCopy(): ThisType<this> {
//         throw new Error("Method not implemented.");
//     }
//     deleteContext(): void {
//         throw new Error("Method not implemented.");
//     }
//     setContext(context: Context): void {
//         throw new Error("Method not implemented.");
//     } 
// }
// export default DocumentDecoratedImpl;
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