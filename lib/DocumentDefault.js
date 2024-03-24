import rdf from 'rdf-ext';
//import * as RDF from "@rdfjs/types";
// states: Object | Document | Container
// states: Local | Distant
// states: Created | Modified | Loaded
export class DocumentDefault {
    constructor(parameters) {
        var _a;
        this._context = parameters === null || parameters === void 0 ? void 0 : parameters.context;
        this._uri = (_a = parameters === null || parameters === void 0 ? void 0 : parameters.uri) !== null && _a !== void 0 ? _a : "";
        this._things = [];
        // Load
        if (parameters === null || parameters === void 0 ? void 0 : parameters.rdfDataset) {
            this._rdfDataset = parameters.rdfDataset;
        }
        // Create
        else {
            this._rdfDataset = rdf.dataset();
            /*if (parameters.semanticType) {
                const semanticTypes = typeof parameters.semanticType === 'string'? [parameters.semanticType]: parameters.semanticType;
                semanticTypes.forEach(type => this.addRdfTypeStatement(type));
            }*/
            // Handle resources
        }
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
    addThing(thing) {
        throw new Error("Method not implemented.");
    }
    addDocument(document) {
        throw new Error("Method not implemented.");
    }
    getThing(uri) {
        throw new Error("Method not implemented.");
    }
    createSelfDescribingThing() {
        throw new Error("Method not implemented.");
    }
    createThing(nameHintOrUri) {
        throw new Error("Method not implemented.");
    }
    createAnonymousThing(nameHint) {
        throw new Error("Method not implemented.");
    }
    removeThing() {
        throw new Error("Method not implemented.");
    }
    getUri() {
        return this._uri;
    }
    setUri(uri) {
        this._uri = uri;
        // compute change in graph
    }
    isEmpty() {
        return this.countThings() === 0;
    }
    getAllThings() {
        return this._things;
    }
    countThings() {
        return this.getAllThings().length;
    }
    hasStatementsAbout(subject = this, property, ...hasValues) {
        return true;
    }
    addRdfQuad(quad) {
        this._rdfDataset.add(quad);
    }
    filter(by) {
        throw new Error("Not implemented");
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
        return rdf.quad(subject2, rdf.namedNode(this.expand(property)), object // or blank node
        );
    }
    /**
     * Return a deep copy of the underlying RDF dataset.
     * @returns
     */
    toRdfDatasetExt() {
        return this._rdfDataset.clone();
    }
}
export default DocumentDefault;
/*public getStatementsAbout(subject: string | Document, property?: string): Document {
        const semanticId = typeof subject === 'string'? subject: subject.getSemanticId(); // manage self
        const dataset = this._rdfDataset.filter((quad: QuadExt) => quad.subject.toCanonical() === semanticId)
        return dataset? DocumentDefault.load(this.getSemantizer(), dataset): new DocumentDefault({ semantizer: this.getSemantizer() });
    }*/
/*public getAllValuesAboutStatement(property: string, subject: string | Document = this): string[] {
    const subjectAsString = typeof subject === 'string'? subject: subject.getSemanticId();
    const iteratee = (r: any, q: any) => {
        if (q.subject.value === subjectAsString && q.predicate.value === this.getSemantizer().expand(property))
            r.push(this.getSemantizer().shorten(q.object.value))
        return r;
    }
    return this._rdfDataset.reduce(iteratee, []);
}*/
/*public getFirstStringValueAboutStatement(property: string, subject: string | Document = this): string | null {
    const values = this.getAllStringValuesAboutStatement(property, subject);
    return values.length >= 1? values[0]: null;
}*/
/*public getAllStringValuesAboutStatement(property: string, subject: string | Document = this): string[] {
    return this.getAllValuesAboutStatement(property, subject);
}*/
/*public getFirstRdfTypeValue(subject?: string | Document): string | null {
    const values = this.getAllRdfTypeValues(subject);
    return values.length >= 1? values[0]: null;
}*/
/*public getAllRdfTypeValues(subject?: string | Document): string[] {
    return this.getAllValuesAboutStatement("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", subject);
}*/
/*public isSemanticTypeOf(semanticType: string): boolean {
    return this.hasStatementsAbout(this, "rdf:type", semanticType);
    //return this.getStatementsAbout(this, "rdf:type").includes(semanticType);
}*/
/*public removeSemanticId(): void {
    // compute change in graph -> to blank node
}*/
/*public getSemantizer(): Semantizer {
    return this._semantizer;
}*/
/*public static load(semantizer: Semantizer, rdfDataset: any): DocumentDefault {
    return new DocumentDefault({semantizer, rdfDataset});
}*/
/*public static create(semantizer: Semantizer, parameters?: ResourceCreationParameters): DocumentDefault {
    return new DocumentDefault({
        semantizer,
        semanticId: parameters?.semanticId,
        semanticType: parameters?.semanticType,
        resources: parameters?.semanticContainedResource
    });
}*/ 
//# sourceMappingURL=DocumentDefault.js.map