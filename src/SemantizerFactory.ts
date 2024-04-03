import Context from "./core/Context";
import { DocumentBase } from "./core/Document";

export default interface SemantizerFactory {
    loadDocument(semanticId: string): DocumentBase;
    createDocument(uri?: string, context?: Context): DocumentBase;
    createContext(): Context;
}