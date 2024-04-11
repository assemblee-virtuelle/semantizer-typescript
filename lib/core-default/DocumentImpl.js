export class DocumentImpl {
    //public constructor(uri?: string, context?: Context);
    //public constructor(document: DocumentBase<ContainedThing<Wrapped>, SelfDescribingThing<Wrapped>>);
    constructor(factory /*TODO: add constraint to this type */) {
        this._uri = ""; //typeof documentOrUri === 'string'? documentOrUri ?? '': documentOrUri?.getUri() ?? '';
        this._context = undefined; //context;
        this._things = [];
        this._factory = factory; //new FactoryImpl<DocumentImpl<ContainedThing, SelfDescribingThing>>();
    }
    getFactoryForCopying() {
        throw new Error("Method not implemented.");
    }
    getFactory() {
        return this._factory;
    }
    toCopy() {
        //throw new Error("Method not implemented.");
        const copy = new DocumentImpl(this._factory);
        copy._uri = this._uri;
        return copy;
    }
    toCopyReadonly() {
        return this.getFactoryForCopying().createDocument(this);
    }
    createThingToSelfDescribe() {
        const thing = this.getFactory().createThingToDescribeDocument(this);
        this._selfDescribingThing = thing;
        return thing;
    }
    createThingWithoutUri(nameHint) {
        return this.getFactory().createThingWithoutUri(this);
    }
    add(thing) {
        this._getContainedThings().push(thing);
        return this;
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
        this._context = context;
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
    addAndReturnContainedThing(thing) {
        this.add(thing);
        return thing;
    }
    generateContainedThingName() {
        return "generatedName"; // TODO
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
    validateOrCreateContainedThingUri(nameHintOrUri) {
        return nameHintOrUri ? this.getSafeUriFromNameHintOrUri(nameHintOrUri) : this.generateUriWithFragment();
    }
    createThingWithUri(nameHintOrUri) {
        const uriOfNewRegularContainedThing = this.validateOrCreateContainedThingUri(nameHintOrUri);
        return this.addAndReturnContainedThing(this.getFactory().createThing(this, uriOfNewRegularContainedThing));
    }
    // TODO: move to utils class?
    isUrl(input) {
        return input.startsWith('http') || input.startsWith('#') || input === '';
    }
    hasStatementsAbout(subject, property, ...hasValues) {
        const uri = typeof subject === 'string' ? subject : subject.getUri();
        return this._getContainedThings().some(thing => thing.getUri() === uri);
    }
    _getContainedThings() {
        return this._things;
    }
    count(callbackfn) {
        return this._things.length;
    }
    get(uri) {
        // TODO uri or resource.getUri
        const things = this._things.filter((thing) => thing.getUri() === uri);
        return things.length > 0 ? things[0] : undefined;
    }
    getContext() {
        return this._context;
    }
    getThingThatSelfDescribes() {
        return this._selfDescribingThing;
    }
    has(uriOrResource) {
        return this.get(uriOrResource) ? true : false;
    }
    hasThingThatSelfDescribes() {
        return this.getThingThatSelfDescribes() !== undefined;
    }
    getUri() {
        return this._uri;
    }
    isEmpty() {
        return this.count() === 0;
    }
    toCanonical() {
        throw new Error("Method not implemented.");
    }
    toStream() {
        throw new Error("Method not implemented.");
    }
    [Symbol.iterator]() {
        return this._things[Symbol.iterator]();
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
    includes(searchElement, fromIndex) {
        return this._getContainedThings().includes(searchElement, fromIndex);
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
        throw new Error("Method not implemented.");
        // const things = this._getContainedThings().slice(start, end);
        // const sliced = new DocumentImpl<ContainedThing, SelfDescribingThing>();
        // sliced._things = things;
        // return sliced as this;
    }
    some(predicate, thisArg) {
        return this._getContainedThings().some(predicate);
    }
    forEach(callbackfn, thisArg) {
        this._getContainedThings().forEach(callbackfn, thisArg);
    }
    map(callbackfn, thisArg) {
        return this._getContainedThings().map(callbackfn, thisArg);
    }
    // TODO: check canonical form
    equals(other) {
        throw new Error("Not implemented.");
    }
    filter(predicate) {
        return this._getContainedThings().filter(predicate);
    }
}
export class DocumentImplReadonly {
    constructor(document) {
        // execute copy code
    }
    get(uri) {
        throw new Error("Method not implemented.");
    }
    getContext() {
        throw new Error("Method not implemented.");
    }
    getThingThatSelfDescribes() {
        throw new Error("Method not implemented.");
    }
    has(thing) {
        throw new Error("Method not implemented.");
    }
    hasThingThatSelfDescribes() {
        throw new Error("Method not implemented.");
    }
    isEmpty() {
        throw new Error("Method not implemented.");
    }
    toCanonical() {
        throw new Error("Method not implemented.");
    }
    toStream() {
        throw new Error("Method not implemented.");
    }
    toCopy() {
        throw new Error("Method not implemented.");
    }
    [Symbol.iterator]() {
        throw new Error("Method not implemented.");
    }
    getUri() {
        throw new Error("Method not implemented.");
    }
    getFactoryForCopying() {
        throw new Error("Method not implemented.");
    }
    at(index) {
        throw new Error("Method not implemented.");
    }
    contains(other) {
        throw new Error("Method not implemented.");
    }
    count(callbackfn) {
        throw new Error("Method not implemented.");
    }
    difference(other) {
        throw new Error("Method not implemented.");
    }
    equals(other) {
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
    toCopyWritable() {
        throw new Error("Method not implemented.");
    }
}
export default DocumentImpl;
//# sourceMappingURL=DocumentImpl.js.map