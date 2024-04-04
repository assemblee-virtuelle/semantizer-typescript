import ThingFactoryDefaultImpl from "./ThingFactoryDefaultImpl.js";
export class ReadonlyDocumentDefaultImpl {
    //public constructor(uri?: string, context?: Context);
    //public constructor(document: DocumentBase<ContainedThing, SelfDescribingThing>);
    constructor(documentOrUri, context) {
        var _a;
        this._uri = typeof documentOrUri === 'string' ? documentOrUri !== null && documentOrUri !== void 0 ? documentOrUri : '' : (_a = documentOrUri === null || documentOrUri === void 0 ? void 0 : documentOrUri.getUri()) !== null && _a !== void 0 ? _a : '';
        this._context = context;
        this._things = [];
    }
    at(index) {
        return this._getContainedThings().at(index);
    }
    contains(other) {
        return other.every((thing) => this.includes(thing));
    }
    difference(other) {
        throw new Error("Method not implemented.");
    }
    every(predicate, thisArg) {
        return this._getContainedThings().every(predicate);
    }
    find(predicate, thisArg) {
        return this._getContainedThings().find(predicate);
    }
    findIndex(predicate, thisArg) {
        return this._getContainedThings().findIndex(predicate);
    }
    get(uri) {
        // TODO uri or resource.getUri
        const things = this.filter((thing) => thing.getUri() === uri);
        return things.length > 0 ? things[0] : undefined;
    }
    has(uriOrResource) {
        return this.get(uriOrResource) ? true : false;
    }
    hasThingThatSelfDescribes() {
        return this.getThingThatSelfDescribes() !== undefined;
    }
    hasContainedThingThatSelfDescribes() {
        return this.getThingThatSelfDescribes() !== undefined;
    }
    includes(searchElement, fromIndex) {
        return this._getContainedThings().includes(searchElement, fromIndex);
    }
    getUriFromStringOrResource(stringOrResource) {
        return typeof stringOrResource === 'string' ? stringOrResource : stringOrResource.getUri();
    }
    indexOf(searchElement, fromIndex) {
        return this._getContainedThings().indexOf(searchElement, fromIndex);
    }
    keys() {
        return this._getContainedThings().keys();
    }
    reduce(callbackfn) {
        return this._getContainedThings().reduce(callbackfn);
    }
    slice(start, end) {
        throw new Error("Method not implemented."); //return this._getContainedThings().slice(start, end);
    }
    some(predicate, thisArg) {
        return this._getContainedThings().some(predicate);
    }
    toCanonical() {
        throw new Error("Method not implemented.");
    }
    toGenericDocument() {
        const factory = new ThingFactoryDefaultImpl();
        const document = new DocumentDefaultImpl(this._uri, this._context, factory);
        //this.forEach(thing => document.add(thing)); // We should be able to use addAll
        return document;
    }
    toStream() {
        throw new Error("Method not implemented.");
    }
    forEach(callbackfn, thisArg) {
        this._getContainedThings().forEach(callbackfn, thisArg);
    }
    map(callbackfn, thisArg) {
        return this._getContainedThings().map(callbackfn, thisArg);
    }
    [Symbol.iterator]() {
        return this._getContainedThings()[Symbol.iterator]();
    }
    setContext(context) {
        this._context = context;
    }
    getContext() {
        return this._context;
    }
    expand(uri) {
        var _a, _b;
        return (_b = (_a = this.getContext()) === null || _a === void 0 ? void 0 : _a.expand(uri)) !== null && _b !== void 0 ? _b : uri;
    }
    shorten(uri) {
        var _a, _b;
        return (_b = (_a = this.getContext()) === null || _a === void 0 ? void 0 : _a.shorten(uri)) !== null && _b !== void 0 ? _b : uri;
    }
    // TODO: check canonical form
    equals(other) {
        throw new Error("Not implemented.");
    }
    isUrl(input) {
        return input.startsWith('http') || input.startsWith('#') || input === '';
    }
    getUri() {
        return this._uri;
    }
    isEmpty() {
        return this.count() === 0;
    }
    _getContainedThings() {
        return this._things;
    }
    getThingThatSelfDescribes() {
        return this._selfDescribingThing;
    }
    count(callbackfn) {
        return this._getContainedThings().length;
    }
    hasStatementsAbout(subject, property, ...hasValues) {
        const uri = typeof subject === 'string' ? subject : subject.getUri();
        return this._getContainedThings().some(thing => thing.getUri() === uri);
    }
    filter(predicate) {
        return this._getContainedThings().filter(predicate);
    }
    toGenericReadonlyDocument() {
        throw new Error("Method not implemented.");
    }
}
export class DocumentDefaultImpl extends ReadonlyDocumentDefaultImpl {
    constructor(documentOrUri, context, thingFactory) {
        super(documentOrUri, context);
        this._thingFactory = thingFactory !== null && thingFactory !== void 0 ? thingFactory : new ThingFactoryDefaultImpl();
        //this._uri = typeof documentOrUri === 'string'? documentOrUri ?? '': documentOrUri?.getUri() ?? '';
        //this._context = context;
        //this._things = [];
    }
    /*public at(index: number): ContainedThing | undefined {
        return this._getContainedThings().at(index);
    }

    public contains(other: ReadonlyDocument<ContainedThing, SelfDescribingThing>): boolean {
        return other.every((thing: ContainedThing) => this.includes(thing));
    }

    public difference(other: ReadonlyDocument<ContainedThing, SelfDescribingThing>): ReadonlyDocument<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }

    public every(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => boolean, thisArg?: any): boolean {
        return this._getContainedThings().every(predicate);
    }

    public find(predicate: (value: ContainedThing, index: number, obj: ContainedThing[]) => value is ContainedThing, thisArg?: any): ContainedThing | undefined {
        return this._getContainedThings().find(predicate);
    }

    public findIndex(predicate: (value: ContainedThing, index: number, obj: ContainedThing[]) => unknown, thisArg?: any): number {
        return this._getContainedThings().findIndex(predicate);
    }

    public get(uri: string | Resource): ContainedThing | undefined {
        // TODO uri or resource.getUri
        const things = this.filter((thing: ContainedThing) => thing.getUri() === uri);
        return things.length > 0? things[0]: undefined;
    }

    public has(uriOrResource: string | Resource): boolean {
        return this.get(uriOrResource)? true: false;
    }

    public hasThingThatSelfDescribes(): boolean {
        return this.getThingThatSelfDescribes() !== undefined;
    }

    public hasContainedThingThatSelfDescribes(): boolean {
        return this.getThingThatSelfDescribes() !== undefined;
    }

    public includes(searchElement: ContainedThing, fromIndex?: number | undefined): boolean {
        return this._getContainedThings().includes(searchElement, fromIndex);
    }

    protected getUriFromStringOrResource(stringOrResource: string | Resource): string {
        return typeof stringOrResource === 'string'? stringOrResource: stringOrResource.getUri();
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

    public slice(start?: number, end?: number): ReadonlyDocument<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented."); //return this._getContainedThings().slice(start, end);
    }

    public some(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): boolean {
        return this._getContainedThings().some(predicate);
    }

    public toCanonical(): string {
        throw new Error("Method not implemented.");
    }

    public toGenericDocument(): DocumentBase<ContainedThing, SelfDescribingThing> {
        const factory = new ThingFactoryDefaultImpl<ContainedThing, SelfDescribingThing>();
        const document: DocumentBase<ContainedThing, SelfDescribingThing> = new DocumentDefaultImpl<ContainedThing, SelfDescribingThing>(this._uri, this._context, factory);
        //this.forEach(thing => document.add(thing)); // We should be able to use addAll
        return document;
    }

    public toStream(): string {
        throw new Error("Method not implemented.");
    }

    public forEach(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => void, thisArg?: any): void {
        this._getContainedThings().forEach(callbackfn, thisArg);
    }

    public map(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): unknown[] {
        return this._getContainedThings().map(callbackfn, thisArg);
    }
    
    public [Symbol.iterator](): Iterator<ContainedThing> {
        return this._getContainedThings()[Symbol.iterator]();
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

    public getContainedThingFactory(): ThingFactory<ContainedThing, SelfDescribingThing> {
        return this._thingFactory;
    }

    // TODO: check canonical form
    public equals(other: DocumentBase<ContainedThing, SelfDescribingThing>): boolean {
        throw new Error("Not implemented.")
    }

    protected isUrl(input: string): boolean {
        return input.startsWith('http') || input.startsWith('#') || input === '';
    }

    public getUri(): string {
        return this._uri;
    }

    public isEmpty(): boolean {
        return this.count() === 0;
    }

    protected _getContainedThings(): ContainedThing[] {
        return this._things;
    }

    public getThingThatSelfDescribes(): SelfDescribingThing | undefined {
        return this._selfDescribingThing;
    }

    public count(callbackfn?: ((thing: ContainedThing, document?: ReadonlyDocument<ContainedThing, SelfDescribingThing>) => boolean) | undefined): number {
        return this._getContainedThings().length;
    }

    public hasStatementsAbout(subject: string | Resource, property?: string, ...hasValues: string[]): boolean {
        const uri = typeof subject === 'string'? subject: subject.getUri();
        return this._getContainedThings().some(thing => thing.getUri() === uri);
    }

    public filter(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => boolean): ContainedThing[] {
        return this._getContainedThings().filter(predicate);
    }
*/
    getContainedThingFactory() {
        return this._thingFactory;
    }
    // DESTRUCTIVE OPERATIONS
    add(thing) {
        this._getContainedThings().push(thing);
        return this;
    }
    addAll(documentOrThings) {
        documentOrThings.forEach((thing) => this.add(thing));
        // TODO: add thing with new names/uri fo document
        return this;
    }
    delete(thingOrUri) {
        const thing = typeof thingOrUri === 'string' ? this.get(thingOrUri) : thingOrUri;
        if (thing)
            this.setContainedThings(this.filter((filteredContainedThing) => thing.getUri() !== filteredContainedThing.getUri())); // Maybe use equals instead
        return this;
    }
    deleteContext() {
        this._context = undefined;
    }
    deleteMatches(uri, property, value) {
        throw new Error("Method not implemented.");
    }
    pop() {
        return this._getContainedThings().pop();
    }
    reverse() {
        this._getContainedThings().reverse();
    }
    shift() {
        return this._getContainedThings().shift();
    }
    sort(compareFn) {
        this._getContainedThings().sort(compareFn);
        return this;
    }
    splice(start, deleteCount, ...items) {
        throw new Error("Method not implemented.");
    }
    union(other) {
        throw new Error("Method not implemented.");
    }
    setContainedThings(things) {
        this._things = things;
    }
    addAndReturnContainedThing(thing) {
        this.add(thing);
        return thing;
    }
    generateUriWithFragment() {
        return this.createUriWithFragment(this.generateContainedThingName());
    }
    getOrCreateNameWithHash(nameWithOrWithoutHash) {
        return nameWithOrWithoutHash.startsWith('#') ? nameWithOrWithoutHash : `#${nameWithOrWithoutHash}`;
    }
    createUriWithFragment(name) {
        return this.getUri() + this.getOrCreateNameWithHash(name);
    }
    checkUriCanBeAddedToTheDocument(uri) {
        return this.isUrl(uri) && !this.hasStatementsAbout(uri);
    }
    getSafeUriFromUri(uri) {
        if (!this.checkUriCanBeAddedToTheDocument(uri))
            throw new Error(`You are trying to add the thing "${uri}" but it is already part of the document.`);
        return uri;
    }
    getSafeUriFromName(name) {
        const uri = this.createUriWithFragment(name);
        if (!this.checkUriCanBeAddedToTheDocument(uri))
            throw new Error(`You are trying to add the thing "${uri}" but it is already part of the document.`);
        return uri;
    }
    getSafeUriFromNameHintOrUri(nameHintOrUri) {
        return this.isUrl(nameHintOrUri) ? this.getSafeUriFromUri(nameHintOrUri) : this.getSafeUriFromName(nameHintOrUri);
    }
    createThingToSelfDescribe() {
        const thing = this.getContainedThingFactory().createThingToDescribeDocument(this);
        this.setThingThatSelfDescribes(thing);
        return thing;
    }
    createThingWithUri(nameHintOrUri) {
        const uriOfNewRegularContainedThing = this.validateOrCreateContainedThingUri(nameHintOrUri);
        return this.addAndReturnContainedThing(this.getContainedThingFactory().createThing(this, uriOfNewRegularContainedThing));
    }
    createThingWithoutUri(nameHint) {
        return this.addAndReturnContainedThing(this.validateAndCreateContainedThingWithoutUri(nameHint));
    }
    generateContainedThingName() {
        return "generatedName"; // TODO
    }
    validateOrCreateContainedThingUri(nameHintOrUri) {
        return nameHintOrUri ? this.getSafeUriFromNameHintOrUri(nameHintOrUri) : this.generateUriWithFragment();
    }
    validateNameHintForContainedThingWithoutUri(nameHint) {
        if (this.hasStatementsAbout(`_:${nameHint}`))
            throw new Error(`You are trying to add the anonymous thing "${nameHint}" but it is already part of the document.`);
    }
    validateAndCreateContainedThingWithoutUri(nameHint) {
        if (nameHint)
            this.validateNameHintForContainedThingWithoutUri(nameHint);
        return this.getContainedThingFactory().createThingWithoutUri(this, nameHint);
    }
    setUri(uri) {
        this._uri = uri;
        // compute change in every things
    }
    setThingThatSelfDescribes(thing) {
        return this._selfDescribingThing = thing;
    }
    toGenericDocument() {
        throw new Error("Method not implemented.");
    }
}
export default DocumentDefaultImpl;
//# sourceMappingURL=DocumentDefaultImpl.js.map