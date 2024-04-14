import { FactoryImpl } from "./core-default/FactoryImpl.js";
export default class SemantizerFactoryDefault {
    constructor(semantizer) {
        this._semantizer = semantizer;
        this._documentFactory = new FactoryImpl();
    }
    getDocumentFactory() {
        return this._documentFactory;
    }
    loadDocument(uri) {
        throw new Error(""); //return this.getDocumentFactory().loadDocument(uri);
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