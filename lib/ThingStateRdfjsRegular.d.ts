import Resource from "./Resource";
import Thing from "./Thing";
import QuadExt from 'rdf-ext/lib/Quad';
import NamedNodeExt from "rdf-ext/lib/NamedNode";
import ThingStateRdfjsBase from "./ThingStateRdfjsBase.js";
export declare class ThingStateRdfjsRegular extends ThingStateRdfjsBase {
    constructor(thing: Thing, uri: string);
    isAnonymous(): boolean;
    addStatement(about: string, value: string | Resource, datatype?: string, language?: string): Thing;
    protected createRdfQuad(property: string, value: string | Resource, languageOrDatatype?: string | NamedNodeExt): QuadExt;
}
export default ThingStateRdfjsRegular;
//# sourceMappingURL=ThingStateRdfjsRegular.d.ts.map