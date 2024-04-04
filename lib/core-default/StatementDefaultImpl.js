export class StatementDefaultImpl {
    constructor(thing, subject, value, datatype, language) {
        this._thing = thing;
        this._subject = subject;
        this._value = typeof value === 'string' ? value : value.getUri();
        this._datatype = typeof datatype === 'string' ? datatype : datatype === null || datatype === void 0 ? void 0 : datatype.getUri();
        this._language = language;
    }
    getThing() {
        return this._thing;
    }
    getSubject() {
        return this._subject;
    }
    getValue() {
        return this._value;
    }
    getDatatype() {
        return this._datatype;
    }
    getLanguage() {
        return this._language;
    }
}
export default StatementDefaultImpl;
//# sourceMappingURL=StatementDefaultImpl.js.map