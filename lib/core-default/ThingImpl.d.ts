import { Context } from "../core/Common.js";
import { Statement, StatementConstructor } from "../core/Statement.js";
import { Thing, ThingWritable } from "../core/Thing.js";
export declare enum ThingType {
    ForDescribing = 0,
    Regular = 1,
    Anonymous = 2
}
export declare class ThingImpl<StatementType extends Statement = Statement> implements ThingWritable {
    private _uri;
    private _statementImpl;
    private _statements;
    constructor(statementImpl: StatementConstructor<StatementType>);
    protected _getStatementsInternal(): StatementType[];
    private _createStatementInternalFrom;
    private _createStatementInternal;
    createStatement(property: string, value: string, datatype?: string | undefined, language?: string | undefined): StatementType;
    addStatement(other: Statement): StatementType;
    addStatementAll(others: Iterable<Statement>): StatementType[];
    deleteStatement(statement: StatementType): boolean;
    setStatement(property: string, value: string, oldValue?: string, datatype?: string, language?: string): StatementType | undefined;
    pop(): StatementType | undefined;
    reverse(): void;
    shift(): StatementType | undefined;
    sort(compareFn?: ((a: StatementType, b: StatementType) => number) | undefined): ThisType<this>;
    splice(start: number, deleteCount?: number | undefined, ...items: StatementType[]): ThisType<this>;
    getStatement(property: string, language?: string | undefined): StatementType | undefined;
    _getStatementInternal(property: string, language?: string | undefined): StatementType | undefined;
    getStatementAll(property?: string | undefined, language?: string | undefined): StatementType[];
    hasStatement(property?: string | undefined, language?: string | undefined): boolean;
    at(index: number): StatementType | undefined;
    contains(other: Thing): boolean;
    count(): number;
    every(predicate: (value: StatementType, index?: number | undefined, array?: StatementType[] | undefined) => boolean, thisArg?: any): boolean;
    filter(predicate: (value: StatementType, index?: number | undefined, array?: StatementType[] | undefined) => boolean): StatementType[];
    find(predicate: (value: StatementType, index?: number | undefined, obj?: StatementType[] | undefined) => boolean, thisArg?: any): StatementType | undefined;
    findIndex(predicate: (value: StatementType, index?: number | undefined, obj?: StatementType[] | undefined) => unknown, thisArg?: any): number;
    forEach(callbackfn: (value: StatementType, index?: number | undefined, array?: StatementType[] | undefined) => void, thisArg?: any): void;
    includes(searchElement: StatementType, fromIndex?: number | undefined): boolean;
    indexOf(searchElement: StatementType, fromIndex?: number | undefined): number;
    keys(): IterableIterator<number>;
    map(callbackfn: (value: StatementType, index?: number | undefined, array?: StatementType[] | undefined) => unknown, thisArg?: any): unknown[];
    reduce(callbackfn: (previousValue: StatementType, currentValue: StatementType, currentIndex: number, array: StatementType[]) => StatementType): StatementType;
    slice(start?: number | undefined, end?: number | undefined): Thing;
    some(predicate: (value: StatementType, index?: number | undefined, array?: StatementType[] | undefined) => unknown, thisArg?: any): boolean;
    [Symbol.iterator](): Iterator<StatementType, any, undefined>;
    getUri(): string;
    hasUri(): boolean;
    getContext(): Context | undefined;
    equals(other: ThisType<this>): boolean;
    difference(other: ThisType<this>): ThisType<this>;
    toCopy(): ThisType<this>;
}
export declare class ThingImplDefault extends ThingImpl<Statement> {
    constructor();
}
export default ThingImpl;
//# sourceMappingURL=ThingImpl.d.ts.map