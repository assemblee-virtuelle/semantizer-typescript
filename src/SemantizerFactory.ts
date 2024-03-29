import Context from "./common/Context";
import { Document } from "./document/Document";

export default interface SemantizerFactory {
    loadDocument(semanticId: string): Document;
    createDocument(uri?: string, context?: Context): Document;
    createContext(): Context;
}