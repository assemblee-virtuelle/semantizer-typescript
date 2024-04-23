import { Context } from "./core/Common";
import { Document } from "./core/Document";
export default interface SemantizerFactory {
    loadDocument(semanticId: string): Document<any, any>;
    createDocument(uri?: string, context?: Context): Document<any, any>;
    createContext(): Context;
}
//# sourceMappingURL=SemantizerFactory.d.ts.map