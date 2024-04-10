export class DocumentDecorated {
    constructor(wrapped) {
        this._wrapped = wrapped;
    }
    getFactory() {
        return this.getWrappedDocument().getFactory();
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
        return this.getWrappedDocument().createThingToSelfDescribe();
    }
    createThingWithoutUri(nameHint) {
        return this.getWrappedDocument().createThingWithoutUri(nameHint);
    }
    add(thing) {
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
        throw new Error(); //return this.getWrappedDocument().crea
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