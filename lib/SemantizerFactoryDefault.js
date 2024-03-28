import DocumentFactoryDefaultImpl from "./DocumentFactoryDefaultImpl.js";
export default class SemantizerFactoryDefault {
    constructor(semantizer) {
        this._semantizer = semantizer;
        this._documentFactory = new DocumentFactoryDefaultImpl();
    }
    getDocumentFactory() {
        return this._documentFactory;
    }
    loadDocument(uri) {
        return this.getDocumentFactory().loadDocument(uri);
    }
    createDocument(uri, context) {
        return this.getDocumentFactory().createDocument(uri, context);
    }
    getSemantizer() {
        return this._semantizer;
    }
    createContext() {
        throw new Error();
    }
}
//# sourceMappingURL=SemantizerFactoryDefault.js.map