import Context from "../contracts/Context.js";
import Document from "../contracts/Document.js";
import Resource from "../contracts/Resource.js";
import Statement from "../contracts/Statement.js";
import Thing from "../contracts/Thing.js";
import StatementDefaultImpl from "./StatementDefaultImpl.js";

export enum ThingType {
    ForDescribing,
    Regular,
    Anonymous
}

export class ThingDefaultImpl implements Thing {

    private _uri: string;
    private _document: Document;
    private _statements: Statement[];

    // TODO: add copy constructor
    public constructor(document: Document, stateType: ThingType, uriOrNameHint?: string) {
        this._uri = uriOrNameHint ?? '';
        this._document = document;
        this._statements = [];

        // TODO use factory
    }

    public getDocument(): Document {
        return this._document;
    }

    public count(): number {
        return this._getStatements().length;
    }

    public isEmpty(): boolean {
        return this._getStatements().length === 0;
    }

    public [Symbol.iterator](): Iterator<Statement, any, undefined> {
        return this._getStatements()[Symbol.iterator]();
    }

    public forEach(callbackfn: (value: Statement, index: number, array: Statement[]) => void, thisArg?: any): void {
        this._getStatements().forEach(callbackfn, thisArg);
    }
    
    public map(callbackfn: (value: Statement, index: number, array: Statement[]) => unknown, thisArg?: any): unknown[] {
        return this._getStatements().map(callbackfn);
    }
    
    public filter(predicate: (value: Statement, index: number, array: Statement[]) => boolean): Statement[] {
        return this._getStatements().filter(predicate);
    }

    private _getStatements(): Statement[] {
        return this._statements;
    }

    public hasUri(): boolean {
        return this.getUri() !== '';
    }

    public getUri(): string {
        return this._uri;
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

    public equals(other: Thing): boolean {
        throw new Error("Not implemented.");
    }

    public add(about: string, value: string | Resource, datatype?: string, language?: string): Thing {
        const statement = new StatementDefaultImpl(this, about, value, datatype, language);
        this._getStatements().push(statement);
        return this;
    }

    public get(property: string): string {
        throw new Error("Method not implemented.");
    }

    public set(about: string, value: string, oldValue?: string | undefined, datatype?: string | undefined, language?: string | undefined): Thing {
        throw new Error("Method not implemented.");
    }
    
    public remove(about: string, value: string | Resource, datatype?: string | undefined, language?: string | undefined): Thing {
        throw new Error("Method not implemented.");
    }

}

export default ThingDefaultImpl;