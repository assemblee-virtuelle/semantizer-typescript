import Document from "./Document";
import Thing from "./Thing";
import rdf from 'rdf-ext';

class ThingDefaultImpl implements Thing {

    private _rdfjsDataset: any;

    constructor() {
        this._rdfjsDataset = rdf.dataset();
    }
    
    addStatement(about: string, datatype?: string | undefined, language?: string | undefined): void {
        throw new Error("Method not implemented.");
    }
    addStatementFrom(source: Thing): void {
        throw new Error("Method not implemented.");
    }
    addRdfTypeStatement(value: string): void {
        throw new Error("Method not implemented.");
    }
    addBooleanStatement(about: string, value: boolean): void {
        throw new Error("Method not implemented.");
    }
    addStringStatement(about: string, value: string, locale?: string | undefined): void {
        throw new Error("Method not implemented.");
    }
    addDecimalStatement(about: string, value: number): void {
        throw new Error("Method not implemented.");
    }
    addIntegerStatement(about: string, value: number): void {
        throw new Error("Method not implemented.");
    }
    addDateStatement(about: string, value: Date): void {
        throw new Error("Method not implemented.");
    }
    addDatetimeStatement(about: string, value: Date): void {
        throw new Error("Method not implemented.");
    }
    addTimeStatement(about: string, value: Date): void {
        throw new Error("Method not implemented.");
    }
    filter(by: (property?: string | undefined, value?: string | undefined) => boolean): Thing {
        throw new Error("Method not implemented.");
    }
    getDocument(): Document {
        throw new Error("Method not implemented.");
    }
    getRdfTypeValue(): string | null {
        throw new Error("Method not implemented.");
    }
    getAllRdfTypeValues(): string[] {
        throw new Error("Method not implemented.");
    }
    getBooleanStatementValue(about: string): boolean {
        throw new Error("Method not implemented.");
    }
    getAllBooleanStatementValues(about: string): boolean[] {
        throw new Error("Method not implemented.");
    }
    getStringStatementValue(about: string): string | null {
        throw new Error("Method not implemented.");
    }
    getAllStringStatementValues(about: string): string[] {
        throw new Error("Method not implemented.");
    }
    getDecimalStatementValue(about: string): number {
        throw new Error("Method not implemented.");
    }
    getAllDecimalStatementValues(about: string): number[] {
        throw new Error("Method not implemented.");
    }
    getIntegerStatementValue(about: string): number {
        throw new Error("Method not implemented.");
    }
    getAllIntegerStatementValues(about: string): number[] {
        throw new Error("Method not implemented.");
    }
    getDateStatementValue(about: string): Date {
        throw new Error("Method not implemented.");
    }
    getAllDateStatementValues(about: string): Date[] {
        throw new Error("Method not implemented.");
    }
    getDatetimeStatementValue(about: string): Date {
        throw new Error("Method not implemented.");
    }
    getAllDatetimeStatementValues(about: string): Date[] {
        throw new Error("Method not implemented.");
    }
    getTimeStatementValue(about: string): Date {
        throw new Error("Method not implemented.");
    }
    getAllTimeStatementValues(about: string): Date[] {
        throw new Error("Method not implemented.");
    }
    setRdfTypeStatement(value: string): void {
        throw new Error("Method not implemented.");
    }
    setBooleanStatement(about: string, value: boolean): void {
        throw new Error("Method not implemented.");
    }
    setStringStatement(about: string, value: string, locale?: string | undefined): void {
        throw new Error("Method not implemented.");
    }
    setDecimalStatement(about: string, value: number): void {
        throw new Error("Method not implemented.");
    }
    setIntegerStatement(about: string, value: number): void {
        throw new Error("Method not implemented.");
    }
    setDateStatement(about: string, value: Date): void {
        throw new Error("Method not implemented.");
    }
    setDatetimeStatement(about: string, value: Date): void {
        throw new Error("Method not implemented.");
    }
    setTimeStatement(about: string, value: Date): void {
        throw new Error("Method not implemented.");
    }
    removeAllStatements(about: string): void {
        throw new Error("Method not implemented.");
    }
    removeRdfTypeStatement(value: string): void {
        throw new Error("Method not implemented.");
    }
    removeBooleanStatement(about: string, value: boolean): void {
        throw new Error("Method not implemented.");
    }
    removeStringStatement(about: string, value: string, locale?: string | undefined): void {
        throw new Error("Method not implemented.");
    }
    removeDecimalStatement(about: string, value: number): void {
        throw new Error("Method not implemented.");
    }
    removeIntegerStatement(about: string, value: number): void {
        throw new Error("Method not implemented.");
    }
    removeDateStatement(about: string, value: Date): void {
        throw new Error("Method not implemented.");
    }
    removeDatetimeStatement(about: string, value: Date): void {
        throw new Error("Method not implemented.");
    }
    removeTimeStatement(about: string, value: Date): void {
        throw new Error("Method not implemented.");
    }

}

export default ThingDefaultImpl;