import Context from "./Context.js";
import { Semantizer, ImportFormat } from "./Semantizer.js";
import { Document } from "./Document.js";
import ResourceFactory from "./Factory.js";
export declare class SemantizerDefaultImpl implements Semantizer {
    private _context;
    private _semanticResourceFactory;
    constructor(context?: any, semanticResourceFactory?: ResourceFactory);
    exportDocument(...input: Document[]): Promise<string>;
    createDocument(uri?: string, context?: Context): Document;
    importDocument(input: string, format?: ImportFormat, callback?: Function): Promise<Document>;
    getSemanticResourceFactory(): ResourceFactory;
    setContext(context: Context): void;
    getContext(): Context;
    protected _getContext(): Context;
    shorten(uri: string): string;
    expand(uri: string): string;
}
export default SemantizerDefaultImpl;
//# sourceMappingURL=SemantizerDefaultImpl.d.ts.map