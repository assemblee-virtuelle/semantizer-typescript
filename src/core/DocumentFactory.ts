import Context from "./Context";
import DocumentBase from "./Document";
import ThingBase from "./Thing";

export interface DocumentFactory<CreatedDocument, LoadedDocument> {
    createDocument(uri?: string, context?: Context): CreatedDocument; // Type concret
    loadDocument(uriOrData: string): LoadedDocument;
}

export default DocumentFactory;