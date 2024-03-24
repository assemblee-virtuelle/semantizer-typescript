import { DocumentDefault } from "./DocumentDefault.js";
export default class ResourceFactoryDefault {
    constructor(semantizer) {
        this._semantizer = semantizer;
    }
    loadDocument(semanticId) {
        return new DocumentDefault({ uri: semanticId });
    }
    createDocument(parameters) {
        return new DocumentDefault(parameters);
    }
    getSemantizer() {
        return this._semantizer;
    }
    loadSemanticResource(semanticId) {
        return new DocumentDefault({ uri: semanticId });
    }
    createContext() {
        throw new Error();
    }
}
//# sourceMappingURL=FactoryDefault.js.map