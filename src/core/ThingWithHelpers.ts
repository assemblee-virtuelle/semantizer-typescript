import ThingBase from "./Thing";

export interface ThingWithHelpers {
    addStatementFrom(source: ThingBase): ThingBase;
    addRdfTypeStatement(value: string): ThingBase;
    addBooleanStatement(about: string, value: boolean): ThingBase;
    addStringStatement(about: string, value: string, locale?: string): ThingBase;
    addDecimalStatement(about: string, value: number): ThingBase;
    addIntegerStatement(about: string, value: number): ThingBase;
    addDateStatement(about: string, value: Date): ThingBase;
    addDatetimeStatement(about: string, value: Date): ThingBase;
    addTimeStatement(about: string, value: Date): ThingBase;

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

    setRdfTypeStatement(value: string): ThingBase;
    setBooleanStatement(about: string, value: boolean): ThingBase;
    setStringStatement(about: string, value: string, locale?: string): ThingBase;
    setDecimalStatement(about: string, value: number): ThingBase;
    setIntegerStatement(about: string, value: number): ThingBase;
    setDateStatement(about: string, value: Date): ThingBase;
    setDatetimeStatement(about: string, value: Date): ThingBase;
    setTimeStatement(about: string, value: Date): ThingBase;

    removeRdfTypeStatement(value: string): ThingBase;
    removeBooleanStatement(about: string, value: boolean): ThingBase;
    removeStringStatement(about: string, value: string, locale?: string): ThingBase;
    removeDecimalStatement(about: string, value: number): ThingBase;
    removeIntegerStatement(about: string, value: number): ThingBase;
    removeDateStatement(about: string, value: Date): ThingBase;
    removeDatetimeStatement(about: string, value: Date): ThingBase;
    removeTimeStatement(about: string, value: Date): ThingBase;
}