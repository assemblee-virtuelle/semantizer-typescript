//type DocumentType = Document<ThingImpl<StatementImpl>, ThingImpl<StatementImpl>>;
export class StatementImpl {
    constructor(thing, subject, value, datatype, language) {
        this._thing = thing;
        this._subject = subject;
        this._value = typeof value === 'string' ? value : value.getUri();
        this._datatype = typeof datatype === 'string' ? datatype : datatype === null || datatype === void 0 ? void 0 : datatype.getUri();
        this._language = language;
    }
    toCopy() {
        throw new Error("Method not implemented.");
    }
    setValue() {
        throw new Error("Method not implemented.");
    }
    setDatatype() {
        throw new Error("Method not implemented.");
    }
    setLanguage() {
        throw new Error("Method not implemented.");
    }
    toCopyReadonly() {
        throw new Error("Method not implemented.");
    }
    toCopyWritable() {
        throw new Error("Method not implemented.");
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
export default StatementImpl;
//# sourceMappingURL=StatementImpl.js.map