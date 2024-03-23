import Resource from "./Resource";
import ResourceFactory from "./ResourceFactory";
import Semantizer, { ResourceCreationParameters } from "./Semantizer";
export default class ResourceFactoryDefault implements ResourceFactory {
    private _semantizer;
    constructor(semantizer: Semantizer);
    getSemantizer(): Semantizer;
    loadSemanticResource(semanticId: string): Resource;
    createSemanticResource(parameters?: ResourceCreationParameters): Resource;
}
//# sourceMappingURL=ResourceFactoryDefault.d.ts.map