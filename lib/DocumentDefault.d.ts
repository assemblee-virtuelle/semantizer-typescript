import Semantizer, { ResourceCreationParameters } from "./Semantizer";
import Document from "./Document";
import QuadExt from 'rdf-ext/lib/Quad';
import DatasetExt from "rdf-ext/lib/Dataset";
import NamedNodeExt from "rdf-ext/lib/NamedNode";
interface ConstructionParameters {
    semantizer: Semantizer;
    rdfDataset?: any;
    semanticId?: string;
    semanticType?: string | string[];
    resources?: Document | Document[];
}
export default class DocumentDefault implements Document {
    private _semantizer;
    private _rdfDataset;
    private _semanticId;
    static load(semantizer: Semantizer, rdfDataset: any): DocumentDefault;
    /**
     *
     * @param semantizer
     * @param parameters semanticId = uri or name of blank node
     * @returns
     */
    static create(semantizer: Semantizer, parameters?: ResourceCreationParameters): DocumentDefault;
    protected constructor(parameters: ConstructionParameters);
    getSemanticId(): string;
    setSemanticId(semanticId: string): void;
    removeSemanticId(): void;
    isEmpty(): boolean;
    getStatementsAbout(subject: string | Document, property?: string): Document;
    getAllValuesAboutStatement(property: string, subject?: string | Document): string[];
    addStatementAbout(property: string, valueOrResource: string | Document, subject?: string | Document, datatype?: string, language?: string): void;
    getFirstStringValueAboutStatement(property: string, subject?: string | Document): string | null;
    getAllStringValuesAboutStatement(property: string, subject?: string | Document): string[];
    addRdfTypeStatement(value: string | Document, subject?: string | Document): void;
    addStringStatementAbout(property: string, value: string, locale?: string, subject?: string | Document): void;
    addBooleanStatementAbout(property: string, value: boolean, subject?: string | Document): void;
    addDecimalStatementAbout(property: string, value: number, subject?: string | Document): void;
    addIntegerStatementAbout(property: string, value: number, subject?: string | Document): void;
    addDateStatementAbout(property: string, value: Date, subject?: string | Document): void;
    addDatetimeStatementAbout(property: string, value: Date, subject?: string | Document): void;
    addTimeStatementAbout(property: string, value: Date, subject?: string | Document): void;
    countStatementsAbout(subject?: string | Document, property?: string): number;
    countSubjects(): number;
    getFirstRdfTypeValue(subject?: string | Document): string | null;
    getAllRdfTypeValues(subject?: string | Document): string[];
    hasStatementsAbout(subject: string | Document | undefined, property: string, ...hasValues: string[]): boolean;
    isSemanticTypeOf(semanticType: string): boolean;
    protected addRdfQuad(quad: QuadExt): void;
    filter(by: (subject?: string | Document, property?: string, value?: string) => boolean): Document;
    addStatementFrom(source: Document, subject?: string | Document): void;
    protected createRdfQuad(subject: string | Document, property: string, value: string | Document, languageOrDatatype?: string | NamedNodeExt): QuadExt;
    getSemantizer(): Semantizer;
    /**
     * Return a deep copy of the underlying RDF dataset.
     * @returns
     */
    toRdfDatasetExt(): DatasetExt;
}
export {};
//# sourceMappingURL=DocumentDefault.d.ts.map