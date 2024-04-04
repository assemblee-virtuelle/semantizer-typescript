import Context from "./core/Context.js";
import { DocumentBase } from "./core/Document.js";
import DocumentFactory from "./core/DocumentFactory.js";
import Semantizer from "./Semantizer.js";
import SemantizerFactory from "./SemantizerFactory.js";
export default class SemantizerFactoryDefault implements SemantizerFactory {
    private _semantizer;
    private _documentFactory;
    constructor(semantizer: Semantizer);
    getDocumentFactory(): DocumentFactory;
    loadDocument(uri: string): DocumentBase;
    createDocument(uri?: string, context?: Context): DocumentBase;
    getSemantizer(): Semantizer;
    createContext(): Context;
}
//# sourceMappingURL=SemantizerFactoryDefault.d.ts.map