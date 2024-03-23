import DatasetExt from "rdf-ext/lib/Dataset";
import Semantizer from "./Semantizer";

export default interface Document {
    getSemantizer(): Semantizer;
    countContainedResources(): number;

    getStatementsAbout(subject: string | Document, property?: string): Document | undefined;
    countStatementsAbout(subject: string | Document): number
    /*isDocument(): boolean;
    isContainer(): boolean;
    isObject(): boolean;*/

    addStatementAbout(property: string, valueOrResource: string | Document, datatype?: string, subject?: string | Document, language?: string): void;
    addBooleanStatementAbout(property: string, value: boolean, subject: string | Document): void;
    addStringStatementAbout(property: string, value: string, locale?: string, subject?: string | Document): void;
    addDecimalStatementAbout(property: string, value: string, subject: string | Document): void;
    addIntegerStatementAbout(property: string, value: string, subject: string | Document): void;
    addDateStatementAbout(property: string, value: string, subject: string | Document): void;
    addDatetimeStatementAbout(property: string, value: string, subject: string | Document): void;
    addTimeStatementAbout(property: string, value: string, subject: string | Document): void;
    
    /*addValueForSemanticProperty(property: string, value: string, datatype?: string, language?: string): void;
    addValueForSemanticPropertyUrl(property: string, value: string | string[] | Document | Document[]): void;
    addValueForSemanticPropertyBoolean(property: string, value: string): void;
    addValueForSemanticPropertyDecimal(property: string, value: string): void;
    addValueForSemanticPropertyInteger(property: string, value: string): void;
    addValueForSemanticPropertyDate(property: string, value: string): void;
    addValueForSemanticPropertyDatetime(property: string, value: string): void;
    addValueForSemanticPropertyTime(property: string, value: string): void;
    addValueForSemanticPropertyString(property: string, value: string, locale?: string): void;*/

    addSemanticContainedResource(...resource: Document[]): void;
    getContainedResources(): Document[];
    getSemanticId(): string;
    setSemanticId(semanticId: string): void;
    toRdfDatasetExt(): DatasetExt;
}