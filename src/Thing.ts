import Document from "./Document";
import Resource from "./Resource";

export interface Thing extends Resource {
    addStatement(about: string, datatype?: string, language?: string): void;
    addStatementFrom(source: Thing): void;
    addRdfTypeStatement(value: string): void;
    addBooleanStatement(about: string, value: boolean): void;
    addStringStatement(about: string, value: string, locale?: string): void;
    addDecimalStatement(about: string, value: number): void;
    addIntegerStatement(about: string, value: number): void;
    addDateStatement(about: string, value: Date): void;
    addDatetimeStatement(about: string, value: Date): void;
    addTimeStatement(about: string, value: Date): void;

    filter(by: (property?: string, value?: string) => boolean): Thing;

    getDocument(): Document;

    getRdfTypeValue(): string | null;
    getAllRdfTypeValues(): string[];
    getBooleanStatementValue(about: string): boolean;
    getAllBooleanStatementValues(about: string): boolean[];
    getStringStatementValue(about: string): string | null;
    getAllStringStatementValues(about: string): string[];
    getDecimalStatementValue(about: string): number;
    getAllDecimalStatementValues(about: string): number[];
    getIntegerStatementValue(about: string): number;
    getAllIntegerStatementValues(about: string): number[];
    getDateStatementValue(about: string): Date;
    getAllDateStatementValues(about: string): Date[];
    getDatetimeStatementValue(about: string): Date;
    getAllDatetimeStatementValues(about: string): Date[];
    getTimeStatementValue(about: string): Date;
    getAllTimeStatementValues(about: string): Date[];

    setRdfTypeStatement(value: string): void;
    setBooleanStatement(about: string, value: boolean): void;
    setStringStatement(about: string, value: string, locale?: string): void;
    setDecimalStatement(about: string, value: number): void;
    setIntegerStatement(about: string, value: number): void;
    setDateStatement(about: string, value: Date): void;
    setDatetimeStatement(about: string, value: Date): void;
    setTimeStatement(about: string, value: Date): void;

    removeAllStatements(about: string): void;
    removeRdfTypeStatement(value: string): void;
    removeBooleanStatement(about: string, value: boolean): void;
    removeStringStatement(about: string, value: string, locale?: string): void;
    removeDecimalStatement(about: string, value: number): void;
    removeIntegerStatement(about: string, value: number): void;
    removeDateStatement(about: string, value: Date): void;
    removeDatetimeStatement(about: string, value: Date): void;
    removeTimeStatement(about: string, value: Date): void;
}

export default Thing;