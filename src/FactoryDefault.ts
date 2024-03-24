import Context from "./Context.js";
import { Document, ConstructionParameters } from "./Document.js";
import { DocumentDefault } from "./DocumentDefault.js";
import ResourceFactory from "./Factory.js";
import Semantizer, { ResourceCreationParameters } from "./Semantizer.js";

export default class ResourceFactoryDefault implements ResourceFactory {

    private _semantizer: Semantizer;

    public constructor(semantizer: Semantizer) {
        this._semantizer = semantizer;
    }

    public loadDocument(semanticId: string): Document {
        return new DocumentDefault({ uri: semanticId });
    }

    public createDocument(parameters?: ConstructionParameters): Document {
        return new DocumentDefault(parameters);
    }

    public getSemantizer(): Semantizer {
        return this._semantizer;
    }

    public loadSemanticResource(semanticId: string): Document {
        return new DocumentDefault({ uri: semanticId });
    }

    public createContext(): Context {
        throw new Error();
    }
    
}