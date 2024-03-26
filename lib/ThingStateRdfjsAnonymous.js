import rdf from 'rdf-ext';
import ThingStateRdfjsRegular from "./ThingStateRdfjsRegular.js";
export class ThingStateRdfjsAnonymous extends ThingStateRdfjsRegular {
    constructor(thing, nameHint) {
        super(thing, '');
        this._blankNode = rdf.blankNode(nameHint);
        this.addRdfQuad(this.createRdfQuad("", "")); // internal use
    }
    getBlankNode() {
        return this._blankNode;
    }
    getUri() {
        return this.getBlankNode().toCanonical();
    }
    isAnonymous() {
        return true;
    }
    createRdfQuad(property, value, languageOrDatatype) {
        return rdf.quad(this.getBlankNode(), rdf.namedNode(this.expand(property)), this.getLiteralOrNamedNodeOrBlankNode(value, languageOrDatatype));
    }
}
export default ThingStateRdfjsAnonymous;
//# sourceMappingURL=ThingStateRdfjsAnonymous.js.map