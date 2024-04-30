export class StatementImpl {
    constructor(params) {
        this._subject = 'subject' in params ? params.subject : params.getSubject();
        this._property = 'subject' in params ? params.property : params.getProperty();
        this._value = 'subject' in params ? params.value : params.getValue();
        this._datatype = 'subject' in params ? params.datatype : params.getDatatype();
        this._language = 'subject' in params ? params.language : params.getLanguage();
    }
    getUri() {
        throw new Error("Method not implemented.");
    }
    hasUri() {
        throw new Error("Method not implemented.");
    }
    setProperty(property) {
        this._property = property;
        return this;
    }
    getProperty() {
        return this._property;
    }
    setValue(value) {
        this._value = value;
        return this;
    }
    setSubject(subject) {
        throw new Error("Method not implemented.");
    }
    setDatatype() {
        throw new Error("Method not implemented.");
    }
    setLanguage() {
        throw new Error("Method not implemented.");
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
    toCopy() {
        return new StatementImpl(this);
    }
}
export default StatementImpl;
//# sourceMappingURL=StatementImpl.js.map