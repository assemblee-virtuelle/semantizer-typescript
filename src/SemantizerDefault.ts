import ContextDefault from "./ContextDefault.js";
import Context from "./Context.js";
import { Semantizer, ImportFormat, ResourceCreationParameters } from "./Semantizer.js";
import Document from "./Document.js";
import ResourceFactory from "./ResourceFactory.js";
import ResourceFactoryDefault from "./ResourceFactoryDefault.js";

export default class SemantizerDefault implements Semantizer {

    private _context: Context;
    private _semanticResourceFactory: ResourceFactory;

    public constructor(context: any = {}, semanticResourceFactory?: ResourceFactory) {
        this._context = new ContextDefault(context);
        this._semanticResourceFactory = semanticResourceFactory || new ResourceFactoryDefault(this);
    }

    public async exportSemanticResource(...input: Document[]): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public createSemanticResource(parameters?: ResourceCreationParameters): Document {
        return this.getSemanticResourceFactory().createSemanticResource(parameters);
    }

    public async importSemanticResource(input: string, format?: ImportFormat, callback?: Function): Promise<Document> {
        // fetch the resource
        // pass the resource to the factory (as a Dataset ?)
        return this.getSemanticResourceFactory().loadSemanticResource(input);
    }

    public getSemanticResourceFactory(): ResourceFactory {
        return this._semanticResourceFactory;
    }

    public setContext(context: Context): void {
        this._context = context;
    }

    // Should return a copy
    public getContext(): Context {
        return this._context;
    }

    protected _getContext(): Context {
        return this._context;
    }

    /*public getPrefix(uri: string): string | undefined {
        return uri.startsWith("http")? undefined: uri.split(':')[0];
    }*/

    public shorten(uri: string): string {
        return this._getContext()? this._getContext().shorten(uri): uri;
    }

    public expand(uri: string): string {
        return this._getContext()? this._getContext().expand(uri): uri;
    }

}