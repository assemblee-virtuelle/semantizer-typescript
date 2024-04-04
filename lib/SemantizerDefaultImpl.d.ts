import Context from "./core/Context.js";
import { Semantizer, ImportFormat } from "./Semantizer.js";
import { DocumentBase } from "./core/Document.js";
import SemantizerFactory from "./SemantizerFactory.js";
export declare class SemantizerDefaultImpl implements Semantizer {
    private _context;
    private _semanticResourceFactory;
    constructor(context?: any, semanticResourceFactory?: SemantizerFactory);
    exportDocument(...input: DocumentBase[]): Promise<string>;
    createDocument(uri?: string, context?: Context): DocumentBase;
    importDocument(input: string, format?: ImportFormat, callback?: Function): Promise<DocumentBase>;
    getFactory(): SemantizerFactory;
    setContext(context: Context): void;
    getContext(): Context;
    protected _getContext(): Context;
    shorten(uri: string): string;
    expand(uri: string): string;
}
export default SemantizerDefaultImpl;
//# sourceMappingURL=SemantizerDefaultImpl.d.ts.map