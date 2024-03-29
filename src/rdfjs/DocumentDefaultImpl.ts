import Document from "./Document";
import rdf from 'rdf-ext';
import DatasetExt from "rdf-ext/lib/Dataset";
import { DocumentDefaultImpl as DocumentDefaultImplCore } from "../default/DocumentDefaultImpl";

export class DocumentDefaultImpl extends DocumentDefaultImplCore implements Document{

    public toRdfDatasetExt(): DatasetExt {
        const result = rdf.dataset();
        // @ts-ignore
        this._things.forEach(thing => result.addAll(thing.toRdfDatasetExt()));
        return result;
    }

    /*public equals(other: Document): boolean {
        return this.toRdfDatasetExt().equals(other.toRdfDatasetExt());
    }*/

}

export default DocumentDefaultImpl;