import Context from "./Context";
import DocumentBase from "./Document";
import Thing from "./Thing";

export interface DocumentFactory<CreatedDocument, LoadedDocument> {
    createDocument(uri?: string, context?: Context): CreatedDocument; // Type concret
    loadDocument(uriOrData: string): LoadedDocument;
}

export default DocumentFactory;