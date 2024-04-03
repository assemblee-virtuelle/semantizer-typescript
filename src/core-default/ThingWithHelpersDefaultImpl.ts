import Resource from "../core/Resource";
import ThingBase from "../core/Thing";
import ThingDefaultImpl from "./ThingDefaultImpl";

export class ThingWithHelpers extends ThingDefaultImpl implements ThingWithHelpers {

    ////////////// Adder //////////////
    public addStatement(about: string, value: string | Resource, datatype?: string, language?: string): ThingBase {
        return this.getState().addStatement(about, value, datatype, language);
    }

    public addStatementFrom(source: ThingBase): ThingBase {
        throw new Error("Method not implemented.");
    }

    public addRdfTypeStatement(value: string): ThingBase {
        return this.addStatement("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", value);
    }

    public addBooleanStatement(about: string, value: boolean): ThingBase {
        return this.addStatement(about, value.toString(), "xsd:boolean");
    }

    public addStringStatement(about: string, value: string, locale?: string): ThingBase {
        return this.addStatement(about, value, "xsd:string", locale);
    }

    public addDecimalStatement(about: string, value: number): ThingBase {
        return this.addStatement(about, value.toString(), "xsd:decimal");
    }

    public addIntegerStatement(about: string, value: number): ThingBase {
        return this.addStatement(about, value.toString(), "xsd:integer");
    }

    public addDateStatement(about: string, value: Date): ThingBase {
        return this.addStatement(about, value.toString(), "xsd:date");
    }

    public addDatetimeStatement(about: string, value: Date): ThingBase {
        return this.addStatement(about, value.toString(), "xsd:datetime");
    }

    public addTimeStatement(about: string, value: Date): ThingBase {
        return this.addStatement(about, value.toString(), "xsd:time");
    }

    ////////////// Getters //////////////
    public getRdfTypeValue(): string | null {
        const values = this.getAllRdfTypeValues();
        return values.length >= 1? values[0]: null;
    }

    public getAllRdfTypeValues(): string[] {
        return this.getAllValuesAboutStatement("http://www.w3.org/1999/02/22-rdf-syntax-ns#type");
    }

    public getBooleanStatementValue(about: string): boolean {
        throw new Error("Method not implemented.");
    }

    public getAllBooleanStatementValues(about: string): boolean[] {
        throw new Error("Method not implemented.");
    }

    public getStringStatementValue(about: string): string | null {
        const values = this.getAllStringStatementValues(about);
        return values.length >= 1? values[0]: null;
    }

    public getAllStringStatementValues(about: string): string[] {
        return this.getAllValuesAboutStatement(about);
    }

    public getDecimalStatementValue(about: string): number {
        throw new Error("Method not implemented.");
    }

    public getAllDecimalStatementValues(about: string): number[] {
        throw new Error("Method not implemented.");
    }

    public getIntegerStatementValue(about: string): number {
        throw new Error("Method not implemented.");
    }

    public getAllIntegerStatementValues(about: string): number[] {
        throw new Error("Method not implemented.");
    }

    public getDateStatementValue(about: string): Date {
        throw new Error("Method not implemented.");
    }

    public getAllDateStatementValues(about: string): Date[] {
        throw new Error("Method not implemented.");
    }

    public getDatetimeStatementValue(about: string): Date {
        throw new Error("Method not implemented.");
    }

    public getAllDatetimeStatementValues(about: string): Date[] {
        throw new Error("Method not implemented.");
    }

    public getTimeStatementValue(about: string): Date {
        throw new Error("Method not implemented.");
    }

    public getAllTimeStatementValues(about: string): Date[] {
        throw new Error("Method not implemented.");
    }

    ////////////// Setters //////////////
    public setStatement(about: string, value: string): ThingBase {
        throw new Error("Method not implemented.");
    }

    public setRdfTypeStatement(value: string): ThingBase {
        throw new Error("Method not implemented.");
    }

    public setBooleanStatement(about: string, value: boolean): ThingBase {
        throw new Error("Method not implemented.");
    }

    public setStringStatement(about: string, value: string, locale?: string): ThingBase {
        throw new Error("Method not implemented.");
    }

    public setDecimalStatement(about: string, value: number): ThingBase {
        throw new Error("Method not implemented.");
    }

    public setIntegerStatement(about: string, value: number): ThingBase {
        throw new Error("Method not implemented.");
    }

    public setDateStatement(about: string, value: Date): ThingBase {
        throw new Error("Method not implemented.");
    }

    public setDatetimeStatement(about: string, value: Date): ThingBase {
        throw new Error("Method not implemented.");
    }

    public setTimeStatement(about: string, value: Date): ThingBase {
        throw new Error("Method not implemented.");
    }

    ////////////// Removers //////////////
    public removeStatement(about: string, value: string | Resource, datatype?: string, language?: string): ThingBase {
        throw new Error("Method not implemented.");
    }

    public removeRdfTypeStatement(value: string): ThingBase {
        throw new Error("Method not implemented.");
    }

    public removeBooleanStatement(about: string, value: boolean): ThingBase {
        throw new Error("Method not implemented.");
    }

    public removeStringStatement(about: string, value: string, locale?: string): ThingBase {
        throw new Error("Method not implemented.");
    }

    public removeDecimalStatement(about: string, value: number): ThingBase {
        throw new Error("Method not implemented.");
    }

    public removeIntegerStatement(about: string, value: number): ThingBase {
        throw new Error("Method not implemented.");
    }

    public removeDateStatement(about: string, value: Date): ThingBase {
        throw new Error("Method not implemented.");
    }

    public removeDatetimeStatement(about: string, value: Date): ThingBase {
        throw new Error("Method not implemented.");
    }

    public removeTimeStatement(about: string, value: Date): ThingBase {
        throw new Error("Method not implemented.");
    }

}

export default ThingWithHelpers;