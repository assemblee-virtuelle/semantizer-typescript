import Context from "./Context";
import { Document, ConstructionParameters } from "./Document";
export default interface ResourceFactory {
    loadDocument(semanticId: string): Document;
    createDocument(parameters?: ConstructionParameters): Document;
    createContext(): Context;
}
//# sourceMappingURL=Factory.d.ts.map