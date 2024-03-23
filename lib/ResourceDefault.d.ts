import BlankNodeExt from "rdf-ext/lib/BlankNode";
import Semantizer, { ResourceCreationParameters } from "./Semantizer";
import Resource from "./Resource";
import QuadExt from 'rdf-ext/lib/Quad';
import DatasetExt from "rdf-ext/lib/Dataset";
import NamedNodeExt from "rdf-ext/lib/NamedNode";
interface ConstructionParameters {
    semantizer: Semantizer;
    rdfDataset?: any;
    semanticId?: string;
    semanticType?: string | string[];
    resources?: Resource | Resource[];
}
export default class ResourceDefault implements Resource {
    private _semantizer;
    private _rdfDataset;
    private _semanticId?;
    static load(semantizer: Semantizer, rdfDataset: any): ResourceDefault;
    /**
     *
     * @param semantizer
     * @param parameters semanticId = uri or name of blank node
     * @returns
     */
    static create(semantizer: Semantizer, parameters?: ResourceCreationParameters): ResourceDefault;
    protected constructor(parameters: ConstructionParameters);
    getSemanticId(): string;
    setSemanticId(semanticId: string): void;
    removeSemanticId(): void;
    setSemanticType(semanticType: string | string[]): void;
    addSemanticContainedResource(...resource: Resource[]): void;
    addValueForSemanticProperty(property: string, valueOrResource: string | Resource, datatype?: string, language?: string): void;
    addValueForSemanticPropertyBoolean(property: string, value: string): void;
    addValueForSemanticPropertyDecimal(property: string, value: string): void;
    addValueForSemanticPropertyInteger(property: string, value: string): void;
    addValueForSemanticPropertyDate(property: string, value: string): void;
    addValueForSemanticPropertyDatetime(property: string, value: string): void;
    addValueForSemanticPropertyTime(property: string, value: string): void;
    addValueForSemanticPropertyString(property: string, value: string, locale?: string): void;
    private isSemanticAnonymous;
    addValueForSemanticPropertyUrl(property: string, valueOrResource: string | Resource): void;
    countContainedResources(): number;
    isSemanticTypeOf(semanticType: string): boolean;
    getAllValuesOfSemanticPropertyUrl(property: string): string[];
    getContainedResources(): Resource[];
    protected addRdfQuad(quad: QuadExt): void;
    protected createRdfQuad(subject: string | BlankNodeExt, property: string, value: string | Resource, languageOrDatatype?: string | NamedNodeExt): QuadExt;
    getSemantizer(): Semantizer;
    /**
     * Return a deep copy of the underlying RDF dataset.
     * @returns
     */
    toRdfDatasetExt(): DatasetExt;
}
export {};
//# sourceMappingURL=ResourceDefault.d.ts.map