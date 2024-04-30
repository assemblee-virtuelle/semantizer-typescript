import { Context } from "./core/Common";
import { DocumentWithNonDestructiveOperations } from "./core/Document";
export default interface SemantizerFactory {
    loadDocument(semanticId: string): DocumentWithNonDestructiveOperations<any, any>;
    createDocument(uri?: string, context?: Context): DocumentWithNonDestructiveOperations<any, any>;
    createContext(): Context;
}
//# sourceMappingURL=SemantizerFactory.d.ts.map