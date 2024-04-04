import rdf from 'rdf-ext';
export class DocumentDefaultImpl {
    constructor(uri, context) {
        this._dataset = rdf.dataset();
    }
    at(index) {
        throw new Error('Method not implemented.');
    }
    add(thing) {
        throw new Error('Method not implemented.');
    }
    addAll(document) {
        throw new Error('Method not implemented.');
    }
    contains(other) {
        throw new Error('Method not implemented.');
    }
    count(callbackfn) {
        throw new Error('Method not implemented.');
    }
    createLocalCopy() {
        throw new Error('Method not implemented.');
    }
    createThingToSelfDescribe() {
        throw new Error('Method not implemented.');
    }
    createThingWithUri(nameHintOrUri) {
        throw new Error('Method not implemented.');
    }
    createThingWithoutUri(nameHint) {
        throw new Error('Method not implemented.');
    }
    delete(thingOrUri) {
        throw new Error('Method not implemented.');
    }
    deleteContext() {
        throw new Error('Method not implemented.');
    }
    deleteMatches(uri, property, value) {
        throw new Error('Method not implemented.');
    }
    difference(other) {
        throw new Error('Method not implemented.');
    }
    equals(other) {
        throw new Error('Method not implemented.');
    }
    every(predicate, thisArg) {
        throw new Error('Method not implemented.');
    }
    filter(predicate) {
        throw new Error('Method not implemented.');
    }
    find(predicate, thisArg) {
        throw new Error('Method not implemented.');
    }
    findIndex(predicate, thisArg) {
        throw new Error('Method not implemented.');
    }
    forEach(callbackfn, thisArg) {
        throw new Error('Method not implemented.');
    }
    get(uri) {
        throw new Error('Method not implemented.');
    }
    getContext() {
        throw new Error('Method not implemented.');
    }
    getThingThatSelfDescribes() {
        throw new Error('Method not implemented.');
    }
    has(thing) {
        throw new Error('Method not implemented.');
    }
    hasThingThatSelfDescribes() {
        throw new Error('Method not implemented.');
    }
    includes(searchElement, fromIndex) {
        throw new Error('Method not implemented.');
    }
    indexOf(searchElement, fromIndex) {
        throw new Error('Method not implemented.');
    }
    isEmpty() {
        throw new Error('Method not implemented.');
    }
    isLocal() {
        throw new Error('Method not implemented.');
    }
    isDistant() {
        throw new Error('Method not implemented.');
    }
    keys() {
        throw new Error('Method not implemented.');
    }
    map(callbackfn, thisArg) {
        throw new Error('Method not implemented.');
    }
    pop() {
        throw new Error('Method not implemented.');
    }
    reduce(callbackfn) {
        throw new Error('Method not implemented.');
    }
    reverse() {
        throw new Error('Method not implemented.');
    }
    setContext(context) {
        throw new Error('Method not implemented.');
    }
    shift() {
        throw new Error('Method not implemented.');
    }
    slice(start, end) {
        throw new Error('Method not implemented.');
    }
    some(predicate, thisArg) {
        throw new Error('Method not implemented.');
    }
    sort(compareFn) {
        throw new Error('Method not implemented.');
    }
    splice(start, deleteCount, ...items) {
        throw new Error('Method not implemented.');
    }
    toCanonical() {
        throw new Error('Method not implemented.');
    }
    toGenericDocument() {
        throw new Error('Method not implemented.');
    }
    toStream() {
        throw new Error('Method not implemented.');
    }
    union(other) {
        throw new Error('Method not implemented.');
    }
    getUri() {
        throw new Error('Method not implemented.');
    }
    setUri(uri) {
        throw new Error('Method not implemented.');
    }
    [Symbol.iterator]() {
        throw new Error('Method not implemented.');
    }
    toRdfjsDataset() {
        return this._dataset.clone();
    }
}
export default DocumentDefaultImpl;
//# sourceMappingURL=DocumentDefaultImpl.js.map