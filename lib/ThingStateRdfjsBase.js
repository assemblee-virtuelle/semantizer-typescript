import { ThingStateDefaultBase } from "./ThingStateDefaultBase.js";
import rdf from 'rdf-ext';
export class ThingStateRdfjsBase extends ThingStateDefaultBase {
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
    getAllValuesAboutStatement(property) {
        const iteratee = (r, q) => {
            if (q.predicate.value === this.expand(property))
                r.push(this.shorten(q.object.value));
            return r;
        };
        return this.getDataset().reduce(iteratee, []);
    }
}
export default ThingStateRdfjsBase;
//# sourceMappingURL=ThingStateRdfjsBase.js.map