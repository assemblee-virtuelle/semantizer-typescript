import rdf from 'rdf-ext';
import { ThingStateDefaultBase } from "./ThingStateDefaultBase.js";
export class ThingStateRdfjsRegular extends ThingStateDefaultBase {
    constructor(thing, uri) {
        super(thing, uri);
        this._rdfjsDataset = rdf.dataset();
    }
    getDataset() {
        return this._rdfjsDataset;
    }
    addRdfQuad(quad) {
        this.getDataset().add(quad);
    }
    toRdfDatasetExt() {
        return this.getDataset().clone();
    }
    isAnonymous() {
        return false;
    }
    getAllValuesAboutStatement(property) {
        const iteratee = (r, q) => {
            if (q.predicate.value === this.expand(property))
                r.push(this.shorten(q.object.value));
            return r;
        };
        return this.getDataset().reduce(iteratee, []);
    }
    addStatement(about, value, datatype, language) {
        const languageOrDatatype = language ? language : datatype ? rdf.namedNode(datatype) : undefined;
        this.addRdfQuad(this.createRdfQuad(about, value, languageOrDatatype));
        return this.getThing();
    }
    isBlankNode(resource) {
        return resource.getUri().startsWith('_:');
    }
    getDocumentDataset() {
        return this.getThing().getDocument().toRdfDatasetExt();
    }
    getBlankNode(resource) {
        const blankNodeCanonicalName = resource.getUri();
        let result = null;
        this.getDocumentDataset().forEach((quad) => {
            // @ts-ignore
            if (quad.subject.termType === "BlankNode" && quad.subject.toCanonical() === blankNodeCanonicalName) {
                console.log("FOUND", quad.subject);
                result = quad.subject;
                return;
            }
        });
        if (!result)
            throw new Error(`Internal error: unable to find the blank node "${blankNodeCanonicalName}".`);
        return result;
    }
    getNamedNode(resource) {
        return rdf.namedNode(this.expand(resource.getUri()));
    }
    getLiteral(value, languageOrDatatype) {
        return rdf.literal(value, languageOrDatatype);
    }
    getNamedNodeOrBlankNode(resource) {
        return this.isBlankNode(resource) ? this.getBlankNode(resource) : this.getNamedNode(resource);
    }
    getLiteralOrNamedNodeOrBlankNode(value, languageOrDatatype) {
        return typeof value === 'string' ? this.getLiteral(value, languageOrDatatype) : this.getNamedNodeOrBlankNode(value);
    }
    createRdfQuad(property, value, languageOrDatatype) {
        return rdf.quad(rdf.namedNode(this.getUri()), rdf.namedNode(this.expand(property)), this.getLiteralOrNamedNodeOrBlankNode(value, languageOrDatatype));
    }
}
export default ThingStateRdfjsRegular;
//# sourceMappingURL=ThingStateRdfjsRegular.js.map