import DatasetExt from "rdf-ext/lib/Dataset";
import { Document as DocumentCore } from "../contracts/Document";

export interface Document extends DocumentCore {
    toRdfDatasetExt(): DatasetExt;
}

export default Document;