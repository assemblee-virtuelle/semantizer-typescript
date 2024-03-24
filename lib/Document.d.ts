import DatasetExt from "rdf-ext/lib/Dataset";
import Semantizer from "./Semantizer";
export default interface Document {
    getSemantizer(): Semantizer;
    getSemanticId(): string;
    setSemanticId(semanticId: string): void;
    isEmpty(): boolean;
    countSubjects(): number;
    countStatementsAbout(subject: string | Document, property?: string): number;
    hasStatementsAbout(subject: string | Document, property: string, ...hasValues: string[]): boolean;
    filter(by: (subject?: string | Document, property?: string, value?: string) => boolean): Document;
    addStatementAbout(property: string, valueOrDocument: string | Document, subject?: string | Document, datatype?: string, language?: string): void;
    addStatementFrom(source: Document, subject?: string | Document): void;
    addRdfTypeStatement(value: string | Document, subject?: string | Document): void;
    addBooleanStatementAbout(property: string, value: boolean, subject?: string | Document): void;
    addStringStatementAbout(property: string, value: string, locale?: string, subject?: string | Document): void;
    addDecimalStatementAbout(property: string, value: number, subject?: string | Document): void;
    addIntegerStatementAbout(property: string, value: number, subject?: string | Document): void;
    addDateStatementAbout(property: string, value: Date, subject?: string | Document): void;
    addDatetimeStatementAbout(property: string, value: Date, subject?: string | Document): void;
    addTimeStatementAbout(property: string, value: Date, subject?: string | Document): void;
    getStatementsAbout(subject: string | Document, property?: string): Document;
    getFirstRdfTypeValue(subject?: string | Document): string | null;
    getAllRdfTypeValues(subject?: string | Document): string[];
    getFirstStringValueAboutStatement(property: string, subject?: string | Document): string | null;
    getAllStringValuesAboutStatement(property: string, subject?: string | Document): string[];
    toRdfDatasetExt(): DatasetExt;
}
//# sourceMappingURL=Document.d.ts.map