import Context from "./Context.js";
import { Document, ConstructionParameters } from "./Document.js";
import ResourceFactory from "./Factory.js";
import Semantizer from "./Semantizer.js";
export default class ResourceFactoryDefault implements ResourceFactory {
    private _semantizer;
    constructor(semantizer: Semantizer);
    loadDocument(semanticId: string): Document;
    createDocument(parameters?: ConstructionParameters): Document;
    getSemantizer(): Semantizer;
    loadSemanticResource(semanticId: string): Document;
    createContext(): Context;
}
//# sourceMappingURL=FactoryDefault.d.ts.map