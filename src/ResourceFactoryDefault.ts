import Document from "./Document";
import DocumentDefault from "./DocumentDefault.js";
import ResourceFactory from "./ResourceFactory";
import Semantizer, { ResourceCreationParameters } from "./Semantizer";

export default class ResourceFactoryDefault implements ResourceFactory {

    private _semantizer: Semantizer;

    public constructor(semantizer: Semantizer) {
        this._semantizer = semantizer;
    }

    public getSemantizer(): Semantizer {
        return this._semantizer;
    }

    public loadSemanticResource(semanticId: string): Document {
        return DocumentDefault.load(this.getSemantizer(), semanticId);
    }

    public createSemanticResource(parameters?: ResourceCreationParameters): Document {
        return DocumentDefault.create(this.getSemantizer(), parameters);
    }
    
}