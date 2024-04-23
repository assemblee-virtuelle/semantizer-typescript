export default class SemantizerFactoryDefault {
    constructor(semantizer) {
        this._semantizer = semantizer;
    }
    loadDocument(uri) {
        throw new Error("Method not implemented.");
    }
    createDocument(uri, context) {
        throw new Error("Method not implemented.");
    }
    getSemantizer() {
        return this._semantizer;
    }
    createContext() {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=SemantizerFactoryDefault.js.map