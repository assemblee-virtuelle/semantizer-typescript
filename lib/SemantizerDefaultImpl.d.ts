import { Context } from "./core/Common.js";
import { DocumentWithNonDestructiveOperations } from "./core/Document.js";
import { Semantizer, ImportFormat } from "./Semantizer.js";
import SemantizerFactory from "./SemantizerFactory.js";
export declare class SemantizerDefaultImpl implements Semantizer {
    private _context;
    private _semanticResourceFactory;
    constructor(context?: any, semanticResourceFactory?: SemantizerFactory);
    exportDocument(...input: DocumentWithNonDestructiveOperations<any, any>[]): Promise<string>;
    createDocument(uri?: string, context?: Context): DocumentWithNonDestructiveOperations<any, any>;
    importDocument(input: string, format?: ImportFormat, callback?: Function): Promise<DocumentWithNonDestructiveOperations<any, any>>;
    getFactory(): SemantizerFactory;
    setContext(context: Context): void;
    getContext(): Context;
    protected _getContext(): Context;
    shorten(uri: string): string;
    expand(uri: string): string;
}
export default SemantizerDefaultImpl;
//# sourceMappingURL=SemantizerDefaultImpl.d.ts.map