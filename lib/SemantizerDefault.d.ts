import Context from "./Context.js";
import { Semantizer, ImportFormat, ResourceCreationParameters } from "./Semantizer.js";
import Resource from "./Document.js";
import ResourceFactory from "./ResourceFactory.js";
export default class SemantizerDefault implements Semantizer {
    private _context;
    private _semanticResourceFactory;
    constructor(context?: any, semanticResourceFactory?: ResourceFactory);
    exportSemanticResource(...input: Resource[]): Promise<string>;
    createSemanticResource(parameters?: ResourceCreationParameters): Resource;
    importSemanticResource(input: string, format?: ImportFormat, callback?: Function): Promise<Resource>;
    getSemanticResourceFactory(): ResourceFactory;
    setContext(context: Context): void;
    getContext(): Context;
    protected _getContext(): Context;
    shorten(uri: string): string;
    expand(uri: string): string;
}
//# sourceMappingURL=SemantizerDefault.d.ts.map