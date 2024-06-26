import { Context } from "./core/src/Common";
import { DocumentWithNonDestructiveOperations } from "./core/src/Document";

export default interface SemantizerFactory {
    loadDocument(semanticId: string): DocumentWithNonDestructiveOperations<any, any>;
    createDocument(uri?: string, context?: Context): DocumentWithNonDestructiveOperations<any, any>;
    createContext(): Context;
}