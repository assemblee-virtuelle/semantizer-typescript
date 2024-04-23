import StatementImpl from "./StatementImpl.js";
export var ThingType;
(function (ThingType) {
    ThingType[ThingType["ForDescribing"] = 0] = "ForDescribing";
    ThingType[ThingType["Regular"] = 1] = "Regular";
    ThingType[ThingType["Anonymous"] = 2] = "Anonymous";
})(ThingType || (ThingType = {}));
// type ConstructorParams = {
//     uri: string
// }
// type CopyConstructorParams = {
//     other: ThingWritable;
// }
export class ThingImpl {
    constructor(statementImpl, uri) {
        this._statements = [];
        this._statementImpl = statementImpl;
        this._uri = uri !== null && uri !== void 0 ? uri : "";
    }
    _getStatementsInternal() {
        return this._statements;
    }
    _createStatementInternalFrom(other) {
        return new this._statementImpl(other);
    }
    _createStatementInternal(subject, property, value, datatype, language) {
        return new this._statementImpl({ subject, property, value, datatype, language });
    }
    createStatement(property, value, datatype, language) {
        const statement = this._createStatementInternal(this.getUri(), property, value, datatype, language);
        this._getStatementsInternal().push(statement);
        return statement;
    }
    addStatement(other) {
        const statement = this._createStatementInternalFrom(other);
        this._getStatementsInternal().push(statement);
        return statement;
    }
    addStatementAll(others) {
        const results = [];
        for (const other of others) {
            const statement = this.addStatement(other);
            results.push(statement);
        }
        return results;
    }
    deleteStatement(statement) {
        throw new Error("Method not implemented."); //this._statements = this._statements.filter(s => s !== statement);
    }
    setStatement(property, value, oldValue, datatype, language) {
        const statement = this._getStatementInternal(property, language);
        if (statement) {
            statement.setValue(value);
            return this._createStatementInternalFrom(statement);
        }
        return undefined;
    }
    pop() {
        throw new Error("Method not implemented.");
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
    getStatement(property, language) {
        throw new Error("Method not implemented.");
    }
    _getStatementInternal(property, language) {
        return this._getStatementsInternal().find(s => s.getProperty() === property);
    }
    getStatementAll(property, language) {
        throw new Error("Method not implemented.");
    }
    hasStatement(property, language) {
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
    [Symbol.iterator]() {
        return this._statements[Symbol.iterator](); // should make a copy before?
    }
    getUri() {
        return this._uri;
    }
    hasUri() {
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
        const copy = new ThingImpl(this._statementImpl, this._uri); // can't call the polymorphic constructor, this method should be redefined by sub classes.
        copy.addStatementAll(this._statements);
        return copy;
    }
}
export class ThingImplDefault extends ThingImpl {
    constructor(uri) {
        super(StatementImpl, uri);
    }
}
export default ThingImpl;
//# sourceMappingURL=ThingImpl.js.map