import Context from "./Context.js";
import { Semantizer, ImportFormat, ResourceCreationParameters } from "./Semantizer.js";
import Document from "./Document.js";
import ResourceFactory from "./ResourceFactory.js";
export default class SemantizerDefault implements Semantizer {
    private _context;
    private _semanticResourceFactory;
    constructor(context?: any, semanticResourceFactory?: ResourceFactory);
    exportDocument(...input: Document[]): Promise<string>;
    createDocument(parameters?: ResourceCreationParameters): Document;
    importDocument(input: string, format?: ImportFormat, callback?: Function): Promise<Document>;
    getSemanticResourceFactory(): ResourceFactory;
    setContext(context: Context): void;
    getContext(): Context;
    protected _getContext(): Context;
    shorten(uri: string): string;
    expand(uri: string): string;
}
//# sourceMappingURL=SemantizerDefault.d.ts.map