import Context from "./Context";
import { Document, ConstructionParameters } from "./Document";

export default interface ResourceFactory {
    loadDocument(semanticId: string): Document;
    createDocument(uri?: string, context?: Context): Document;
    createContext(): Context;
}