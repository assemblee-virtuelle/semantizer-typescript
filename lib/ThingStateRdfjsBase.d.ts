import DatasetExt from "rdf-ext/lib/Dataset";
import Thing from "./Thing";
import { ThingStateDefaultBase } from "./ThingStateDefaultBase.js";
import QuadExt from "rdf-ext/lib/Quad";
export declare abstract class ThingStateRdfjsBase extends ThingStateDefaultBase {
    private _rdfjsDataset;
    constructor(thing: Thing, uri: string);
    protected getDataset(): any;
    protected addRdfQuad(quad: QuadExt): void;
    toRdfDatasetExt(): DatasetExt;
    getAllValuesAboutStatement(property: string): string[];
}
export default ThingStateRdfjsBase;
//# sourceMappingURL=ThingStateRdfjsBase.d.ts.map