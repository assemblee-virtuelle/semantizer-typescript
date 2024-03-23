import Resource from "./Document";
import { ResourceCreationParameters } from "./Semantizer";
export default interface ResourceFactory {
    loadSemanticResource(semanticId: string): Resource;
    createSemanticResource(parameters?: ResourceCreationParameters): Resource;
}
//# sourceMappingURL=ResourceFactory.d.ts.map