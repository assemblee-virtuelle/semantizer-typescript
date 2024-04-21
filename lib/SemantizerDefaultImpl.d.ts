import { Context } from "./core/ContextImpl.js";
import { Semantizer, ImportFormat } from "./Semantizer.js";
import { DocumentBase } from "./core/Document.js";
import SemantizerFactory from "./SemantizerFactory.js";
export declare class SemantizerDefaultImpl implements Semantizer {
    private _context;
    private _semanticResourceFactory;
    constructor(context?: any, semanticResourceFactory?: SemantizerFactory);
    exportDocument(...input: DocumentBase<any, any>[]): Promise<string>;
    createDocument(uri?: string, context?: Context): DocumentBase<any, any>;
    importDocument(input: string, format?: ImportFormat, callback?: Function): Promise<DocumentBase<any, any>>;
    getFactory(): SemantizerFactory;
    setContext(context: Context): void;
    getContext(): Context;
    protected _getContext(): Context;
    shorten(uri: string): string;
    expand(uri: string): string;
}
export default SemantizerDefaultImpl;
//# sourceMappingURL=SemantizerDefaultImpl.d.ts.map