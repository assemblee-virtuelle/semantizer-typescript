import rdf from 'rdf-ext';
import ThingDefaultImpl from "./ThingDefaultImpl.js";
//import * as RDF from "@rdfjs/types";
// states: Object | Document | Container
// states: Local | Distant
// states: Created | Modified | Loaded
export class DocumentDefaultImpl {
    constructor(uri, context) {
        this._uri = uri !== null && uri !== void 0 ? uri : '';
        this._context = context;
        this._things = [];
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
        this._things.push(thing);
        return this;
    }
    addDocument(document) {
        throw new Error("Method not implemented.");
    }
    getThing(uri) {
        throw new Error("Method not implemented.");
    }
    isUrl(input) {
        return input.startsWith('http') || input.startsWith('#') || input === '';
    }
    generateUriWithFragment() {
        return this.createUriWithFragment(this.generateThingName());
    }
    getOrCreateNameWithHash(nameWithOrWithoutHash) {
        return nameWithOrWithoutHash.startsWith('#') ? nameWithOrWithoutHash : `#${nameWithOrWithoutHash}`;
    }
    createUriWithFragment(name) {
        return this.getUri() + this.getOrCreateNameWithHash(name);
    }
    checkUriCanBeAddedToTheDocument(uri) {
        return this.isUrl(uri) && !this.hasStatementsAbout(uri);
    }
    getSafeUriFromUri(uri) {
        if (!this.checkUriCanBeAddedToTheDocument(uri))
            throw new Error(`You are trying to add the thing "${uri}" which is already part of the document.`);
        return uri;
    }
    getSafeUriFromName(name) {
        const uri = this.createUriWithFragment(name);
        if (!this.checkUriCanBeAddedToTheDocument(uri))
            throw new Error(`You are trying to add the thing "${uri}" which is already part of the document.`);
        return uri;
    }
    getSafeUriFromNameHintOrUri(nameHintOrUri) {
        return this.isUrl(nameHintOrUri) ? this.getSafeUriFromUri(nameHintOrUri) : this.getSafeUriFromName(nameHintOrUri);
    }
    createSelfDescribingThing() {
        const thing = ThingDefaultImpl.createThingForDescribingDocument(this);
        this.addThing(thing);
        return thing;
    }
    generateThingName() {
        return "generatedName"; // TODO
    }
    validateOrCreateThingUri(nameHintOrUri) {
        return nameHintOrUri ? this.getSafeUriFromNameHintOrUri(nameHintOrUri) : this.generateUriWithFragment();
    }
    createAndAddRegularThing(uri) {
        const thing = ThingDefaultImpl.createRegularThing(this, uri);
        this.addThing(thing);
        return thing;
    }
    createThing(nameHintOrUri) {
        const uriOfNewRegularThing = this.validateOrCreateThingUri(nameHintOrUri);
        return this.createAndAddRegularThing(uriOfNewRegularThing);
    }
    createAnonymousThing(nameHint) {
        const thing = ThingDefaultImpl.createAnonymousThing(this, nameHint);
        this.addThing(thing);
        return thing;
    }
    deleteThing() {
        throw new Error("Method not implemented.");
    }
    getUri() {
        return this._uri;
    }
    setUri(uri) {
        this._uri = uri;
        // compute change in every things
    }
    isEmpty() {
        return this.countThings() === 0;
    }
    getAllThings() {
        return this._things;
    }
    getSelfDescribingThing() {
        return this.getThing(this.getUri());
    }
    countThings() {
        return this.getAllThings().length;
    }
    hasStatementsAbout(subject, property, ...hasValues) {
        const uri = typeof subject === 'string' ? subject : subject.getUri();
        return this.getAllThings().some(thing => thing.getUri() === uri);
    }
    filter(by) {
        throw new Error("Not implemented");
    }
    toRdfDatasetExt() {
        const result = rdf.dataset();
        this._things.forEach(thing => {
            // @ts-ignore
            result.addAll(thing.toRdfDatasetExt());
        });
        return result;
    }
}
export default DocumentDefaultImpl;
/*protected createRdfQuad(subject: string | Document, property: string, value: string | Document, languageOrDatatype?: string | NamedNodeExt): QuadExt {
        let object = typeof value === 'string'? rdf.literal(value): value;
        
        let valueOrResource = value;
        if (typeof valueOrResource !== "string" && !this.isSemanticAnonymous(valueOrResource))
            value = valueOrResource.getSemanticId();

        if (typeof value === "string") {
            object = languageOrDatatype? rdf.literal(value, languageOrDatatype): rdf.namedNode(this.getSemantizer().expand(value));
        }

        const subject2 = rdf.namedNode(''); // typeof subject === "string"? rdf.namedNode(subject): subject, // or blank node

        return rdf.quad(
            subject2,
            rdf.namedNode(this.expand(property)),
            object // or blank node
        );
    }*/
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
//# sourceMappingURL=DocumentDefaultImpl.js.map