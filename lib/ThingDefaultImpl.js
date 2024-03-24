import rdf from 'rdf-ext';
class ThingDefaultImpl {
    constructor(uri, context) {
        this._uri = uri;
        this._rdfjsDataset = rdf.dataset();
        this._context = context;
    }
    getUri() {
        return this._uri;
    }
    setUri(uri) {
        this._uri = uri;
        // Todo: change dataset
    }
    setContext(context) {
        this._context = context;
    }
    getContext() {
        return this._context;
    }
    expand(uri) {
        var _a, _b;
        return (_b = (_a = this.getContext()) === null || _a === void 0 ? void 0 : _a.expand(uri)) !== null && _b !== void 0 ? _b : uri;
    }
    shorten(uri) {
        var _a, _b;
        return (_b = (_a = this.getContext()) === null || _a === void 0 ? void 0 : _a.shorten(uri)) !== null && _b !== void 0 ? _b : uri;
    }
    filter(by) {
        throw new Error("Method not implemented.");
    }
    getDataset() {
        return this._rdfjsDataset;
    }
    addRdfQuad(quad) {
        this.getDataset().add(quad);
    }
    createRdfQuad(property, value, languageOrDatatype) {
        let object = typeof value === 'string' ? rdf.literal(value) : rdf.namedNode(value.getUri());
        return rdf.quad(rdf.namedNode(this.getUri()), rdf.namedNode(this.expand(property)), object // or blank node
        );
    }
    ////////////// Adder //////////////
    addStatement(about, value, datatype, language) {
        const languageOrDatatype = language ? language : datatype ? rdf.namedNode(datatype) : undefined;
        this.addRdfQuad(this.createRdfQuad(about, value, languageOrDatatype));
        return this;
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
        const iteratee = (r, q) => {
            if (q.predicate.value === this.expand(property))
                r.push(this.shorten(q.object.value));
            return r;
        };
        return this.getDataset().reduce(iteratee, []);
    }
    getDocument() {
        throw new Error("Method not implemented.");
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