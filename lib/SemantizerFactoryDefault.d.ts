import Context from "./Context.js";
import { Document } from "./Document.js";
import DocumentFactory from "./DocumentFactory.js";
import Semantizer from "./Semantizer.js";
import SemantizerFactory from "./SemantizerFactory.js";
export default class SemantizerFactoryDefault implements SemantizerFactory {
    private _semantizer;
    private _documentFactory;
    constructor(semantizer: Semantizer);
    getDocumentFactory(): DocumentFactory;
    loadDocument(uri: string): Document;
    createDocument(uri?: string, context?: Context): Document;
    getSemantizer(): Semantizer;
    createContext(): Context;
}
//# sourceMappingURL=SemantizerFactoryDefault.d.ts.map