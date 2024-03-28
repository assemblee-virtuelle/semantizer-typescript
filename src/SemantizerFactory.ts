import Context from "./Context";
import { Document } from "./Document";

export default interface SemantizerFactory {
    loadDocument(semanticId: string): Document;
    createDocument(uri?: string, context?: Context): Document;
    createContext(): Context;
}