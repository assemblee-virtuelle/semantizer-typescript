var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ContextDefault from "./ContextDefault.js";
import ResourceFactoryDefault from "./FactoryDefault.js";
export class SemantizerDefault {
    constructor(context = {}, semanticResourceFactory) {
        this._context = new ContextDefault(context);
        this._semanticResourceFactory = semanticResourceFactory || new ResourceFactoryDefault(this);
    }
    exportDocument(...input) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    createDocument(parameters) {
        return this.getSemanticResourceFactory().createDocument(parameters);
    }
    importDocument(input, format, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            // fetch the resource
            // pass the resource to the factory (as a Dataset ?)
            return this.getSemanticResourceFactory().loadDocument(input);
        });
    }
    getSemanticResourceFactory() {
        return this._semanticResourceFactory;
    }
    setContext(context) {
        this._context = context;
    }
    // Should return a copy
    getContext() {
        return this._context;
    }
    _getContext() {
        return this._context;
    }
    /*public getPrefix(uri: string): string | undefined {
        return uri.startsWith("http")? undefined: uri.split(':')[0];
    }*/
    shorten(uri) {
        return this._getContext() ? this._getContext().shorten(uri) : uri;
    }
    expand(uri) {
        return this._getContext() ? this._getContext().expand(uri) : uri;
    }
}
export default SemantizerDefault;
//# sourceMappingURL=SemantizerDefault.js.map