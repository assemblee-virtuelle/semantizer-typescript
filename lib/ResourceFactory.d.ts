import Document from "./Document";
import { ResourceCreationParameters } from "./Semantizer";
export default interface ResourceFactory {
    loadSemanticResource(semanticId: string): Document;
    createSemanticResource(parameters?: ResourceCreationParameters): Document;
}
//# sourceMappingURL=ResourceFactory.d.ts.map