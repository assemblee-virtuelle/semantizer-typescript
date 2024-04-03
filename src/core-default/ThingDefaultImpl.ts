import Context from "../core/Context.js";
import DocumentBase from "../core/Document.js";
import Resource from "../core/Resource.js";
import Statement from "../core/Statement.js";
import { Thing, ThingBase } from "../core/Thing.js";
import StatementDefaultImpl from "./StatementDefaultImpl.js";

export enum ThingType {
    ForDescribing,
    Regular,
    Anonymous
}

export class ThingDefaultImpl implements Thing {

    private _uri: string;
    private _document: DocumentBase<any, any>;
    private _statements: Statement[];

    // TODO: add copy constructor
    public constructor(document: DocumentBase<any, any>, stateType: ThingType, uriOrNameHint?: string) {
        this._uri = uriOrNameHint ?? '';
        this._document = document;
        this._statements = [];

        // TODO use factory
    }

    public getDocument(): DocumentBase<any, any> {
        return this._document;
    }

    public count(): number {
        return this._getStatements().length;
    }

    public isEmpty(): boolean {
        return this._getStatements().length === 0;
    }

    public [Symbol.iterator](): Iterator<Statement> {
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

    /*public expand(uri: string): string {
        return this.getDocument().expand(uri);
    }

    public shorten(uri: string): string {
        return this.getDocument().shorten(uri);
    }*/

    public equals(other: ThingBase): boolean {
        throw new Error("Not implemented.");
    }

    public add(about: string, value: string | Resource, Statement?: string, language?: string): Thing {
        const statement = new StatementDefaultImpl(this, about, value, Statement, language);
        this._getStatements().push(statement);
        return this;
    }

    public get(property: string): string {
        throw new Error("Method not implemented.");
    }

    public getAll(property: string): string[] {
        throw new Error("Method not implemented.");
    }

    public set(about: string, value: string, oldValue?: string | undefined, Statement?: string | undefined, language?: string | undefined): Thing {
        throw new Error("Method not implemented.");
    }
    
    public remove(about: string, value: string | Resource, Statement?: string | undefined, language?: string | undefined): Thing {
        throw new Error("Method not implemented.");
    }

    public removeAll(about: string): Thing {
        throw new Error("Method not implemented.");
    }

}

export default ThingDefaultImpl;