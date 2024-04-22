export class StatementImpl {
    constructor(params) {
        this._subject = 'subject' in params ? params.subject : params.getSubject();
        this._property = 'subject' in params ? params.property : params.getProperty();
        this._value = 'subject' in params ? params.value : params.getValue();
        this._datatype = 'subject' in params ? params.datatype : params.getDatatype();
        this._language = 'subject' in params ? params.language : params.getLanguage();
    }
    setProperty(property) {
        this._property = property;
        return this;
    }
    getProperty() {
        return this._property;
    }
    // getOwner(): ThingType {
    //     throw new Error("Method not implemented.");
    // }
    // equals(other: Statement<ThingType>): boolean {
    //     throw new Error("Method not implemented.");
    // }
    // difference(other: Statement<ThingType>): Statement<ThingType> {
    //     throw new Error("Method not implemented.");
    // }
    // public toCopy(): this {
    //     throw new Error("Method not implemented.");
    // }
    setValue() {
        throw new Error("Method not implemented.");
    }
    setDatatype() {
        throw new Error("Method not implemented.");
    }
    setLanguage() {
        throw new Error("Method not implemented.");
    }
    // public toCopyReadonly(): StatementOf<ThingType> {
    //     throw new Error("Method not implemented.");
    // }
    // public toCopyWritable(): StatementOf<ThingType> {
    //     throw new Error("Method not implemented.");
    // }
    // public getThing(): ThingType {
    //     return this._thing;
    // }
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