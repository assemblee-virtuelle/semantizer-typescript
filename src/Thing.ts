import DatasetExt from "rdf-ext/lib/Dataset";
import Context from "./Context";
import Document from "./Document";
import Resource from "./Resource";

export interface Thing extends Resource {
    getDocument(): Document;
    filter(by: (property?: string, value?: string, datatype?: string) => boolean): Thing;
    isAnonymous(): boolean;
    getContext(): Context | undefined;
    expand(uri: string): string;
    shorten(uri: string): string;
    equals(other: Thing): boolean;
    toRdfDatasetExt(): DatasetExt;
    
    addStatement(about: string, value: string | Resource, datatype?: string, language?: string): Thing;
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

    setRdfTypeStatement(value: string): Thing;
    setBooleanStatement(about: string, value: boolean): Thing;
    setStringStatement(about: string, value: string, locale?: string): Thing;
    setDecimalStatement(about: string, value: number): Thing;
    setIntegerStatement(about: string, value: number): Thing;
    setDateStatement(about: string, value: Date): Thing;
    setDatetimeStatement(about: string, value: Date): Thing;
    setTimeStatement(about: string, value: Date): Thing;

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