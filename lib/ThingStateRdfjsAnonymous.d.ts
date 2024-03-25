import Resource from "./Resource";
import Thing from "./Thing";
import ThingStateRdfjsBase from "./ThingStateRdfjsBase.js";
import BlankNodeExt from "rdf-ext/lib/BlankNode";
import NamedNodeExt from "rdf-ext/lib/NamedNode";
import QuadExt from "rdf-ext/lib/Quad";
export declare class ThingStateRdfjsAnonymous extends ThingStateRdfjsBase {
    private _blankNode;
    constructor(thing: Thing, nameHint?: string);
    protected getBlankNode(): BlankNodeExt;
    getUri(): string;
    isAnonymous(): boolean;
    addStatement(about: string, value: string | Resource, datatype?: string, language?: string): Thing;
    protected createRdfQuad(property: string, value: string | Resource, languageOrDatatype?: string | NamedNodeExt): QuadExt;
}
export default ThingStateRdfjsAnonymous;
//# sourceMappingURL=ThingStateRdfjsAnonymous.d.ts.map