export function ThingWithHelpersMixin(Base) {
    return class Helpers extends Base {
        ////////////// Adder //////////////
        addStatement(about, value, datatype, language) {
            return this.addStatement(about, value, datatype, language);
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
        getRdfTypeValue() {
            const values = this.getAllRdfTypeValues();
            return values.length >= 1 ? values[0] : null;
        }
        getAllRdfTypeValues() {
            return this.getStatementAll("http://www.w3.org/1999/02/22-rdf-syntax-ns#type");
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
            return this.getStatementAll(about);
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
        setStatement(about, value) {
            throw new Error("Method not implemented.");
        }
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
        removeStatement(about, value, datatype, language) {
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
    };
}
export default ThingWithHelpersMixin;
//# sourceMappingURL=ThingWithHelpersMixin.js.map