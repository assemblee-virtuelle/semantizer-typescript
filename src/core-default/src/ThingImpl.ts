import { 
    Context,
    Statement,
    StatementConstructor,
    ThingWithNonDestructiveOperations,
    Thing
} from "@semantizer/types";
import StatementImpl from "./StatementImpl.js";

export enum ThingType {
    ForDescribing,
    Regular,
    Anonymous
}

// type ConstructorParams = {
//     uri: string
// }

// type CopyConstructorParams = {
//     other: ThingWritable;
// }

export class ThingImpl<
    StatementType extends Statement = Statement
> implements Thing { 

    private _uri: string;
    private _statementImpl: StatementConstructor<StatementType>;
    private _statements: StatementType[];

    public constructor(statementImpl: StatementConstructor<StatementType>, uri?: string) {
        this._statements = [];
        this._statementImpl = statementImpl;
        this._uri = uri ?? "";
    }

    getTypes(): string[] {
        throw new Error("Method not implemented.");
    }

    isTypeOf(type: string, ...others: string[]): boolean {
        throw new Error("Method not implemented.");
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
        return statement.toCopy() as StatementType;
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
        return this._getStatementsInternal().find(s => s.getProperty() === property);
    }

    public getStatementAll(property?: string | undefined, language?: string | undefined): StatementType[] {
        const results: StatementType[] = [];
        this._getStatementsInternal().forEach(s => results.push(s.toCopy() as StatementType));
        return results;
    }

    hasStatement(property?: string | undefined, language?: string | undefined): boolean {
        throw new Error("Method not implemented.");
    }
    at(index: number): StatementType | undefined {
        throw new Error("Method not implemented.");
    }
    contains(other: ThingWithNonDestructiveOperations): boolean {
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
    
    public forEach(callbackfn: (value: StatementType, index?: number | undefined, array?: StatementType[] | undefined) => void, thisArg?: any): void {
        this._getStatementsInternal().forEach(callbackfn);
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
    slice(start?: number | undefined, end?: number | undefined): ThingWithNonDestructiveOperations {
        throw new Error("Method not implemented.");
    }
    some(predicate: (value: StatementType, index?: number | undefined, array?: StatementType[] | undefined) => unknown, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }
    
    public [Symbol.iterator](): Iterator<StatementType> {
        return this._statements[Symbol.iterator](); // should make a copy before?
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

    public toCopy(): ThisType<this> {
        const copy = new ThingImpl<StatementType>(this._statementImpl, this._uri); // can't call the polymorphic constructor, this method should be redefined by sub classes.
        copy.addStatementAll(this._statements);
        return copy;
    }

}

export class ThingImplDefault extends ThingImpl<Statement> {

    // public constructor(uri?: string) {
    public constructor(...args: any[]) {
        const [ uri ] = args;
        super(StatementImpl, uri);
    }

}

export default ThingImpl;