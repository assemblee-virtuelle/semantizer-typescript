import ThingStateRdfjsRegular from "./ThingStateRdfjsRegular.js";
import ThingStateRdfjsAnonymous from "./ThingStateRdfjsAnonymous.js";
export var ThingType;
(function (ThingType) {
    ThingType[ThingType["ForDescribing"] = 0] = "ForDescribing";
    ThingType[ThingType["Regular"] = 1] = "Regular";
    ThingType[ThingType["Anonymous"] = 2] = "Anonymous";
})(ThingType || (ThingType = {}));
export class ThingDefaultImpl {
    // TODO: add copy constructor
    constructor(document, stateType, uriOrNameHint) {
        this._document = document;
        switch (stateType) {
            case ThingType.Regular:
                if (!uriOrNameHint)
                    throw new Error();
                this._state = new ThingStateRdfjsRegular(this, uriOrNameHint);
                break;
            case ThingType.Anonymous:
                if (uriOrNameHint === null || uriOrNameHint === void 0 ? void 0 : uriOrNameHint.startsWith('http'))
                    throw new Error("You are trying to create an anonymous thing with an URI but anonymous thing can not have an URI. Please pass a name hint instead or leave it undefined.");
                this._state = new ThingStateRdfjsAnonymous(this, uriOrNameHint);
                break;
            case ThingType.ForDescribing:
                this._state = new ThingStateRdfjsRegular(this, document.getUri());
                break;
        }
    }
    getState() {
        return this._state;
    }
    isAnonymous() {
        return this.getState().isAnonymous();
    }
    getUri() {
        return this.getState().getUri();
    }
    setUri(uri) {
        // Todo: change state
        // Todo: change dataset
    }
    getContext() {
        return this.getDocument().getContext();
    }
    expand(uri) {
        return this.getDocument().expand(uri);
    }
    shorten(uri) {
        return this.getDocument().shorten(uri);
    }
    filter(by) {
        throw new Error("Method not implemented.");
    }
    equals(other) {
        return this.getState().equals(other);
    }
    toRdfDatasetExt() {
        return this.getState().toRdfDatasetExt();
    }
    ////////////// Adder //////////////
    addStatement(about, value, datatype, language) {
        return this.getState().addStatement(about, value, datatype, language);
    }
    addStatementFrom(source) {
        throw new Error("Method not implemented.");
    }
    addRdfTypeStatement(value) {
        return this.addStatement("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", value);
    }
    addBooleanStatement(about, value) {
        return this.addStatement(about, value.toString(), "xsd:boolean");
    }
    addStringStatement(about, value, locale) {
        return this.addStatement(about, value, "xsd:string", locale);
    }
    addDecimalStatement(about, value) {
        return this.addStatement(about, value.toString(), "xsd:decimal");
    }
    addIntegerStatement(about, value) {
        return this.addStatement(about, value.toString(), "xsd:integer");
    }
    addDateStatement(about, value) {
        return this.addStatement(about, value.toString(), "xsd:date");
    }
    addDatetimeStatement(about, value) {
        return this.addStatement(about, value.toString(), "xsd:datetime");
    }
    addTimeStatement(about, value) {
        return this.addStatement(about, value.toString(), "xsd:time");
    }
    ////////////// Getters //////////////
    getAllValuesAboutStatement(property) {
        return this.getState().getAllValuesAboutStatement(property);
    }
    getDocument() {
        return this._document;
    }
    getRdfTypeValue() {
        const values = this.getAllRdfTypeValues();
        return values.length >= 1 ? values[0] : null;
    }
    getAllRdfTypeValues() {
        return this.getAllValuesAboutStatement("http://www.w3.org/1999/02/22-rdf-syntax-ns#type");
    }
    getBooleanStatementValue(about) {
        throw new Error("Method not implemented.");
    }
    getAllBooleanStatementValues(about) {
        throw new Error("Method not implemented.");
    }
    getStringStatementValue(about) {
        const values = this.getAllStringStatementValues(about);
        return values.length >= 1 ? values[0] : null;
    }
    getAllStringStatementValues(about) {
        return this.getAllValuesAboutStatement(about);
    }
    getDecimalStatementValue(about) {
        throw new Error("Method not implemented.");
    }
    getAllDecimalStatementValues(about) {
        throw new Error("Method not implemented.");
    }
    getIntegerStatementValue(about) {
        throw new Error("Method not implemented.");
    }
    getAllIntegerStatementValues(about) {
        throw new Error("Method not implemented.");
    }
    getDateStatementValue(about) {
        throw new Error("Method not implemented.");
    }
    getAllDateStatementValues(about) {
        throw new Error("Method not implemented.");
    }
    getDatetimeStatementValue(about) {
        throw new Error("Method not implemented.");
    }
    getAllDatetimeStatementValues(about) {
        throw new Error("Method not implemented.");
    }
    getTimeStatementValue(about) {
        throw new Error("Method not implemented.");
    }
    getAllTimeStatementValues(about) {
        throw new Error("Method not implemented.");
    }
    ////////////// Setters //////////////
    setRdfTypeStatement(value) {
        throw new Error("Method not implemented.");
    }
    setBooleanStatement(about, value) {
        throw new Error("Method not implemented.");
    }
    setStringStatement(about, value, locale) {
        throw new Error("Method not implemented.");
    }
    setDecimalStatement(about, value) {
        throw new Error("Method not implemented.");
    }
    setIntegerStatement(about, value) {
        throw new Error("Method not implemented.");
    }
    setDateStatement(about, value) {
        throw new Error("Method not implemented.");
    }
    setDatetimeStatement(about, value) {
        throw new Error("Method not implemented.");
    }
    setTimeStatement(about, value) {
        throw new Error("Method not implemented.");
    }
    ////////////// Removers //////////////
    removeAllStatements(about) {
        throw new Error("Method not implemented.");
    }
    removeRdfTypeStatement(value) {
        throw new Error("Method not implemented.");
    }
    removeBooleanStatement(about, value) {
        throw new Error("Method not implemented.");
    }
    removeStringStatement(about, value, locale) {
        throw new Error("Method not implemented.");
    }
    removeDecimalStatement(about, value) {
        throw new Error("Method not implemented.");
    }
    removeIntegerStatement(about, value) {
        throw new Error("Method not implemented.");
    }
    removeDateStatement(about, value) {
        throw new Error("Method not implemented.");
    }
    removeDatetimeStatement(about, value) {
        throw new Error("Method not implemented.");
    }
    removeTimeStatement(about, value) {
        throw new Error("Method not implemented.");
    }
}
export default ThingDefaultImpl;
//# sourceMappingURL=ThingDefaultImpl.js.map