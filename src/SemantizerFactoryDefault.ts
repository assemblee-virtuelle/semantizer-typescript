import { Context } from "./core/Context.js";
import { DocumentBase } from "./core/Document.js";
import { Factory } from "./core/Factory.js";
import { FactoryImpl } from "./core-default/FactoryImpl.js";
import Semantizer from "./Semantizer.js";
import SemantizerFactory from "./SemantizerFactory.js";

export default class SemantizerFactoryDefault implements SemantizerFactory {

    private _semantizer: Semantizer;
    private _documentFactory: Factory<any>;

    public constructor(semantizer: Semantizer) {
        this._semantizer = semantizer;
        this._documentFactory = new FactoryImpl();
    }

    public getDocumentFactory(): Factory<any> {
        return this._documentFactory;
    }

    public loadDocument(uri: string): DocumentBase<any, any> {
        throw new Error(""); //return this.getDocumentFactory().loadDocument(uri);
    }

    public createDocument(uri?: string, context?: Context): DocumentBase<any, any> {
        return this.getDocumentFactory().createDocument(uri, context);
    }

    public getSemantizer(): Semantizer {
        return this._semantizer;
    }

    public createContext(): Context {
        throw new Error();
    }
    
}