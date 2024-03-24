import rdf from 'rdf-ext';
export default class DocumentDefault {
    static load(semantizer, rdfDataset) {
        return new DocumentDefault({ semantizer, rdfDataset });
    }
    /**
     *
     * @param semantizer
     * @param parameters semanticId = uri or name of blank node
     * @returns
     */
    static create(semantizer, parameters) {
        return new DocumentDefault({
            semantizer,
            semanticId: parameters === null || parameters === void 0 ? void 0 : parameters.semanticId,
            semanticType: parameters === null || parameters === void 0 ? void 0 : parameters.semanticType,
            resources: parameters === null || parameters === void 0 ? void 0 : parameters.semanticContainedResource
        });
    }
    constructor(parameters) {
        var _a;
        this._semantizer = parameters.semantizer;
        this._semanticId = (_a = parameters.semanticId) !== null && _a !== void 0 ? _a : "";
        // Load
        if (parameters.rdfDataset) {
            this._rdfDataset = parameters.rdfDataset;
        }
        // Create
        else {
            this._rdfDataset = rdf.dataset();
            if (parameters.semanticType) {
                const semanticTypes = typeof parameters.semanticType === 'string' ? [parameters.semanticType] : parameters.semanticType;
                semanticTypes.forEach(type => this.addRdfTypeStatement(type));
            }
            // Handle resources
        }
    }
    getSemanticId() {
        return this._semanticId;
    }
    setSemanticId(semanticId) {
        this._semanticId = semanticId;
        // compute change in graph
    }
    removeSemanticId() {
        // compute change in graph -> to blank node
    }
    isEmpty() {
        return this.countStatementsAbout(this) > 0;
    }
    getStatementsAbout(subject, property) {
        const semanticId = typeof subject === 'string' ? subject : subject.getSemanticId(); // manage self
        const dataset = this._rdfDataset.filter((quad) => quad.subject.toCanonical() === semanticId);
        return dataset ? DocumentDefault.load(this.getSemantizer(), dataset) : new DocumentDefault({ semantizer: this.getSemantizer() });
    }
    getAllValuesAboutStatement(property, subject = this) {
        const subjectAsString = typeof subject === 'string' ? subject : subject.getSemanticId();
        const iteratee = (r, q) => {
            if (q.subject.value === subjectAsString && q.predicate.value === this.getSemantizer().expand(property))
                r.push(this.getSemantizer().shorten(q.object.value));
            return r;
        };
        return this._rdfDataset.reduce(iteratee, []);
    }
    addStatementAbout(property, valueOrResource, subject = this, datatype, language) {
        const languageOrDatatype = language ? language : datatype ? rdf.namedNode(datatype) : undefined;
        this.addRdfQuad(this.createRdfQuad(subject, property, valueOrResource, languageOrDatatype));
    }
    getFirstStringValueAboutStatement(property, subject = this) {
        const values = this.getAllStringValuesAboutStatement(property, subject);
        return values.length >= 1 ? values[0] : null;
    }
    getAllStringValuesAboutStatement(property, subject = this) {
        return this.getAllValuesAboutStatement(property, subject);
    }
    addRdfTypeStatement(value, subject) {
        this.addStatementAbout("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", value, subject);
    }
    // Todo: handle default locale? No in this method but in the caller code.
    addStringStatementAbout(property, value, locale, subject = this) {
        this.addStatementAbout(property, value, subject, "xsd:string", locale);
    }
    addBooleanStatementAbout(property, value, subject = this) {
        this.addStatementAbout(property, value.toString(), subject, "xsd:boolean");
    }
    addDecimalStatementAbout(property, value, subject = this) {
        this.addStatementAbout(property, value.toString(), subject, "xsd:decimal");
    }
    addIntegerStatementAbout(property, value, subject = this) {
        this.addStatementAbout(property, value.toString(), subject, "xsd:integer");
    }
    addDateStatementAbout(property, value, subject = this) {
        this.addStatementAbout(property, value.toString(), subject, "xsd:date");
    }
    addDatetimeStatementAbout(property, value, subject = this) {
        this.addStatementAbout(property, value.toString(), subject, "xsd:datetime");
    }
    addTimeStatementAbout(property, value, subject = this) {
        this.addStatementAbout(property, value.toString(), subject, "xsd:time");
    }
    countStatementsAbout(subject = this, property) {
        return 0;
    }
    countSubjects() {
        return 0;
    }
    getFirstRdfTypeValue(subject) {
        const values = this.getAllRdfTypeValues(subject);
        return values.length >= 1 ? values[0] : null;
    }
    getAllRdfTypeValues(subject) {
        return this.getAllValuesAboutStatement("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", subject);
    }
    hasStatementsAbout(subject = this, property, ...hasValues) {
        return true;
    }
    isSemanticTypeOf(semanticType) {
        return this.hasStatementsAbout(this, "rdf:type", semanticType);
        //return this.getStatementsAbout(this, "rdf:type").includes(semanticType);
    }
    addRdfQuad(quad) {
        this._rdfDataset.add(quad);
    }
    filter(by) {
        return new DocumentDefault({ semantizer: this.getSemantizer() });
    }
    addStatementFrom(source, subject = this) {
    }
    createRdfQuad(subject, property, value, languageOrDatatype) {
        let object = typeof value === 'string' ? rdf.literal(value) : value;
        /*
        let valueOrResource = value;
        if (typeof valueOrResource !== "string" && !this.isSemanticAnonymous(valueOrResource))
            value = valueOrResource.getSemanticId();

        if (typeof value === "string") {
            object = languageOrDatatype? rdf.literal(value, languageOrDatatype): rdf.namedNode(this.getSemantizer().expand(value));
        }

        */
        const subject2 = rdf.namedNode(''); // typeof subject === "string"? rdf.namedNode(subject): subject, // or blank node
        return rdf.quad(subject2, rdf.namedNode(this.getSemantizer().expand(property)), object // or blank node
        );
    }
    getSemantizer() {
        return this._semantizer;
    }
    /**
     * Return a deep copy of the underlying RDF dataset.
     * @returns
     */
    toRdfDatasetExt() {
        return this._rdfDataset.clone();
    }
}
//# sourceMappingURL=DocumentDefault.js.map