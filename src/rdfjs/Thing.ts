import DatasetExt from "rdf-ext/lib/Dataset";
import { Thing as ThingCore } from "../contracts/Thing";

export interface Thing extends ThingCore {
    toRdfDatasetExt(): DatasetExt;
}

export default Thing;