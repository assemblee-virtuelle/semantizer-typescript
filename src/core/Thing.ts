import { Comparable, Copyable, Resource, ResourceCollection, WithContext } from "./Common";
import { Statement } from "./Statement";

// type ContainedDocumentOf<T extends Thing<any, any>> = T extends Thing<any, infer TypeArg> ? TypeArg: never;
// export type StatementOf<T extends Thing<any, any>> = T extends Thing<infer TypeArg, any> ? TypeArg : never;

// export interface ThingBase<ContainedStatement extends StatementBase> extends Resource {}

// export type DocumentConstructor<
//     ContainedStatement extends Statement = Statement,
//     SelfDescribingStatement extends Statement = Statement
// > = new () => Document<ContainedStatement, SelfDescribingStatement>;

// export type DocumentWritableConstructor<
//     ContainedStatement extends Statement = Statement,
//     SelfDescribingStatement extends Statement = Statement
// > = new (...args: any[]) => DocumentWritable<ContainedStatement, SelfDescribingStatement>;

// export type DocumentWritableDecoratedConstructor<
//     ContainedStatement extends Statement = Statement,
//     SelfDescribingStatement extends Statement = Statement
// > = new (c: DocumentWritableConstructor<ContainedStatement, SelfDescribingStatement>) => DocumentWritable<ContainedStatement, SelfDescribingStatement>;

export type ThingConstructor<
    ThingType extends Thing = Thing
> = new (...args: any[]) => ThingType;

export interface WithNotifications {
    registerCallbackForStatementAdded(callbackfn: (value: string) => void): ThisType<this>;
    registerCallbackForStatementRemoved(callbackfn: (datatype: string) => void): ThisType<this>;
    registerCallbackForStatementChanged(callbackfn: (language: string) => void): ThisType<this>;
}

export interface ThingWithWriteOperations {
    createStatement(property: string, value: string, datatype?: string, language?: string): Statement;
    addStatement(other: Statement): Statement;
    addStatementAll(others: Iterable<Statement>): Statement[];
    setStatement(property: string, value: string, oldValue?: string, datatype?: string, language?: string): Statement | undefined;
    deleteStatement(statement: Statement): boolean;
    pop(): Statement | undefined;
    reverse(): void;
    shift(): Statement | undefined;
    sort(compareFn?: (a: Statement, b: Statement) => number): ThisType<this>;
    splice(start: number, deleteCount?: number, ...items: Statement[]): ThisType<this>;
}

export interface Thing extends Resource, /*ResourceCollection<ContainedStatement>,*/ WithContext, Comparable, Copyable 
{
    getStatement(property: string, language?: string): Statement | undefined;
    getStatementAll(property?: string, language?: string): Statement[];

    hasStatement(property?: string, language?: string): boolean;

    [Symbol.iterator](): Iterator<Statement>;

    at(index: number): Statement | undefined;
    contains(other: Thing): boolean;
    count(): number;
    every(predicate: (value: Statement, index?: number, array?: Statement[]) => boolean, thisArg?: any): boolean;
    filter(predicate: (value: Statement, index?: number, array?: Statement[]) => boolean): Statement[];
    find(predicate: (value: Statement, index?: number, obj?: Statement[]) => boolean, thisArg?: any): Statement | undefined;
    findIndex(predicate: (value: Statement, index?: number, obj?: Statement[]) => unknown, thisArg?: any): number
    forEach(callbackfn: (value: Statement, index?: number, array?: Statement[]) => void, thisArg?: any): void;
    includes(searchElement: Statement, fromIndex?: number): boolean;
    indexOf(searchElement: Statement, fromIndex?: number): number;
    keys(): IterableIterator<number>;
    map(callbackfn: (value: Statement, index?: number, array?: Statement[]) => unknown, thisArg?: any): unknown[];
    reduce(callbackfn: (previousValue: Statement, currentValue: Statement, currentIndex: number, array: Statement[]) => Statement): Statement; 
    slice(start?: number, end?: number): Thing;
    some(predicate: (value: Statement, index?: number, array?: Statement[]) => unknown, thisArg?: any): boolean;
}

export type ThingWritable = Thing & ThingWithWriteOperations;