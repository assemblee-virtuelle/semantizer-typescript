import Context from "./Context.js";
import { Document } from "./Document.js";
import { DocumentDefaultImpl } from "./DocumentDefaultImpl.js";
import ResourceFactory from "./Factory.js";
import Semantizer, { ResourceCreationParameters } from "./Semantizer.js";

export default class ResourceFactoryDefault implements ResourceFactory {

    private _semantizer: Semantizer;

    public constructor(semantizer: Semantizer) {
        this._semantizer = semantizer;
    }

    public loadDocument(semanticId: string): Document {
        return new DocumentDefaultImpl(semanticId);
    }

    public createDocument(uri?: string, context?: Context): Document {
        return new DocumentDefaultImpl(uri, context);
    }

    public getSemantizer(): Semantizer {
        return this._semantizer;
    }

    public loadSemanticResource(semanticId: string): Document {
        return new DocumentDefaultImpl(semanticId);
    }

    public createContext(): Context {
        throw new Error();
    }
    
}