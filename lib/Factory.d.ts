import Context from "./Context";
import { Document } from "./Document";
export default interface ResourceFactory {
    loadDocument(semanticId: string): Document;
    createDocument(uri?: string, context?: Context): Document;
    createContext(): Context;
}
//# sourceMappingURL=Factory.d.ts.map