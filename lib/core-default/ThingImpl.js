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
    constructor() {
        this._uri = "thingUri"; //uriOrNameHint ?? '';
        // this._document = document;
        this._statements = [];
    }
    getStatementsInternal() {
        return this._statements;
    }
    createStatement(property, value, datatype, language) {
        const statement = new StatementImpl({ subject: this.getUri(), property, value, datatype, language });
        this.getStatementsInternal().push(statement);
        return statement;
    }
    addStatement(other) {
        const statement = new StatementImpl(other);
        this.getStatementsInternal().push(statement);
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
        const statement = this._getStatement(property, language);
        if (statement) {
            statement.setValue(value);
            return new StatementImpl(statement);
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
    _getStatement(property, language) {
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
export default ThingImpl;
//# sourceMappingURL=ThingImpl.js.map