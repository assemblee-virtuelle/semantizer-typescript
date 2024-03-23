import DatasetExt from "rdf-ext/lib/Dataset";
import Semantizer from "./Semantizer";
export default interface Resource {
    getSemantizer(): Semantizer;
    countContainedResources(): number;
    addValueForSemanticProperty(property: string, value: string, datatype?: string, language?: string): void;
    addValueForSemanticPropertyUrl(property: string, value: string | string[] | Resource | Resource[]): void;
    addValueForSemanticPropertyBoolean(property: string, value: string): void;
    addValueForSemanticPropertyDecimal(property: string, value: string): void;
    addValueForSemanticPropertyInteger(property: string, value: string): void;
    addValueForSemanticPropertyDate(property: string, value: string): void;
    addValueForSemanticPropertyDatetime(property: string, value: string): void;
    addValueForSemanticPropertyTime(property: string, value: string): void;
    addValueForSemanticPropertyString(property: string, value: string, locale?: string): void;
    addSemanticContainedResource(...resource: Resource[]): void;
    getContainedResources(): Resource[];
    getSemanticId(): string;
    setSemanticId(semanticId: string): void;
    toRdfDatasetExt(): DatasetExt;
}
//# sourceMappingURL=Resource.d.ts.map