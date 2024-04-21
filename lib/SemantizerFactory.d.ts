import { Context } from "./core/ContextImpl";
import { DocumentBase } from "./core/Document";
export default interface SemantizerFactory {
    loadDocument(semanticId: string): DocumentBase<any, any>;
    createDocument(uri?: string, context?: Context): DocumentBase<any, any>;
    createContext(): Context;
}
//# sourceMappingURL=SemantizerFactory.d.ts.map