import rdf from 'rdf-ext';
import ThingStateRdfjsBase from "./ThingStateRdfjsBase.js";
export class ThingStateRdfjsRegular extends ThingStateRdfjsBase {
    constructor(thing, uri) {
        super(thing, uri);
    }
    isAnonymous() {
        return false;
    }
    addStatement(about, value, datatype, language) {
        const languageOrDatatype = language ? language : datatype ? rdf.namedNode(datatype) : undefined;
        this.addRdfQuad(this.createRdfQuad(about, value, languageOrDatatype));
        return this.getThing();
    }
    createRdfQuad(property, value, languageOrDatatype) {
        let object = typeof value === 'string' ? rdf.literal(value) : rdf.namedNode(value.getUri());
        return rdf.quad(rdf.namedNode(this.getUri()), rdf.namedNode(this.expand(property)), object // or blank node
        );
    }
}
export default ThingStateRdfjsRegular;
//# sourceMappingURL=ThingStateRdfjsRegular.js.map