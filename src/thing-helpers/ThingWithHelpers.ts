import Thing from "../core/Thing";

export interface ThingWithHelpers {
    addStatementFrom(source: Thing): ThingWithHelpers;
    addRdfTypeStatement(value: string): ThingWithHelpers;
    addBooleanStatement(about: string, value: boolean): ThingWithHelpers;
    addStringStatement(about: string, value: string, locale?: string): ThingWithHelpers;
    addDecimalStatement(about: string, value: number): ThingWithHelpers;
    addIntegerStatement(about: string, value: number): ThingWithHelpers;
    addDateStatement(about: string, value: Date): ThingWithHelpers;
    addDatetimeStatement(about: string, value: Date): ThingWithHelpers;
    addTimeStatement(about: string, value: Date): ThingWithHelpers;

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

    setRdfTypeStatement(value: string): ThingWithHelpers;
    setBooleanStatement(about: string, value: boolean): ThingWithHelpers;
    setStringStatement(about: string, value: string, locale?: string): ThingWithHelpers;
    setDecimalStatement(about: string, value: number): ThingWithHelpers;
    setIntegerStatement(about: string, value: number): ThingWithHelpers;
    setDateStatement(about: string, value: Date): ThingWithHelpers;
    setDatetimeStatement(about: string, value: Date): ThingWithHelpers;
    setTimeStatement(about: string, value: Date): ThingWithHelpers;

    removeRdfTypeStatement(value: string): ThingWithHelpers;
    removeBooleanStatement(about: string, value: boolean): ThingWithHelpers;
    removeStringStatement(about: string, value: string, locale?: string): ThingWithHelpers;
    removeDecimalStatement(about: string, value: number): ThingWithHelpers;
    removeIntegerStatement(about: string, value: number): ThingWithHelpers;
    removeDateStatement(about: string, value: Date): ThingWithHelpers;
    removeDatetimeStatement(about: string, value: Date): ThingWithHelpers;
    removeTimeStatement(about: string, value: Date): ThingWithHelpers;
}

export default ThingWithHelpers;