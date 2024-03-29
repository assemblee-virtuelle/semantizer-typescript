import Document from "./Document";
import Thing from "./Thing";
import Resource from "./Resource";
import Context from "./Context";
import ThingState from "./ThingState";
import ThingStateRdfjsRegular from "./ThingStateRdfjsRegular.js";
import ThingStateRdfjsAnonymous from "./ThingStateRdfjsAnonymous.js";
import DatasetExt from "rdf-ext/lib/Dataset";

export enum ThingType {
    ForDescribing,
    Regular,
    Anonymous
}

export class ThingDefaultImpl implements Thing {

    private _document;
    private _state: ThingState;

    // TODO: add copy constructor
    public constructor(document: Document, stateType: ThingType, uriOrNameHint?: string) {
        this._document = document;

        switch (stateType) {
            case ThingType.Regular:
                if (!uriOrNameHint)
                    throw new Error();
                this._state = new ThingStateRdfjsRegular(this, uriOrNameHint);
                break;
        
            case ThingType.Anonymous:
                if (uriOrNameHint?.startsWith('http'))
                    throw new Error("You are trying to create an anonymous thing with an URI but anonymous thing can not have an URI. Please pass a name hint instead or leave it undefined.");
                this._state = new ThingStateRdfjsAnonymous(this, uriOrNameHint);
                break;

            case ThingType.ForDescribing:
                this._state = new ThingStateRdfjsRegular(this, document.getUri());
                break;
        }
    }

    private getState(): ThingState {
        return this._state;
    }

    public isAnonymous(): boolean {
        return this.getState().isAnonymous();
    }

    public getUri(): string {
        return this.getState().getUri();
    }

    public setUri(uri: string): void {
        // Todo: change state
        // Todo: change dataset
    }

    public getContext(): Context | undefined {
        return this.getDocument().getContext();
    }

    public expand(uri: string): string {
        return this.getDocument().expand(uri);
    }

    public shorten(uri: string): string {
        return this.getDocument().shorten(uri);
    }

    public filter(by: (property?: string, value?: string, datatype?: string) => boolean): Thing {
        throw new Error("Method not implemented.");
    }

    public equals(other: Thing): boolean {
        return this.getState().equals(other);
    }

    public toRdfDatasetExt(): DatasetExt {
        return this.getState().toRdfDatasetExt();
    }

    ////////////// Adder //////////////
    public addStatement(about: string, value: string | Resource, datatype?: string, language?: string): Thing {
        return this.getState().addStatement(about, value, datatype, language);
    }

    public addStatementFrom(source: Thing): Thing {
        throw new Error("Method not implemented.");
    }

    public addRdfTypeStatement(value: string): Thing {
        return this.addStatement("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", value);
    }

    public addBooleanStatement(about: string, value: boolean): Thing {
        return this.addStatement(about, value.toString(), "xsd:boolean");
    }

    public addStringStatement(about: string, value: string, locale?: string): Thing {
        return this.addStatement(about, value, "xsd:string", locale);
    }

    public addDecimalStatement(about: string, value: number): Thing {
        return this.addStatement(about, value.toString(), "xsd:decimal");
    }

    public addIntegerStatement(about: string, value: number): Thing {
        return this.addStatement(about, value.toString(), "xsd:integer");
    }

    public addDateStatement(about: string, value: Date): Thing {
        return this.addStatement(about, value.toString(), "xsd:date");
    }

    public addDatetimeStatement(about: string, value: Date): Thing {
        return this.addStatement(about, value.toString(), "xsd:datetime");
    }

    public addTimeStatement(about: string, value: Date): Thing {
        return this.addStatement(about, value.toString(), "xsd:time");
    }

    ////////////// Getters //////////////
    public getAllValuesAboutStatement(property: string): string[] {
        return this.getState().getAllValuesAboutStatement(property);
    }

    public getDocument(): Document {
        return this._document;
    }

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
    public setStatement(about: string, value: string): Thing {
        throw new Error("Method not implemented.");
    }

    public setRdfTypeStatement(value: string): Thing {
        throw new Error("Method not implemented.");
    }

    public setBooleanStatement(about: string, value: boolean): Thing {
        throw new Error("Method not implemented.");
    }

    public setStringStatement(about: string, value: string, locale?: string): Thing {
        throw new Error("Method not implemented.");
    }

    public setDecimalStatement(about: string, value: number): Thing {
        throw new Error("Method not implemented.");
    }

    public setIntegerStatement(about: string, value: number): Thing {
        throw new Error("Method not implemented.");
    }

    public setDateStatement(about: string, value: Date): Thing {
        throw new Error("Method not implemented.");
    }

    public setDatetimeStatement(about: string, value: Date): Thing {
        throw new Error("Method not implemented.");
    }

    public setTimeStatement(about: string, value: Date): Thing {
        throw new Error("Method not implemented.");
    }

    ////////////// Removers //////////////
    public removeStatement(about: string, value: string | Resource, datatype?: string, language?: string): Thing {
        throw new Error("Method not implemented.");
    }

    public removeAllStatements(about: string): Thing {
        throw new Error("Method not implemented.");
    }

    public removeRdfTypeStatement(value: string): Thing {
        throw new Error("Method not implemented.");
    }

    public removeBooleanStatement(about: string, value: boolean): Thing {
        throw new Error("Method not implemented.");
    }

    public removeStringStatement(about: string, value: string, locale?: string): Thing {
        throw new Error("Method not implemented.");
    }

    public removeDecimalStatement(about: string, value: number): Thing {
        throw new Error("Method not implemented.");
    }

    public removeIntegerStatement(about: string, value: number): Thing {
        throw new Error("Method not implemented.");
    }

    public removeDateStatement(about: string, value: Date): Thing {
        throw new Error("Method not implemented.");
    }

    public removeDatetimeStatement(about: string, value: Date): Thing {
        throw new Error("Method not implemented.");
    }

    public removeTimeStatement(about: string, value: Date): Thing {
        throw new Error("Method not implemented.");
    }

}

export default ThingDefaultImpl;