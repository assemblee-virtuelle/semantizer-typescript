import rdf from 'rdf-ext';
// states: Local | Distant
// states: Created | Modified | Loaded
export class DocumentDefaultImpl {
    constructor(thingFactory, uri, context) {
        this._thingFactory = thingFactory;
        this._uri = uri !== null && uri !== void 0 ? uri : '';
        this._context = context;
        this._things = [];
        this._selfDescribingThing = null;
    }
    forEach(callbackfn, thisArg) {
        this._getThings().forEach(callbackfn, thisArg);
    }
    map(callbackfn, thisArg) {
        return this._getThings().map(callbackfn, thisArg);
    }
    [Symbol.iterator]() {
        return this._getThings()[Symbol.iterator]();
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
    add(thing) {
        this._things.push(thing);
        return this;
    }
    getThingFactory() {
        return this._thingFactory;
    }
    setThings(things) {
        this._things = things;
    }
    addAndReturnThing(thing) {
        this.add(thing);
        return thing;
    }
    addDocument(document) {
        throw new Error("Method not implemented.");
    }
    equals(other) {
        return this.toRdfDatasetExt().equals(other.toRdfDatasetExt());
    }
    get(uri) {
        const things = this.filter((thing) => thing.getUri() === uri);
        return things.length > 0 ? things[0] : null;
    }
    isUrl(input) {
        return input.startsWith('http') || input.startsWith('#') || input === '';
    }
    generateUriWithFragment() {
        return this.createUriWithFragment(this.generateThingName());
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
        const thing = this.getThingFactory().createThingToDescribeDocument(this);
        this.setThingThatSelfDescribes(thing);
        return thing;
    }
    createThing(nameHintOrUri) {
        const uriOfNewRegularThing = this.validateOrCreateThingUri(nameHintOrUri);
        return this.addAndReturnThing(this.getThingFactory().createThing(this, uriOfNewRegularThing));
    }
    createThingWithoutUri(nameHint) {
        return this.addAndReturnThing(this.validateAndCreateThingWithoutUri(nameHint));
    }
    generateThingName() {
        return "generatedName"; // TODO
    }
    validateOrCreateThingUri(nameHintOrUri) {
        return nameHintOrUri ? this.getSafeUriFromNameHintOrUri(nameHintOrUri) : this.generateUriWithFragment();
    }
    validateNameHintForThingWithoutUri(nameHint) {
        if (this.hasStatementsAbout(`_:${nameHint}`))
            throw new Error(`You are trying to add the anonymous thing "${nameHint}" but it is already part of the document.`);
    }
    validateAndCreateThingWithoutUri(nameHint) {
        if (nameHint)
            this.validateNameHintForThingWithoutUri(nameHint);
        return this.getThingFactory().createThingWithoutUri(this, nameHint);
    }
    delete(thingOrUri) {
        const thing = typeof thingOrUri === 'string' ? this.get(thingOrUri) : thingOrUri;
        if (thing)
            this.setThings(this.filter((filteredThing) => thing.getUri() !== filteredThing.getUri())); // Maybe use equals instead
    }
    getUri() {
        return this._uri;
    }
    setUri(uri) {
        this._uri = uri;
        // compute change in every things
    }
    isEmpty() {
        return this.count() === 0;
    }
    _getThings() {
        return this._things;
    }
    getThingThatSelfDescribes() {
        return this._selfDescribingThing;
    }
    setThingThatSelfDescribes(thing) {
        return this._selfDescribingThing = thing;
    }
    count() {
        return this._getThings().length;
    }
    hasStatementsAbout(subject, property, ...hasValues) {
        const uri = typeof subject === 'string' ? subject : subject.getUri();
        return this._getThings().some(thing => thing.getUri() === uri);
    }
    filter(predicate) {
        return this._getThings().filter(predicate);
    }
    toRdfDatasetExt() {
        const result = rdf.dataset();
        // @ts-ignore
        this._things.forEach(thing => result.addAll(thing.toRdfDatasetExt()));
        return result;
    }
}
export default DocumentDefaultImpl;
//# sourceMappingURL=DocumentDefaultImpl.js.map