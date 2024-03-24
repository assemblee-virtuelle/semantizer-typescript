import { Document, ConstructionParameters } from "./Document";
import QuadExt from 'rdf-ext/lib/Quad';
import DatasetExt from "rdf-ext/lib/Dataset";
import NamedNodeExt from "rdf-ext/lib/NamedNode";
import Thing from "./Thing";
import Resource from "./Resource";
import Contextualized from "./Contextualized";
import Context from "./Context";
export declare class DocumentDefault implements Document, Contextualized {
    private _rdfDataset;
    private _uri;
    private _things;
    private _context?;
    constructor(parameters?: ConstructionParameters);
    setContext(context: Context): void;
    getContext(): Context | undefined;
    expand(uri: string): string;
    shorten(uri: string): string;
    addThing(thing: Thing): Document;
    addDocument(document: Document): Document;
    getThing(uri: string): Thing | null;
    createSelfDescribingThing(): Thing;
    createThing(nameHintOrUri?: string): Thing;
    createAnonymousThing(nameHint?: string): Thing;
    removeThing(): void;
    getUri(): string;
    setUri(uri: string): void;
    isEmpty(): boolean;
    getAllThings(): Thing[];
    countThings(): number;
    hasStatementsAbout(subject: string | Resource | undefined, property: string, ...hasValues: string[]): boolean;
    protected addRdfQuad(quad: QuadExt): void;
    filter(by: (subject?: string | Resource, property?: string, value?: string) => boolean): Thing;
    protected createRdfQuad(subject: string | Document, property: string, value: string | Document, languageOrDatatype?: string | NamedNodeExt): QuadExt;
    /**
     * Return a deep copy of the underlying RDF dataset.
     * @returns
     */
    toRdfDatasetExt(): DatasetExt;
}
export default DocumentDefault;
//# sourceMappingURL=DocumentDefault.d.ts.map