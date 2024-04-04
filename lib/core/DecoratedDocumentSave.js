export class DecoratedDocument {
    constructor(document) {
        this._document = document;
    }
    get(uri) {
        return this._document.get(uri);
    }
    getContext() {
        return this._document.getContext();
    }
    getThingThatSelfDescribes() {
        return this._document.getThingThatSelfDescribes();
    }
    has(thing) {
        return this._document.has(thing);
    }
    hasThingThatSelfDescribes() {
        return this._document.hasThingThatSelfDescribes();
    }
    isEmpty() {
        return this._document.isEmpty();
    }
    toCanonical() {
        return this._document.toCanonical();
    }
    toGenericDocument() {
        return this._document.toGenericDocument();
    }
    toStream() {
        return this._document.toStream();
    }
    [Symbol.iterator]() {
        return this._document[Symbol.iterator]();
    }
    getUri() {
        return this._document.getUri();
    }
    at(index) {
        return this._document.at(index);
    }
    contains(other) {
        return this._document.contains(other);
    }
    count(callbackfn) {
        return this._document.count(callbackfn);
    }
    difference(other) {
        return this._document.difference(other);
    }
    equals(other) {
        return this._document.equals(other);
    }
    every(predicate, thisArg) {
        return this._document.every(predicate);
    }
    filter(predicate) {
        return this._document.filter(predicate);
    }
    find(predicate, thisArg) {
        return this._document.find(predicate);
    }
    findIndex(predicate, thisArg) {
        return this._document.findIndex(predicate);
    }
    forEach(callbackfn, thisArg) {
        return this._document.forEach(callbackfn);
    }
    includes(searchElement, fromIndex) {
        return this._document.includes(searchElement);
    }
    indexOf(searchElement, fromIndex) {
        return this._document.indexOf(searchElement, fromIndex);
    }
    keys() {
        return this._document.keys();
    }
    map(callbackfn, thisArg) {
        return this._document.map(callbackfn);
    }
    reduce(callbackfn) {
        return this._document.reduce(callbackfn);
    }
    slice(start, end) {
        return this._document.slice(start, end);
    }
    some(predicate, thisArg) {
        return this._document.some(predicate);
    }
    add(thing) {
        return this._document.add(thing);
    }
    addAll(documentOrThings) {
        return this._document.addAll(documentOrThings);
    }
    createThingToSelfDescribe() {
        return this._document.createThingToSelfDescribe();
    }
    createThingWithUri(nameHintOrUri) {
        return this._document.createThingWithUri(nameHintOrUri);
    }
    createThingWithoutUri(nameHint) {
        return this._document.createThingWithoutUri(nameHint);
    }
    delete(thingOrUri) {
        return this._document.delete(thingOrUri);
    }
    deleteContext() {
        return this._document.deleteContext();
    }
    deleteMatches(uri, property, value) {
        return this._document.deleteMatches(uri, property, value);
    }
    pop() {
        return this._document.pop();
    }
    reverse() {
        return this._document.reverse();
    }
    setContext(context) {
        return this._document.setContext(context);
    }
    shift() {
        return this._document.shift();
    }
    sort(compareFn) {
        return this._document.sort(compareFn);
    }
    splice(start, deleteCount, ...items) {
        return this._document.splice(start, deleteCount, ...items);
    }
    union(other) {
        return this._document.union(other);
    }
}
export default DecoratedDocument;
//# sourceMappingURL=DecoratedDocumentSave.js.map