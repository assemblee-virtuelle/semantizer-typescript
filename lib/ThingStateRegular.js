import rdf from 'rdf-ext';
export default class ThingStateRegular {
    constructor(thing, uri) {
        this._rdfjsDataset = rdf.dataset();
        this._thing = thing;
        this._uri = uri;
    }
    getThing() {
        return this._thing;
    }
    getUri() {
        return this._uri;
    }
    isAnonymous() {
        return false;
    }
    getDataset() {
        return this._rdfjsDataset;
    }
    getContext() {
        return this.getThing().getContext();
    }
    expand(uri) {
        return this.getThing().expand(uri);
    }
    shorten(uri) {
        return this.getThing().shorten(uri);
    }
    addStatement(about, value, datatype, language) {
        const languageOrDatatype = language ? language : datatype ? rdf.namedNode(datatype) : undefined;
        this.addRdfQuad(this.createRdfQuad(about, value, languageOrDatatype));
        return this.getThing();
    }
    addRdfQuad(quad) {
        this.getDataset().add(quad);
    }
    getAllValuesAboutStatement(property) {
        const iteratee = (r, q) => {
            if (q.predicate.value === this.expand(property))
                r.push(this.shorten(q.object.value));
            return r;
        };
        return this.getDataset().reduce(iteratee, []);
    }
    createRdfQuad(property, value, languageOrDatatype) {
        let object = typeof value === 'string' ? rdf.literal(value) : rdf.namedNode(value.getUri());
        return rdf.quad(rdf.namedNode(this.getUri()), rdf.namedNode(this.expand(property)), object // or blank node
        );
    }
    toRdfDatasetExt() {
        return this._rdfjsDataset.clone();
    }
}
//# sourceMappingURL=ThingStateRegular.js.map