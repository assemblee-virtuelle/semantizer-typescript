import { Context } from "../core/Common.js";
import { Statement, StatementWritable } from "../core/Statement.js";
import { Thing, ThingWritable } from "../core/Thing.js";
export declare enum ThingType {
    ForDescribing = 0,
    Regular = 1,
    Anonymous = 2
}
export declare class ThingImpl implements ThingWritable {
    private _uri;
    private _statements;
    constructor();
    protected getStatementsInternal(): StatementWritable[];
    createStatement(property: string, value: string, datatype?: string | undefined, language?: string | undefined): Statement;
    addStatement(other: Statement): Statement;
    addStatementAll(others: Iterable<Statement>): Statement[];
    deleteStatement(statement: Statement): boolean;
    setStatement(property: string, value: string, oldValue?: string, datatype?: string, language?: string): Statement | undefined;
    pop(): Statement | undefined;
    reverse(): void;
    shift(): Statement | undefined;
    sort(compareFn?: ((a: Statement, b: Statement) => number) | undefined): ThisType<this>;
    splice(start: number, deleteCount?: number | undefined, ...items: Statement[]): ThisType<this>;
    getStatement(property: string, language?: string | undefined): Statement | undefined;
    _getStatement(property: string, language?: string | undefined): StatementWritable | undefined;
    getStatementAll(property?: string | undefined, language?: string | undefined): Statement[];
    hasStatement(property?: string | undefined, language?: string | undefined): boolean;
    at(index: number): Statement | undefined;
    contains(other: Thing): boolean;
    count(): number;
    every(predicate: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => boolean, thisArg?: any): boolean;
    filter(predicate: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => boolean): Statement[];
    find(predicate: (value: Statement, index?: number | undefined, obj?: Statement[] | undefined) => boolean, thisArg?: any): Statement | undefined;
    findIndex(predicate: (value: Statement, index?: number | undefined, obj?: Statement[] | undefined) => unknown, thisArg?: any): number;
    forEach(callbackfn: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => void, thisArg?: any): void;
    includes(searchElement: Statement, fromIndex?: number | undefined): boolean;
    indexOf(searchElement: Statement, fromIndex?: number | undefined): number;
    keys(): IterableIterator<number>;
    map(callbackfn: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => unknown, thisArg?: any): unknown[];
    reduce(callbackfn: (previousValue: Statement, currentValue: Statement, currentIndex: number, array: Statement[]) => Statement): Statement;
    slice(start?: number | undefined, end?: number | undefined): Thing;
    some(predicate: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => unknown, thisArg?: any): boolean;
    [Symbol.iterator](): Iterator<Statement, any, undefined>;
    getUri(): string;
    hasUri(): boolean;
    getContext(): Context | undefined;
    equals(other: ThisType<this>): boolean;
    difference(other: ThisType<this>): ThisType<this>;
    toCopy(): ThisType<this>;
}
export default ThingImpl;
//# sourceMappingURL=ThingImpl.d.ts.map