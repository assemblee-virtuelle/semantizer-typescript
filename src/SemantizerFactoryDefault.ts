import Context from "./core/Context.js";
import { DocumentBase } from "./core/Document.js";
import DocumentFactory from "./core/DocumentFactory.js";
import DocumentFactoryDefaultImpl from "./core-default/DocumentFactoryDefaultImpl.js";
import Semantizer from "./Semantizer.js";
import SemantizerFactory from "./SemantizerFactory.js";

export default class SemantizerFactoryDefault implements SemantizerFactory {

    private _semantizer: Semantizer;
    private _documentFactory: DocumentFactory;

    public constructor(semantizer: Semantizer) {
        this._semantizer = semantizer;
        this._documentFactory = new DocumentFactoryDefaultImpl();
    }

    public getDocumentFactory(): DocumentFactory {
        return this._documentFactory;
    }

    public loadDocument(uri: string): DocumentBase {
        return this.getDocumentFactory().loadDocument(uri);
    }

    public createDocument(uri?: string, context?: Context): DocumentBase {
        return this.getDocumentFactory().createDocument(uri, context);
    }

    public getSemantizer(): Semantizer {
        return this._semantizer;
    }

    public createContext(): Context {
        throw new Error();
    }
    
}