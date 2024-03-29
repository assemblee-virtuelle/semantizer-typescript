import Thing from "./Thing";

export interface ThingWithHelper {
    addStatementFrom(source: Thing): Thing;
    addRdfTypeStatement(value: string): Thing;
    addBooleanStatement(about: string, value: boolean): Thing;
    addStringStatement(about: string, value: string, locale?: string): Thing;
    addDecimalStatement(about: string, value: number): Thing;
    addIntegerStatement(about: string, value: number): Thing;
    addDateStatement(about: string, value: Date): Thing;
    addDatetimeStatement(about: string, value: Date): Thing;
    addTimeStatement(about: string, value: Date): Thing;

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
}