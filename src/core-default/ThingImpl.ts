import { Context } from "../core/Common.js";
import { Statement, StatementConstructor } from "../core/Statement.js";
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

export class ThingImpl<
    StatementType extends Statement = Statement
> implements ThingWritable { 

    private _uri: string;
    // private _document: DocumentType;
    private _statementImpl: StatementConstructor<StatementType>;
    private _statements: StatementType[];

    // TODO: add copy constructor
    public constructor(statementImpl: StatementConstructor<StatementType>) { //document: DocumentType, stateType?: ThingType, uriOrNameHint?: string) {
        this._uri = "thingUri"; //uriOrNameHint ?? '';
        // this._document = document;
        this._statementImpl = statementImpl;
        this._statements = [];
    }

    protected _getStatementsInternal(): StatementType[] {
        return this._statements;
    }

    private _createStatementInternalFrom(other: Statement): StatementType {
        return new this._statementImpl(other);
    }

    private _createStatementInternal(subject: string, property: string, value: string, datatype?: string | undefined, language?: string | undefined): StatementType {
        return new this._statementImpl({subject, property, value, datatype, language});
    }

    public createStatement(property: string, value: string, datatype?: string | undefined, language?: string | undefined): StatementType {
        const statement = this._createStatementInternal(this.getUri(), property, value, datatype, language);
        this._getStatementsInternal().push(statement);
        return statement;
    }

    public addStatement(other: Statement): StatementType {
        const statement = this._createStatementInternalFrom(other);
        this._getStatementsInternal().push(statement);
        return statement;
    }
    
    public addStatementAll(others: Iterable<Statement>): StatementType[] {
        const results: StatementType[] = [];
        for (const other of others) {
            const statement = this.addStatement(other);
            results.push(statement);
        }
        return results;
    }
    
    public deleteStatement(statement: StatementType): boolean {
        throw new Error("Method not implemented."); //this._statements = this._statements.filter(s => s !== statement);
    }

    public setStatement(property: string, value: string, oldValue?: string, datatype?: string, language?: string): StatementType | undefined {
        const statement = this._getStatementInternal(property, language);
        if (statement) {
            statement.setValue(value);
            return this._createStatementInternalFrom(statement);
        }
        return undefined;
    }

    pop(): StatementType | undefined {
        throw new Error("Method not implemented.");
    }
    reverse(): void {
        throw new Error("Method not implemented.");
    }
    shift(): StatementType | undefined {
        throw new Error("Method not implemented.");
    }
    sort(compareFn?: ((a: StatementType, b: StatementType) => number) | undefined): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    splice(start: number, deleteCount?: number | undefined, ...items: StatementType[]): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    getStatement(property: string, language?: string | undefined): StatementType | undefined {
        throw new Error("Method not implemented.");
    }

    _getStatementInternal(property: string, language?: string | undefined): StatementType | undefined {
        throw new Error("Method not implemented.");
    }

    getStatementAll(property?: string | undefined, language?: string | undefined): StatementType[] {
        throw new Error("Method not implemented.");
    }
    hasStatement(property?: string | undefined, language?: string | undefined): boolean {
        throw new Error("Method not implemented.");
    }
    at(index: number): StatementType | undefined {
        throw new Error("Method not implemented.");
    }
    contains(other: Thing): boolean {
        throw new Error("Method not implemented.");
    }
    count(): number {
        throw new Error("Method not implemented.");
    }
    every(predicate: (value: StatementType, index?: number | undefined, array?: StatementType[] | undefined) => boolean, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }
    filter(predicate: (value: StatementType, index?: number | undefined, array?: StatementType[] | undefined) => boolean): StatementType[] {
        throw new Error("Method not implemented.");
    }
    find(predicate: (value: StatementType, index?: number | undefined, obj?: StatementType[] | undefined) => boolean, thisArg?: any): StatementType | undefined {
        throw new Error("Method not implemented.");
    }
    findIndex(predicate: (value: StatementType, index?: number | undefined, obj?: StatementType[] | undefined) => unknown, thisArg?: any): number {
        throw new Error("Method not implemented.");
    }
    forEach(callbackfn: (value: StatementType, index?: number | undefined, array?: StatementType[] | undefined) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }
    includes(searchElement: StatementType, fromIndex?: number | undefined): boolean {
        throw new Error("Method not implemented.");
    }
    indexOf(searchElement: StatementType, fromIndex?: number | undefined): number {
        throw new Error("Method not implemented.");
    }
    keys(): IterableIterator<number> {
        throw new Error("Method not implemented.");
    }
    map(callbackfn: (value: StatementType, index?: number | undefined, array?: StatementType[] | undefined) => unknown, thisArg?: any): unknown[] {
        throw new Error("Method not implemented.");
    }
    reduce(callbackfn: (previousValue: StatementType, currentValue: StatementType, currentIndex: number, array: StatementType[]) => StatementType): StatementType {
        throw new Error("Method not implemented.");
    }
    slice(start?: number | undefined, end?: number | undefined): Thing {
        throw new Error("Method not implemented.");
    }
    some(predicate: (value: StatementType, index?: number | undefined, array?: StatementType[] | undefined) => unknown, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }
    [Symbol.iterator](): Iterator<StatementType, any, undefined> {
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

export class ThingImplDefault extends ThingImpl<Statement> {

    public constructor() {
        super(StatementImpl);
    }

}

export default ThingImpl;