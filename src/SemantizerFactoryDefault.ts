import Semantizer from "./Semantizer.js";
import SemantizerFactory from "./SemantizerFactory.js";
import { Context } from "./core/src/Common.js";
import { DocumentWithNonDestructiveOperations } from "./core/src/Document.js";

export default class SemantizerFactoryDefault implements SemantizerFactory {

    private _semantizer: Semantizer;

    public constructor(semantizer: Semantizer) {
        this._semantizer = semantizer;
    }

    public loadDocument(uri: string): DocumentWithNonDestructiveOperations<any, any> {
        throw new Error("Method not implemented.");
    }

    public createDocument(uri?: string, context?: Context): DocumentWithNonDestructiveOperations<any, any> {
        throw new Error("Method not implemented.");
    }

    public getSemantizer(): Semantizer {
        return this._semantizer;
    }

    public createContext(): Context {
        throw new Error("Method not implemented.");
    }
    
}