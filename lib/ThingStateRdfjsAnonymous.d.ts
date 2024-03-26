import Resource from "./Resource";
import Thing from "./Thing";
import ThingStateRdfjsRegular from "./ThingStateRdfjsRegular.js";
import BlankNodeExt from "rdf-ext/lib/BlankNode";
import NamedNodeExt from "rdf-ext/lib/NamedNode";
import QuadExt from "rdf-ext/lib/Quad";
export declare class ThingStateRdfjsAnonymous extends ThingStateRdfjsRegular {
    private _blankNode;
    constructor(thing: Thing, nameHint?: string);
    protected getBlankNode(): BlankNodeExt;
    getUri(): string;
    isAnonymous(): boolean;
    protected createRdfQuad(property: string, value: string | Resource, languageOrDatatype?: string | NamedNodeExt): QuadExt;
}
export default ThingStateRdfjsAnonymous;
//# sourceMappingURL=ThingStateRdfjsAnonymous.d.ts.map