export var ThingType;
(function (ThingType) {
    ThingType[ThingType["ForDescribing"] = 0] = "ForDescribing";
    ThingType[ThingType["Regular"] = 1] = "Regular";
    ThingType[ThingType["Anonymous"] = 2] = "Anonymous";
})(ThingType || (ThingType = {}));
export class ThingImpl {
    // TODO: add copy constructor
    constructor(document, stateType, uriOrNameHint) {
        this._uri = uriOrNameHint !== null && uriOrNameHint !== void 0 ? uriOrNameHint : '';
        this._document = document;
        this._statements = [];
        // TODO use factory
    }
    toCopy() {
        return this;
    }
    createStatement(about, value, datatype, language) {
        const statement = this.getDocument().getFactory().createStatement(this, about, value, datatype, language);
        this._getStatements().push(statement);
        return this; // as StatementOf<DocumentType>;
    }
    add(statement) {
        // TODO: set thing of statement
        // this._getStatements().push(statement);
        return this;
    }
    set(about, value, oldValue, ContainedStatement, language) {
        throw new Error("Method not implemented.");
    }
    remove(about, value, ContainedStatement, language) {
        throw new Error("Method not implemented.");
    }
    removeAll(about) {
        throw new Error("Method not implemented.");
    }
    toCopyReadonly() {
        throw new Error("Method not implemented.");
    }
    toCopyWritable() {
        throw new Error("Method not implemented.");
    }
    getDocument() {
        return this._document;
    }
    count() {
        return this._getStatements().length;
    }
    isEmpty() {
        return this._getStatements().length === 0;
    }
    [Symbol.iterator]() {
        return this._getStatements()[Symbol.iterator]();
    }
    forEach(callbackfn, thisArg) {
        this._getStatements().forEach(callbackfn, thisArg);
    }
    map(callbackfn, thisArg) {
        return this._getStatements().map(callbackfn);
    }
    filter(predicate) {
        return this._getStatements().filter(predicate);
    }
    _getStatements() {
        return this._statements;
    }
    hasUri() {
        return this.getUri() !== '';
    }
    getUri() {
        return this._uri;
    }
    setUri(uri) {
        // Todo: change state
        // Todo: change dataset
    }
    getContext() {
        return this.getDocument().getContext();
    }
    /*public expand(uri: string): string {
        return this.getDocument().expand(uri);
    }

    public shorten(uri: string): string {
        return this.getDocument().shorten(uri);
    }*/
    equals(other) {
        throw new Error("Not implemented.");
    }
    get(property) {
        throw new Error("Method not implemented.");
    }
    getAll(property) {
        throw new Error("Method not implemented.");
    }
}
export default ThingImpl;
//# sourceMappingURL=ThingImpl.js.map