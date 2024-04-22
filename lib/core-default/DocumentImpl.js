import StatementImpl from "./StatementImpl.js";
export class DocumentImpl {
    constructor(containedStatementImpl, selfDescribingStatementImpl) {
        this._containedStatements = [];
        this._selfDescribingStatements = [];
        this._containedStatementImpl = containedStatementImpl;
        this._selfDescribingStatementImpl = selfDescribingStatementImpl;
    }
    getContainedStatementsInternal() {
        return this._containedStatements;
    }
    getSelfDescribingStatementsInternal() {
        return this._selfDescribingStatements;
    }
    createStatement(about, property, value, datatype, language) {
        const statement = new this._containedStatementImpl(about, property, value, datatype, language);
        this.getContainedStatementsInternal().push(statement);
        return statement;
    }
    createContainedStatementFrom(other) {
        return new this._containedStatementImpl(other.getSubject(), other.getProperty(), other.getValue(), other.getDatatype(), other.getLanguage());
    }
    createSelfDescribingStatementFrom(other) {
        return new this._selfDescribingStatementImpl(other.getSubject(), other.getProperty(), other.getValue(), other.getDatatype(), other.getLanguage());
    }
    addStatement(other) {
        const statement = this.createContainedStatementFrom(other);
        this.getContainedStatementsInternal().push(statement);
        return this;
    }
    addStatementAll(others) {
        for (const other of others) {
            const statement = this.createContainedStatementFrom(other);
            this.addStatement(statement);
        }
        return this;
    }
    createStatementAboutSelf(property, value, datatype, language) {
        const statement = new this._selfDescribingStatementImpl(this.getUri(), property, value, datatype, language);
        this.getSelfDescribingStatementsInternal().push(statement);
        return this;
    }
    addStatementAboutSelf(other) {
        const statement = this.createSelfDescribingStatementFrom(other);
        this.getSelfDescribingStatementsInternal().push(statement);
        return this;
    }
    addStatementAboutSelfAll(others) {
        for (const other of others) {
            const statement = this.createSelfDescribingStatementFrom(other);
            this.addStatementAboutSelf(statement);
        }
        return this;
    }
    deleteStatement(statement) {
        this._containedStatements = this._containedStatements.filter(s => s !== statement);
        this._selfDescribingStatements = this._selfDescribingStatements.filter(s => s !== statement);
        return this;
    }
    // Equivalent to splice
    // deleteMatches(uri?: string | Resource | undefined, property?: string | undefined, value?: string | undefined): ThisType<this> {
    //     throw new Error("Method not implemented.");
    // }
    pop() {
        return this.getContainedStatementsInternal().pop();
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
    getStatementInternal(about, property, language) {
        return this.getContainedStatementsInternal().find(s => {
            if (s.getSubject() === about && s.getProperty() === property) {
                return language ? s.getLanguage() === language : true;
            }
        });
    }
    getStatement(about, property, language) {
        return this.getStatementInternal(about, property, language);
    }
    getStatementAll(about, property, language) {
        let statementsAbout = this.getContainedStatementsInternal().filter(s => s.getSubject() === about);
        if (property) {
            statementsAbout = statementsAbout.filter(s => s.getProperty() === property);
            if (language) {
                statementsAbout = statementsAbout.filter(s => s.getLanguage() === language);
            }
        }
        return statementsAbout;
    }
    getStatementAboutSelf(property, language) {
        return this.getSelfDescribingStatementsInternal().find(s => {
            if (s.getProperty() === property) {
                return language ? s.getLanguage() === language : true;
            }
        });
    }
    getStatementAboutSelfAll(property, language) {
        let statementsAbout = this.getSelfDescribingStatementsInternal().filter(s => s.getProperty() === property);
        if (language) {
            statementsAbout = statementsAbout.filter(s => s.getLanguage() === language);
        }
        return statementsAbout;
    }
    hasStatement(about, property, language) {
        throw new Error("Method not implemented.");
    }
    hasStatementAboutSelf(property, language) {
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
        this.getContainedStatementsInternal().forEach(callbackfn, thisArg);
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
    setStatementAbout(about, property, value, dataset, language) {
        const statement = this.getStatementInternal(about, property, language);
        if (statement) {
            statement.setValue(value);
        }
    }
    slice(start, end) {
        throw new Error("Method not implemented.");
    }
    some(predicate, thisArg) {
        throw new Error("Method not implemented.");
    }
    [Symbol.iterator]() {
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
export class DocumentImplDefault extends DocumentImpl {
    constructor() {
        super(StatementImpl, StatementImpl);
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
//# sourceMappingURL=DocumentImpl.js.map