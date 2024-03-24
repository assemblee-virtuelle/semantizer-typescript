import Context from "./Context.js";
import { Semantizer, ImportFormat } from "./Semantizer.js";
import { Document, ConstructionParameters } from "./Document.js";
import ResourceFactory from "./Factory.js";
export declare class SemantizerDefault implements Semantizer {
    private _context;
    private _semanticResourceFactory;
    constructor(context?: any, semanticResourceFactory?: ResourceFactory);
    exportDocument(...input: Document[]): Promise<string>;
    createDocument(parameters?: ConstructionParameters): Document;
    importDocument(input: string, format?: ImportFormat, callback?: Function): Promise<Document>;
    getSemanticResourceFactory(): ResourceFactory;
    setContext(context: Context): void;
    getContext(): Context;
    protected _getContext(): Context;
    shorten(uri: string): string;
    expand(uri: string): string;
}
export default SemantizerDefault;
//# sourceMappingURL=SemantizerDefault.d.ts.map