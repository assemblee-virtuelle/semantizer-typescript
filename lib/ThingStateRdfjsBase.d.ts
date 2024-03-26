import BlankNodeExt from "rdf-ext/lib/BlankNode";
import DatasetExt from "rdf-ext/lib/Dataset";
import LiteralExt from "rdf-ext/lib/Literal";
import NamedNodeExt from "rdf-ext/lib/NamedNode";
import QuadExt from "rdf-ext/lib/Quad";
import Resource from "./Resource";
import Thing from "./Thing";
import { ThingStateDefaultBase } from "./ThingStateDefaultBase.js";
export declare abstract class ThingStateRdfjsBase extends ThingStateDefaultBase {
    private _rdfjsDataset;
    constructor(thing: Thing, uri: string);
    protected getDataset(): any;
    protected addRdfQuad(quad: QuadExt): void;
    toRdfDatasetExt(): DatasetExt;
    getAllValuesAboutStatement(property: string): string[];
    addStatement(about: string, value: string | Resource, datatype?: string, language?: string): Thing;
    protected isBlankNode(resource: Resource): boolean;
    protected getDocumentDataset(): DatasetExt;
    protected getBlankNode(resource: Resource): BlankNodeExt;
    protected getNamedNode(resource: Resource): NamedNodeExt;
    protected getLiteral(value: string, languageOrDatatype?: string | NamedNodeExt): LiteralExt;
    protected getNamedNodeOrBlankNode(resource: Resource): NamedNodeExt | BlankNodeExt;
    protected getLiteralOrNamedNodeOrBlankNode(value: string | Resource, languageOrDatatype?: string | NamedNodeExt): LiteralExt | NamedNodeExt | BlankNodeExt;
    protected createRdfQuad(property: string, value: string | Resource, languageOrDatatype?: string | NamedNodeExt): QuadExt;
}
export default ThingStateRdfjsBase;
//# sourceMappingURL=ThingStateRdfjsBase.d.ts.map