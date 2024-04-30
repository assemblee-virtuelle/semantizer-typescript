import Semantizer from "./Semantizer.js";
import SemantizerFactory from "./SemantizerFactory.js";
import { Context } from "./core/Common.js";
import { DocumentWithNonDestructiveOperations } from "./core/Document.js";
export default class SemantizerFactoryDefault implements SemantizerFactory {
    private _semantizer;
    constructor(semantizer: Semantizer);
    loadDocument(uri: string): DocumentWithNonDestructiveOperations<any, any>;
    createDocument(uri?: string, context?: Context): DocumentWithNonDestructiveOperations<any, any>;
    getSemantizer(): Semantizer;
    createContext(): Context;
}
//# sourceMappingURL=SemantizerFactoryDefault.d.ts.map