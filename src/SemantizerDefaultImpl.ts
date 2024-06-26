import { Context } from "./core/src/Common.js";
import { ContextDefault } from "./core/src/ContextImpl.js";
import { DocumentWithNonDestructiveOperations } from "./core/src/Document.js";
import { Semantizer, ImportFormat, ResourceCreationParameters } from "./Semantizer.js";
import SemantizerFactory from "./SemantizerFactory.js";
import SemantizerFactoryDefault from "./SemantizerFactoryDefault.js";

export class SemantizerDefaultImpl implements Semantizer {

    private _context: Context;
    private _semanticResourceFactory: SemantizerFactory;

    public constructor(context: any = {}, semanticResourceFactory?: SemantizerFactory) {
        this._context = new ContextDefault(context);
        this._semanticResourceFactory = semanticResourceFactory || new SemantizerFactoryDefault(this);
    }

    public async exportDocument(...input: DocumentWithNonDestructiveOperations<any, any>[]): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public createDocument(uri?: string, context?: Context): DocumentWithNonDestructiveOperations<any, any> {
        return this.getFactory().createDocument(uri, context);
    }

    public async importDocument(input: string, format?: ImportFormat, callback?: Function): Promise<DocumentWithNonDestructiveOperations<any, any>> {
        // fetch the resource
        // pass the resource to the factory (as a Dataset ?)
        return this.getFactory().loadDocument(input);
    }

    public getFactory(): SemantizerFactory {
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

export default SemantizerDefaultImpl;