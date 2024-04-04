import Resource from "../core/Resource";
import Thing from "../core/Thing";
import ThingWithHelpers from "./ThingWithHelpers";

type Constructor<T = {}> = new (...args: any[]) => T;

export function ThingWithHelpersMixin<TBase extends Constructor<Thing>>(Base: TBase) {
    return class Helpers extends Base implements ThingWithHelpers {

        ////////////// Adder //////////////
        public addStatement(about: string, value: string | Resource, datatype?: string, language?: string): Helpers {
            return this.addStatement(about, value, datatype, language);
        }

        public addStatementFrom(source: Thing): Helpers {
            throw new Error("Method not implemented.");
        }

        public addRdfTypeStatement(value: string): Helpers {
            return this.addStatement("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", value);
        }

        public addBooleanStatement(about: string, value: boolean): Helpers {
            return this.addStatement(about, value.toString(), "xsd:boolean");
        }

        public addStringStatement(about: string, value: string, locale?: string): Helpers {
            return this.addStatement(about, value, "xsd:string", locale);
        }

        public addDecimalStatement(about: string, value: number): Helpers {
            return this.addStatement(about, value.toString(), "xsd:decimal");
        }

        public addIntegerStatement(about: string, value: number): Helpers {
            return this.addStatement(about, value.toString(), "xsd:integer");
        }

        public addDateStatement(about: string, value: Date): Helpers {
            return this.addStatement(about, value.toString(), "xsd:date");
        }

        public addDatetimeStatement(about: string, value: Date): Helpers {
            return this.addStatement(about, value.toString(), "xsd:datetime");
        }

        public addTimeStatement(about: string, value: Date): Helpers {
            return this.addStatement(about, value.toString(), "xsd:time");
        }

        ////////////// Getters //////////////
        public getRdfTypeValue(): string | null {
            const values = this.getAllRdfTypeValues();
            return values.length >= 1? values[0]: null;
        }

        public getAllRdfTypeValues(): string[] {
            return this.getAll("http://www.w3.org/1999/02/22-rdf-syntax-ns#type");
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
            return this.getAll(about);
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
        public setStatement(about: string, value: string): Helpers {
            throw new Error("Method not implemented.");
        }

        public setRdfTypeStatement(value: string): Helpers {
            throw new Error("Method not implemented.");
        }

        public setBooleanStatement(about: string, value: boolean): Helpers {
            throw new Error("Method not implemented.");
        }

        public setStringStatement(about: string, value: string, locale?: string): Helpers {
            throw new Error("Method not implemented.");
        }

        public setDecimalStatement(about: string, value: number): Helpers {
            throw new Error("Method not implemented.");
        }

        public setIntegerStatement(about: string, value: number): Helpers {
            throw new Error("Method not implemented.");
        }

        public setDateStatement(about: string, value: Date): Helpers {
            throw new Error("Method not implemented.");
        }

        public setDatetimeStatement(about: string, value: Date): Helpers {
            throw new Error("Method not implemented.");
        }

        public setTimeStatement(about: string, value: Date): Helpers {
            throw new Error("Method not implemented.");
        }

        ////////////// Removers //////////////
        public removeStatement(about: string, value: string | Resource, datatype?: string, language?: string): Helpers {
            throw new Error("Method not implemented.");
        }

        public removeRdfTypeStatement(value: string): Helpers {
            throw new Error("Method not implemented.");
        }

        public removeBooleanStatement(about: string, value: boolean): Helpers {
            throw new Error("Method not implemented.");
        }

        public removeStringStatement(about: string, value: string, locale?: string): Helpers {
            throw new Error("Method not implemented.");
        }

        public removeDecimalStatement(about: string, value: number): Helpers {
            throw new Error("Method not implemented.");
        }

        public removeIntegerStatement(about: string, value: number): Helpers {
            throw new Error("Method not implemented.");
        }

        public removeDateStatement(about: string, value: Date): Helpers {
            throw new Error("Method not implemented.");
        }

        public removeDatetimeStatement(about: string, value: Date): Helpers {
            throw new Error("Method not implemented.");
        }

        public removeTimeStatement(about: string, value: Date): Helpers {
            throw new Error("Method not implemented.");
        }

    }
}

export default ThingWithHelpersMixin;