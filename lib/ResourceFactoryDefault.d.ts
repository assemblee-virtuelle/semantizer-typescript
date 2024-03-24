import Document from "./Document";
import ResourceFactory from "./ResourceFactory";
import Semantizer, { ResourceCreationParameters } from "./Semantizer";
export default class ResourceFactoryDefault implements ResourceFactory {
    private _semantizer;
    constructor(semantizer: Semantizer);
    getSemantizer(): Semantizer;
    loadSemanticResource(semanticId: string): Document;
    createSemanticResource(parameters?: ResourceCreationParameters): Document;
}
//# sourceMappingURL=ResourceFactoryDefault.d.ts.map