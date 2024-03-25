import { DocumentDefaultImpl } from "./DocumentDefaultImpl.js";
export default class ResourceFactoryDefault {
    constructor(semantizer) {
        this._semantizer = semantizer;
    }
    loadDocument(semanticId) {
        return new DocumentDefaultImpl(semanticId);
    }
    createDocument(uri, context) {
        return new DocumentDefaultImpl(uri, context);
    }
    getSemantizer() {
        return this._semantizer;
    }
    loadSemanticResource(semanticId) {
        return new DocumentDefaultImpl(semanticId);
    }
    createContext() {
        throw new Error();
    }
}
//# sourceMappingURL=FactoryDefault.js.map