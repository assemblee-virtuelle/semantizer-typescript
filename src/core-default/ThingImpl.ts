import { Context } from "../core/Common.js";
import { Statement, StatementWritable } from "../core/Statement.js";
import { Thing, ThingWritable } from "../core/Thing.js";
import StatementImpl from "./StatementImpl.js";

export enum ThingType {
    ForDescribing,
    Regular,
    Anonymous
}

// export type StatementConstructor<
//     StatementType extends Statement = Statement,
// > = new (about: string, property: string, value: string, datatype?: string, language?: string) => StatementType;

export class ThingImpl implements ThingWritable { 

    private _uri: string;
    // private _document: DocumentType;
    private _statements: StatementWritable[];

    // TODO: add copy constructor
    public constructor() { //document: DocumentType, stateType?: ThingType, uriOrNameHint?: string) {
        this._uri = "thingUri"; //uriOrNameHint ?? '';
        // this._document = document;
        this._statements = [];
    }

    protected getStatementsInternal(): StatementWritable[] {
        return this._statements;
    }

    public createStatement(property: string, value: string, datatype?: string | undefined, language?: string | undefined): Statement {
        const statement = new StatementImpl({subject: this.getUri(), property, value, datatype, language});
        this.getStatementsInternal().push(statement);
        return statement;
    }

    public addStatement(other: Statement): Statement {
        const statement = new StatementImpl(other);
        this.getStatementsInternal().push(statement);
        return statement;
    }
    
    public addStatementAll(others: Iterable<Statement>): Statement[] {
        const results: Statement[] = [];
        for (const other of others) {
            const statement = this.addStatement(other);
            results.push(statement);
        }
        return results;
    }
    
    public deleteStatement(statement: Statement): boolean {
        throw new Error("Method not implemented."); //this._statements = this._statements.filter(s => s !== statement);
    }

    public setStatement(property: string, value: string, oldValue?: string, datatype?: string, language?: string): Statement | undefined {
        const statement = this._getStatement(property, language);
        if (statement) {
            statement.setValue(value);
            return new StatementImpl(statement);
        }
        return undefined;
    }

    pop(): Statement | undefined {
        throw new Error("Method not implemented.");
    }
    reverse(): void {
        throw new Error("Method not implemented.");
    }
    shift(): Statement | undefined {
        throw new Error("Method not implemented.");
    }
    sort(compareFn?: ((a: Statement, b: Statement) => number) | undefined): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    splice(start: number, deleteCount?: number | undefined, ...items: Statement[]): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    getStatement(property: string, language?: string | undefined): Statement | undefined {
        throw new Error("Method not implemented.");
    }

    _getStatement(property: string, language?: string | undefined): StatementWritable | undefined {
        throw new Error("Method not implemented.");
    }

    getStatementAll(property?: string | undefined, language?: string | undefined): Statement[] {
        throw new Error("Method not implemented.");
    }
    hasStatement(property?: string | undefined, language?: string | undefined): boolean {
        throw new Error("Method not implemented.");
    }
    at(index: number): Statement | undefined {
        throw new Error("Method not implemented.");
    }
    contains(other: Thing): boolean {
        throw new Error("Method not implemented.");
    }
    count(): number {
        throw new Error("Method not implemented.");
    }
    every(predicate: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => boolean, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }
    filter(predicate: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => boolean): Statement[] {
        throw new Error("Method not implemented.");
    }
    find(predicate: (value: Statement, index?: number | undefined, obj?: Statement[] | undefined) => boolean, thisArg?: any): Statement | undefined {
        throw new Error("Method not implemented.");
    }
    findIndex(predicate: (value: Statement, index?: number | undefined, obj?: Statement[] | undefined) => unknown, thisArg?: any): number {
        throw new Error("Method not implemented.");
    }
    forEach(callbackfn: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }
    includes(searchElement: Statement, fromIndex?: number | undefined): boolean {
        throw new Error("Method not implemented.");
    }
    indexOf(searchElement: Statement, fromIndex?: number | undefined): number {
        throw new Error("Method not implemented.");
    }
    keys(): IterableIterator<number> {
        throw new Error("Method not implemented.");
    }
    map(callbackfn: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => unknown, thisArg?: any): unknown[] {
        throw new Error("Method not implemented.");
    }
    reduce(callbackfn: (previousValue: Statement, currentValue: Statement, currentIndex: number, array: Statement[]) => Statement): Statement {
        throw new Error("Method not implemented.");
    }
    slice(start?: number | undefined, end?: number | undefined): Thing {
        throw new Error("Method not implemented.");
    }
    some(predicate: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => unknown, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }
    [Symbol.iterator](): Iterator<Statement, any, undefined> {
        throw new Error("Method not implemented.");
    }
    getUri(): string {
        return this._uri;
    }
    hasUri(): boolean {
        throw new Error("Method not implemented.");
    }
    getContext(): Context | undefined {
        throw new Error("Method not implemented.");
    }
    equals(other: ThisType<this>): boolean {
        throw new Error("Method not implemented.");
    }
    difference(other: ThisType<this>): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    toCopy(): ThisType<this> {
        throw new Error("Method not implemented.");
    }


}

export default ThingImpl;