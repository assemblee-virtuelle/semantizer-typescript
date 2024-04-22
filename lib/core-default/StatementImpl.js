export class StatementImpl {
    constructor(/*thing: ThingType, */ subject, property, value, datatype, language) {
        //this._thing = thing;
        this._subject = subject;
        this._property = property;
        this._value = value; //typeof value === 'string'? value: value.getUri();
        this._datatype = datatype; //typeof datatype === 'string'? datatype: datatype?.getUri();
        this._language = language;
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