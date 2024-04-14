import { Context } from "./core/Context.js";
import { DocumentBase } from "./core/Document.js";
import { Factory } from "./core/Factory.js";
import Semantizer from "./Semantizer.js";
import SemantizerFactory from "./SemantizerFactory.js";
export default class SemantizerFactoryDefault implements SemantizerFactory {
    private _semantizer;
    private _documentFactory;
    constructor(semantizer: Semantizer);
    getDocumentFactory(): Factory<any>;
    loadDocument(uri: string): DocumentBase<any, any>;
    createDocument(uri?: string, context?: Context): DocumentBase<any, any>;
    getSemantizer(): Semantizer;
    createContext(): Context;
}
//# sourceMappingURL=SemantizerFactoryDefault.d.ts.map