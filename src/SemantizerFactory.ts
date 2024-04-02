import Context from "./core/Context";
import { Document } from "./core/Document";

export default interface SemantizerFactory {
    loadDocument(semanticId: string): Document;
    createDocument(uri?: string, context?: Context): Document;
    createContext(): Context;
}