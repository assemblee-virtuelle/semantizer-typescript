/*type DocumentBaseWithReadOperations<
    DocumentType extends DocumentBase<any, any>
> = DocumentBase<ContainedThingOf<DocumentType>, SelfDescribingThingOf<DocumentType>> & WithReadOperations<DocumentType>;

export class DocumentBaseDecorated<
    DocumentType extends DocumentBase<any, any>
>
implements DocumentBase<ContainedThingOf<DocumentType>, SelfDescribingThingOf<DocumentType>> {
    
    protected _wrapped: DocumentBaseWithReadOperations<DocumentType>;

    public constructor(wrapped: DocumentBaseWithReadOperations<DocumentType>) {
        this._wrapped = wrapped;
    }

    public toCopy(): this {
        throw new Error("Method not implemented.");
    }

    public toCopyReadonly<DocumentCopied extends DocumentReadonly<any, any>>(): DocumentCopied {
        throw new Error("Method not implemented.");
    }
    
    public toCopyWritable<DocumentCopied extends Document<any, any>>(): DocumentCopied {
        throw new Error("Method not implemented.");
    }

    protected getWrappedDocument(): DocumentBaseWithReadOperations<DocumentType> {
        return this._wrapped;
    }

    public get(uri: string | Resource): ContainedThingOf<DocumentType> | undefined {
        return this.getWrappedDocument().get(uri);
    }

    public getContext(): Context | undefined {
        return this.getWrappedDocument().getContext();
    }

    public getThingThatSelfDescribes(): SelfDescribingThingOf<DocumentType> | undefined {
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

    public [Symbol.iterator](): Iterator<ContainedThingOf<DocumentType>> {
        return this.getWrappedDocument()[Symbol.iterator]();
    }

    public getUri(): string {
        return this.getWrappedDocument().getUri();
    }

    public at(index: number): ContainedThingOf<DocumentType> | undefined {
        return this.getWrappedDocument().at(index);
    }

    public contains(other: this): boolean {
        return this.getWrappedDocument().contains(other);
    }

    public count(callbackfn?: (thing: ContainedThingOf<DocumentType>, document?: ThisType<this>) => boolean): number {
        return this.getWrappedDocument().count(callbackfn);
    }

    public every(predicate: (value: ContainedThingOf<DocumentType>, index?: number | undefined, array?: ContainedThingOf<DocumentType>[] | undefined) => boolean, thisArg?: any): boolean {
        return this.getWrappedDocument().every(predicate);
    }

    public filter(predicate: (value: ContainedThingOf<DocumentType>, index?: number | undefined, array?: ContainedThingOf<DocumentType>[] | undefined) => boolean): ContainedThingOf<DocumentType>[] {
        return this.getWrappedDocument().filter(predicate);
    }

    public find(predicate: (value: ContainedThingOf<DocumentType>, index?: number | undefined, obj?: ContainedThingOf<DocumentType>[] | undefined) => boolean, thisArg?: any): ContainedThingOf<DocumentType> | undefined {
        return this.getWrappedDocument().find(predicate);
    }

    public findIndex(predicate: (value: ContainedThingOf<DocumentType>, index?: number | undefined, obj?: ContainedThingOf<DocumentType>[] | undefined) => unknown, thisArg?: any): number {
        return this.getWrappedDocument().findIndex(predicate);
    }

    public forEach(callbackfn: (value: ContainedThingOf<DocumentType>, index?: number | undefined, array?: ContainedThingOf<DocumentType>[] | undefined) => void, thisArg?: any): void {
        return this.getWrappedDocument().forEach(callbackfn);
    }

    public includes(searchElement: ContainedThingOf<DocumentType>, fromIndex?: number | undefined): boolean {
        return this.getWrappedDocument().includes(searchElement);
    }

    public indexOf(searchElement: ContainedThingOf<DocumentType>, fromIndex?: number | undefined): number {
        return this.getWrappedDocument().indexOf(searchElement);
    }

    public keys(): IterableIterator<number> {
        return this.getWrappedDocument().keys();
    }

    public map(callbackfn: (value: ContainedThingOf<DocumentType>, index: number, array: ContainedThingOf<DocumentType>[]) => unknown, thisArg?: any): unknown[] {
        return this.getWrappedDocument().map(callbackfn);
    }

    public reduce(callbackfn: (previousValue: ContainedThingOf<DocumentType>, currentValue: ContainedThingOf<DocumentType>, currentIndex: number, array: ContainedThingOf<DocumentType>[]) => ContainedThingOf<DocumentType>): ContainedThingOf<DocumentType> {
        return this.getWrappedDocument().reduce(callbackfn);
    }

    public some(predicate: (value: ContainedThingOf<DocumentType>, index: number, array: ContainedThingOf<DocumentType>[]) => unknown, thisArg?: any): boolean {
        return this.getWrappedDocument().some(predicate);
    }

}*/
// The @ts-ignore should never throw as the methods should never be called by a readonly object.
export class DocumentDecorated {
    constructor(wrapped) {
        this._wrapped = wrapped;
    }
    getFactoryForCopying() {
        throw new Error("Method not implemented.");
    }
    getFactory() {
        return this.getWrappedDocument().getFactory(); // as Factory<this>;
    }
    toCopy() {
        throw new Error("Method not implemented.");
    }
    toCopyReadonly() {
        throw new Error("Method not implemented.");
    }
    toCopyWritable() {
        throw new Error("Method not implemented.");
    }
    createThingToSelfDescribe() {
        // @ts-ignore
        return this.getWrappedDocument().createThingToSelfDescribe();
    }
    createThingWithoutUri(nameHint) {
        // @ts-ignore
        return this.getWrappedDocument().createThingWithoutUri(nameHint);
    }
    add(thing) {
        // @ts-ignore
        return this.getWrappedDocument().add(thing);
    }
    addAll(documentOrThings) {
        throw new Error("Method not implemented.");
    }
    delete(thingOrUri) {
        throw new Error("Method not implemented.");
    }
    deleteContext() {
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
    setContext(context) {
        // @ts-ignore
        this.getWrappedDocument().setContext(context);
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
    union(other) {
        throw new Error("Method not implemented.");
    }
    createThingWithUri(nameHintOrUri) {
        // @ts-ignore
        return this.getWrappedDocument().createThingWithUri(nameHintOrUri);
    }
    getWrappedDocument() {
        return this._wrapped;
    }
    get(uri) {
        return this.getWrappedDocument().get(uri);
    }
    getContext() {
        return this.getWrappedDocument().getContext();
    }
    getThingThatSelfDescribes() {
        return this.getWrappedDocument().getThingThatSelfDescribes();
    }
    has(thing) {
        return this.getWrappedDocument().has(thing);
    }
    hasThingThatSelfDescribes() {
        return this.getWrappedDocument().hasThingThatSelfDescribes();
    }
    isEmpty() {
        return this.getWrappedDocument().isEmpty();
    }
    toCanonical() {
        return this.getWrappedDocument().toCanonical();
    }
    toStream() {
        return this.getWrappedDocument().toStream();
    }
    [Symbol.iterator]() {
        return this.getWrappedDocument()[Symbol.iterator]();
    }
    getUri() {
        return this.getWrappedDocument().getUri();
    }
    at(index) {
        return this.getWrappedDocument().at(index);
    }
    contains(other) {
        return this.getWrappedDocument().contains(other);
    }
    count(callbackfn) {
        return this.getWrappedDocument().count(callbackfn);
    }
    difference(other) {
        return this.getWrappedDocument().difference(other);
    }
    equals(other) {
        return this.getWrappedDocument().equals(other);
    }
    every(predicate, thisArg) {
        return this.getWrappedDocument().every(predicate);
    }
    filter(predicate) {
        return this.getWrappedDocument().filter(predicate);
    }
    find(predicate, thisArg) {
        return this.getWrappedDocument().find(predicate);
    }
    findIndex(predicate, thisArg) {
        return this.getWrappedDocument().findIndex(predicate);
    }
    forEach(callbackfn, thisArg) {
        return this.getWrappedDocument().forEach(callbackfn);
    }
    includes(searchElement, fromIndex) {
        return this.getWrappedDocument().includes(searchElement);
    }
    indexOf(searchElement, fromIndex) {
        return this.getWrappedDocument().indexOf(searchElement);
    }
    keys() {
        return this.getWrappedDocument().keys();
    }
    map(callbackfn, thisArg) {
        return this.getWrappedDocument().map(callbackfn);
    }
    reduce(callbackfn) {
        return this.getWrappedDocument().reduce(callbackfn);
    }
    slice(start, end) {
        return this.getWrappedDocument().slice(start, end);
    }
    some(predicate, thisArg) {
        return this.getWrappedDocument().some(predicate);
    }
}
export default DocumentDecorated;
//# sourceMappingURL=DocumentDecorated.js.map