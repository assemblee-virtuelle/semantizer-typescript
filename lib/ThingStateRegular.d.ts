import Resource from "./Resource";
import Thing from "./Thing";
import ThingState from "./ThingState";
import QuadExt from 'rdf-ext/lib/Quad';
import NamedNodeExt from "rdf-ext/lib/NamedNode";
import Context from "./Context";
import DatasetExt from "rdf-ext/lib/Dataset";
export default class ThingStateRegular implements ThingState {
    private _uri;
    private _thing;
    private _rdfjsDataset;
    constructor(thing: Thing, uri: string);
    getThing(): Thing;
    getUri(): string;
    isAnonymous(): boolean;
    protected getDataset(): any;
    getContext(): Context | undefined;
    expand(uri: string): string;
    shorten(uri: string): string;
    addStatement(about: string, value: string | Resource, datatype?: string, language?: string): Thing;
    protected addRdfQuad(quad: QuadExt): void;
    getAllValuesAboutStatement(property: string): string[];
    protected createRdfQuad(property: string, value: string | Resource, languageOrDatatype?: string | NamedNodeExt): QuadExt;
    toRdfDatasetExt(): DatasetExt;
}
//# sourceMappingURL=ThingStateRegular.d.ts.map