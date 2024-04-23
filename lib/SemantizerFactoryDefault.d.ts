import Semantizer from "./Semantizer.js";
import SemantizerFactory from "./SemantizerFactory.js";
import { Context } from "./core/Common.js";
import { Document } from "./core/Document.js";
export default class SemantizerFactoryDefault implements SemantizerFactory {
    private _semantizer;
    constructor(semantizer: Semantizer);
    loadDocument(uri: string): Document<any, any>;
    createDocument(uri?: string, context?: Context): Document<any, any>;
    getSemantizer(): Semantizer;
    createContext(): Context;
}
//# sourceMappingURL=SemantizerFactoryDefault.d.ts.map