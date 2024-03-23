import ResourceDefault from "./ResourceDefault.js";
export default class ResourceFactoryDefault {
    constructor(semantizer) {
        this._semantizer = semantizer;
    }
    getSemantizer() {
        return this._semantizer;
    }
    loadSemanticResource(semanticId) {
        return ResourceDefault.load(this.getSemantizer(), semanticId);
    }
    createSemanticResource(parameters) {
        return ResourceDefault.create(this.getSemantizer(), parameters);
    }
}
//# sourceMappingURL=ResourceFactoryDefault.js.map