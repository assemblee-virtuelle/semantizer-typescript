import DocumentDefault from "./DocumentDefault.js";
export default class ResourceFactoryDefault {
    constructor(semantizer) {
        this._semantizer = semantizer;
    }
    getSemantizer() {
        return this._semantizer;
    }
    loadSemanticResource(semanticId) {
        return DocumentDefault.load(this.getSemantizer(), semanticId);
    }
    createSemanticResource(parameters) {
        return DocumentDefault.create(this.getSemantizer(), parameters);
    }
}
//# sourceMappingURL=ResourceFactoryDefault.js.map