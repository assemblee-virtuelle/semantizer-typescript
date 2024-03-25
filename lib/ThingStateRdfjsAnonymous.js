import rdf from 'rdf-ext';
import ThingStateRdfjsBase from "./ThingStateRdfjsBase.js";
export class ThingStateRdfjsAnonymous extends ThingStateRdfjsBase {
    constructor(thing, nameHint) {
        super(thing, '');
        this._blankNode = rdf.blankNode(nameHint);
    }
    getBlankNode() {
        return this._blankNode;
    }
    getUri() {
        // @ts-ignore
        return this.getBlankNode().value;
    }
    isAnonymous() {
        return true;
    }
    addStatement(about, value, datatype, language) {
        const languageOrDatatype = language ? language : datatype ? rdf.namedNode(datatype) : undefined;
        this.addRdfQuad(this.createRdfQuad(about, value, languageOrDatatype));
        return this.getThing();
    }
    createRdfQuad(property, value, languageOrDatatype) {
        let object = typeof value === 'string' ? rdf.literal(value) : rdf.namedNode(value.getUri());
        return rdf.quad(this.getBlankNode(), rdf.namedNode(this.expand(property)), object // or blank node
        );
    }
}
export default ThingStateRdfjsAnonymous;
//# sourceMappingURL=ThingStateRdfjsAnonymous.js.map