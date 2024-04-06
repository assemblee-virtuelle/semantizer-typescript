import ThingFactoryDefaultImpl from "./ThingFactoryDefaultImpl.js";
class DocumentBaseDefaultImpl {
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
}
export class ReadonlyDocumentDefaultImpl extends DocumentBaseDefaultImpl {
    constructor(documentOrUri, context) {
        super(documentOrUri, context);
    }
    toCopy() {
        throw new Error("Method not implemented.");
    }
    toCopyWritable() {
        throw new Error("Method not implemented.");
    }
}
export class DocumentDefaultImpl extends DocumentBaseDefaultImpl {
    //public constructor(uri?: string, context?: Context, thingFactory?: ThingFactory<ContainedThing, SelfDescribingThing>);
    //public constructor(document: DocumentBase<ContainedThing, SelfDescribingThing>);
    constructor(documentOrUri, context, thingFactory) {
        super(documentOrUri, context);
        this._thingFactory = thingFactory !== null && thingFactory !== void 0 ? thingFactory : new ThingFactoryDefaultImpl();
    }
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
    toCopy() {
        throw new Error("Method not implemented.");
    }
    toCopyReadonly() {
        throw new Error("Method not implemented.");
    }
}
export default DocumentDefaultImpl;
//# sourceMappingURL=DocumentDefaultImpl.js.map