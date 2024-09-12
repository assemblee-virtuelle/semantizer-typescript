import { Quad } from "@rdfjs/types";
import RdfjsDatasetImpl from "@semantizer/rdfjs-dataset";
import { DatasetSemantizer, Semantizer } from '@semantizer/types';

export class DatasetImpl extends RdfjsDatasetImpl implements DatasetSemantizer {

    private _semantizer: Semantizer;

    public constructor(semantizer: Semantizer, quads?: Iterable<Quad>) {
        super(quads? Array.from(quads) : undefined);
        this._semantizer = semantizer;
    }
    
    public getSemantizer(): Semantizer {
        return this._semantizer;
    }

}

export default DatasetImpl;