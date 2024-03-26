import ThingStateRdfjsRegular from "./ThingStateRdfjsRegular.js";
import ThingStateRdfjsAnonymous from "./ThingStateRdfjsAnonymous.js";
var StateType;
(function (StateType) {
    StateType[StateType["ForDescribing"] = 0] = "ForDescribing";
    StateType[StateType["Regular"] = 1] = "Regular";
    StateType[StateType["Anonymous"] = 2] = "Anonymous";
})(StateType || (StateType = {}));
class ThingDefaultImpl {
    static createThingToDescribeDocument(document) {
        return new ThingDefaultImpl(document, StateType.ForDescribing);
    }
    static createThing(document, uri) {
        return new ThingDefaultImpl(document, StateType.Regular, uri);
    }
    static createThingWithoutUri(document, nameHint) {
        if (nameHint === null || nameHint === void 0 ? void 0 : nameHint.startsWith('http'))
            throw new Error("You are trying to create an anonymous thing with an URI but anonymous thing can not have an URI. Please pass a name hint instead or leave it undefined.");
        return new ThingDefaultImpl(document, StateType.Anonymous, nameHint);
    }
    constructor(document, stateType, uri) {
        this._document = document;
        switch (stateType) {
            case StateType.Regular:
                if (!uri)
                    throw new Error();
                this._state = new ThingStateRdfjsRegular(this, uri);
                break;
            case StateType.Anonymous:
                this._state = new ThingStateRdfjsAnonymous(this, uri);
                break;
            case StateType.ForDescribing:
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