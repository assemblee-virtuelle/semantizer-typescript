import { Comparable, Copyable, Resource, WithContext } from "./Common";
import { Statement } from "./Statement";
export type ThingConstructor<ThingType extends Thing<any> = Thing> = new (...args: any[]) => ThingType;
export interface WithNotifications {
    registerCallbackForStatementAdded(callbackfn: (value: string) => void): ThisType<this>;
    registerCallbackForStatementRemoved(callbackfn: (datatype: string) => void): ThisType<this>;
    registerCallbackForStatementChanged(callbackfn: (language: string) => void): ThisType<this>;
}
export interface ThingWithWriteOperations<StatementType extends Statement = Statement> {
    createStatement(property: string, value: string, datatype?: string, language?: string): StatementType;
    addStatement(other: Statement): StatementType;
    addStatementAll(others: Iterable<Statement>): StatementType[];
    setStatement(property: string, value: string, oldValue?: string, datatype?: string, language?: string): StatementType | undefined;
    deleteStatement(statement: StatementType): boolean;
    pop(): StatementType | undefined;
    reverse(): void;
    shift(): StatementType | undefined;
    sort(compareFn?: (a: StatementType, b: StatementType) => number): ThisType<this>;
    splice(start: number, deleteCount?: number, ...items: StatementType[]): ThisType<this>;
}
export interface Thing<StatementType extends Statement = Statement> extends Resource, /*ResourceCollection<ContainedStatement>,*/ WithContext, Comparable, Copyable {
    getStatement(property: string, language?: string): StatementType | undefined;
    getStatementAll(property?: string, language?: string): StatementType[];
    hasStatement(property?: string, language?: string): boolean;
    [Symbol.iterator](): Iterator<StatementType>;
    at(index: number): StatementType | undefined;
    contains(other: Thing): boolean;
    count(): number;
    every(predicate: (value: StatementType, index?: number, array?: StatementType[]) => boolean, thisArg?: any): boolean;
    filter(predicate: (value: StatementType, index?: number, array?: StatementType[]) => boolean): StatementType[];
    find(predicate: (value: StatementType, index?: number, obj?: StatementType[]) => boolean, thisArg?: any): StatementType | undefined;
    findIndex(predicate: (value: StatementType, index?: number, obj?: StatementType[]) => unknown, thisArg?: any): number;
    forEach(callbackfn: (value: StatementType, index?: number, array?: StatementType[]) => void, thisArg?: any): void;
    includes(searchElement: StatementType, fromIndex?: number): boolean;
    indexOf(searchElement: StatementType, fromIndex?: number): number;
    keys(): IterableIterator<number>;
    map(callbackfn: (value: StatementType, index?: number, array?: StatementType[]) => unknown, thisArg?: any): unknown[];
    reduce(callbackfn: (previousValue: StatementType, currentValue: StatementType, currentIndex: number, array: StatementType[]) => StatementType): StatementType;
    slice(start?: number, end?: number): Thing;
    some(predicate: (value: StatementType, index?: number, array?: StatementType[]) => unknown, thisArg?: any): boolean;
}
export type ThingWritable<StatementType extends Statement = Statement> = Thing<StatementType> & ThingWithWriteOperations<StatementType>;
//# sourceMappingURL=Thing.d.ts.map