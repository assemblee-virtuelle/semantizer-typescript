import Context from "./contracts/Context";
import { Document } from "./contracts/Document";

export default interface SemantizerFactory {
    loadDocument(semanticId: string): Document;
    createDocument(uri?: string, context?: Context): Document;
    createContext(): Context;
}