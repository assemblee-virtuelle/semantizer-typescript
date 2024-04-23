import StatementImpl from "./StatementImpl.js";
export var ThingType;
(function (ThingType) {
    ThingType[ThingType["ForDescribing"] = 0] = "ForDescribing";
    ThingType[ThingType["Regular"] = 1] = "Regular";
    ThingType[ThingType["Anonymous"] = 2] = "Anonymous";
})(ThingType || (ThingType = {}));
// export type StatementConstructor<
//     StatementType extends Statement = Statement,
// > = new (about: string, property: string, value: string, datatype?: string, language?: string) => StatementType;
export class ThingImpl {
    // TODO: add copy constructor
    constructor(statementImpl) {
        this._uri = "thingUri"; //uriOrNameHint ?? '';
        // this._document = document;
        this._statementImpl = statementImpl;
        this._statements = [];
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
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }
}
export class ThingImplDefault extends ThingImpl {
    constructor() {
        super(StatementImpl);
    }
}
export class ThingImplCustom extends ThingImpl {
    constructor(statementImpl) {
        super(statementImpl);
    }
}
export default ThingImpl;
//# sourceMappingURL=ThingImpl.js.map