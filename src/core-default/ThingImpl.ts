import { Context } from "../core/Context.js";
import { DocumentBase } from "../core/Document.js";
import Resource from "../core/Resource.js";
import { Statement, StatementBase, StatementReadonly } from "../core/Statement.js";
import { Thing, ThingBase, ThingReadonly } from "../core/Thing.js";

export enum ThingType {
    ForDescribing,
    Regular,
    Anonymous
}

export class ThingImpl<
    ContainedStatement extends StatementBase = StatementBase
> implements Thing<ContainedStatement> {

    private _uri: string;
    private _document: DocumentBase<any, any>;
    private _statements: ContainedStatement[];

    // TODO: add copy constructor
    public constructor(document: DocumentBase<any, any>, stateType?: ThingType, uriOrNameHint?: string) {
        this._uri = uriOrNameHint ?? '';
        this._document = document;
        this._statements = [];

        // TODO use factory
    }
    
    public toCopy(): this {
        return this;
    }

    public createStatement(about: string, value: string | Resource, datatype?: string, language?: string): ContainedStatement {
        const statement = this.getDocument().getFactory().createStatement(this, about, value, datatype, language);
        this._getStatements().push(statement);
        return statement;
    }

    public add(statement: ContainedStatement): this {
        // TODO: set thing of statement
        // this._getStatements().push(statement);
        return this;
    }

    public set(about: string, value: string, oldValue?: string | undefined, ContainedStatement?: string | undefined, language?: string | undefined): this {
        throw new Error("Method not implemented.");
    }
    
    public remove(about: string, value: string | Resource, ContainedStatement?: string | undefined, language?: string | undefined): this {
        throw new Error("Method not implemented.");
    }

    public removeAll(about: string): this {
        throw new Error("Method not implemented.");
    }

    public toCopyReadonly<ContainedStatementReadonly extends StatementReadonly = StatementReadonly>(): ThingReadonly<ContainedStatementReadonly> {
        throw new Error("Method not implemented.");
    }

    public toCopyWritable<ContainedStatementWritable extends Statement = Statement>(): Thing<ContainedStatementWritable> {
        throw new Error("Method not implemented.");
    }

    public getDocument(): DocumentBase<this, any> {
        return this._document;
    }

    public count(): number {
        return this._getStatements().length;
    }

    public isEmpty(): boolean {
        return this._getStatements().length === 0;
    }

    public [Symbol.iterator](): Iterator<ContainedStatement> {
        return this._getStatements()[Symbol.iterator]();
    }

    public forEach(callbackfn: (value: ContainedStatement, index: number, array: ContainedStatement[]) => void, thisArg?: any): void {
        this._getStatements().forEach(callbackfn, thisArg);
    }
    
    public map(callbackfn: (value: ContainedStatement, index: number, array: ContainedStatement[]) => unknown, thisArg?: any): unknown[] {
        return this._getStatements().map(callbackfn);
    }
    
    public filter(predicate: (value: ContainedStatement, index: number, array: ContainedStatement[]) => boolean): ContainedStatement[] {
        return this._getStatements().filter(predicate);
    }

    private _getStatements(): ContainedStatement[] {
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

    public get(property: string): ContainedStatement {
        throw new Error("Method not implemented.");
    }

    public getAll(property: string): ContainedStatement[] {
        throw new Error("Method not implemented.");
    }

}

export default ThingImpl;