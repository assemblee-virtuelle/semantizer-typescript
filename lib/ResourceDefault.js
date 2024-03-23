import rdf from 'rdf-ext';
export default class ResourceDefault {
    //private _state?: ResourceState;
    static load(semantizer, rdfDataset) {
        return new ResourceDefault({ semantizer, rdfDataset });
    }
    /**
     *
     * @param semantizer
     * @param parameters semanticId = uri or name of blank node
     * @returns
     */
    static create(semantizer, parameters) {
        return new ResourceDefault({
            semantizer,
            semanticId: parameters === null || parameters === void 0 ? void 0 : parameters.semanticId,
            semanticType: parameters === null || parameters === void 0 ? void 0 : parameters.semanticType,
            resources: parameters === null || parameters === void 0 ? void 0 : parameters.semanticContainedResource
        });
    }
    constructor(parameters) {
        var _a;
        this._semantizer = parameters.semantizer;
        // Load
        if (parameters.rdfDataset) {
            this._rdfDataset = parameters.rdfDataset;
        }
        // Create
        else {
            this._rdfDataset = rdf.dataset();
            this.setSemanticId((_a = parameters.semanticId) !== null && _a !== void 0 ? _a : "");
            if (parameters.semanticType) {
                this.setSemanticType(parameters.semanticType);
            }
            // Handle resources
        }
    }
    /*private extractSemanticTypes(semanticType?: SemanticType): string[] {
        return semanticType? [...semanticType]: [];
    }*/
    getSemanticId() {
        var _a;
        return (_a = this._semanticId) !== null && _a !== void 0 ? _a : "";
    }
    setSemanticId(semanticId) {
        this._semanticId = semanticId;
        // compute change in graph
    }
    removeSemanticId() {
        // compute change in graph -> to blank node
    }
    setSemanticType(semanticType) {
        const semanticTypes = typeof semanticType === 'string' ? [semanticType] : semanticType;
        semanticTypes.forEach(type => this.addValueForSemanticPropertyUrl("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", type));
    }
    addSemanticContainedResource(...resource) {
    }
    addValueForSemanticProperty(property, valueOrResource, datatype, language) {
        const languageOrDatatype = language ? language : datatype ? rdf.namedNode(datatype) : undefined;
        this.addRdfQuad(this.createRdfQuad(this.getSemanticId(), property, valueOrResource, languageOrDatatype));
    }
    addValueForSemanticPropertyBoolean(property, value) {
        this.addValueForSemanticProperty(property, value, "xsd:boolean");
    }
    addValueForSemanticPropertyDecimal(property, value) {
        this.addValueForSemanticProperty(property, value, "xsd:decimal");
    }
    addValueForSemanticPropertyInteger(property, value) {
        this.addValueForSemanticProperty(property, value, "xsd:integer");
    }
    addValueForSemanticPropertyDate(property, value) {
        this.addValueForSemanticProperty(property, value, "xsd:date");
    }
    addValueForSemanticPropertyDatetime(property, value) {
        this.addValueForSemanticProperty(property, value, "xsd:datetime");
    }
    addValueForSemanticPropertyTime(property, value) {
        this.addValueForSemanticProperty(property, value, "xsd:time");
    }
    // Todo: handle default locale? No in this method but in the caller code.
    addValueForSemanticPropertyString(property, value, locale) {
        this.addValueForSemanticProperty(property, value, "xsd:string", locale);
    }
    isSemanticAnonymous(resource) {
        return resource.getSemanticId() !== "";
    }
    // Can be removed and replaced by addValueForSemanticProperty?
    addValueForSemanticPropertyUrl(property, valueOrResource) {
        this.addValueForSemanticProperty(property, valueOrResource);
    }
    countContainedResources() {
        return 0;
    }
    isSemanticTypeOf(semanticType) {
        return this.getAllValuesOfSemanticPropertyUrl("rdf:type").includes(semanticType);
    }
    getAllValuesOfSemanticPropertyUrl(property) {
        return [];
    }
    /*public isDocument(): boolean {
        return !this.isContainer && this.countContainedResources() > 1;
    }

    public isContainer(): boolean {
        return this.isTypeOf("ldp:Container");
    }
    
    public isObject(): boolean {
        return !this.isContainer && this.countContainedResources() === 1;
    }*/
    getContainedResources() {
        throw new Error("Method not implemented.");
    }
    addRdfQuad(quad) {
        this._rdfDataset.add(quad);
    }
    /*protected changeState(state: ResourceState): void {
        this._state = state;
    }*/
    createRdfQuad(subject, property, value, languageOrDatatype) {
        let object = value;
        if (typeof value === "string") {
            object = languageOrDatatype ? rdf.literal(value, languageOrDatatype) : rdf.namedNode(this.getSemantizer().expand(value));
        }
        let valueOrResource = value;
        if (typeof valueOrResource !== "string" && !this.isSemanticAnonymous(valueOrResource))
            value = valueOrResource.getSemanticId();
        return rdf.quad(typeof subject === "string" ? rdf.namedNode(subject) : subject, rdf.namedNode(this.getSemantizer().expand(property)), object);
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
//# sourceMappingURL=ResourceDefault.js.map