import DatasetExt from "rdf-ext/lib/Dataset";
import Thing from "./Thing";
import { ThingStateDefaultBase } from "./ThingStateDefaultBase.js";
import rdf from 'rdf-ext';
import QuadExt from "rdf-ext/lib/Quad";

export abstract class ThingStateRdfjsBase extends ThingStateDefaultBase {

    private _rdfjsDataset: any;

    constructor(thing: Thing, uri: string) {
        super(thing, uri);
        this._rdfjsDataset = rdf.dataset();
    }

    protected getDataset(): any {
        return this._rdfjsDataset;
    }

    protected addRdfQuad(quad: QuadExt): void {
        this.getDataset().add(quad);
    }

    public toRdfDatasetExt(): DatasetExt {
        return this.getDataset().clone();
    }

    public getAllValuesAboutStatement(property: string): string[] {
        const iteratee = (r: any, q: any) => {
            if (q.predicate.value === this.expand(property)) 
                r.push(this.shorten(q.object.value))
            return r;
        }
        return this.getDataset().reduce(iteratee, []);
    }

}

export default ThingStateRdfjsBase;