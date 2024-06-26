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
    ThingType extends ThingWithNonDestructiveOperations<any> = ThingWithNonDestructiveOperations<Statement>
> = new (...args: any[]) => ThingType;

// export interface WithNotifications {
//     registerCallbackForStatementAdded(callbackfn: (value: string) => void): ThisType<this>;
//     registerCallbackForStatementRemoved(callbackfn: (datatype: string) => void): ThisType<this>;
//     registerCallbackForStatementChanged(callbackfn: (language: string) => void): ThisType<this>;
// }

export interface ThingNonDesctructiveOperations<
    StatementType extends Statement = Statement
> {
    getStatement(property: string, language?: string): StatementType | undefined;
    getStatementAll(property?: string, language?: string): StatementType[];

    hasStatement(property?: string, language?: string): boolean;

    getTypes(): string[];
    isTypeOf(type: string, ...others: string[]): boolean;

    at(index: number): StatementType | undefined;
    contains(other: ThingWithNonDestructiveOperations): boolean;
    count(): number;
    every(predicate: (value: StatementType, index?: number, array?: StatementType[]) => boolean, thisArg?: any): boolean;
    filter(predicate: (value: StatementType, index?: number, array?: StatementType[]) => boolean): StatementType[];
    find(predicate: (value: StatementType, index?: number, obj?: StatementType[]) => boolean, thisArg?: any): StatementType | undefined;
    findIndex(predicate: (value: StatementType, index?: number, obj?: StatementType[]) => unknown, thisArg?: any): number
    forEach(callbackfn: (value: StatementType, index?: number, array?: StatementType[]) => void, thisArg?: any): void;
    includes(searchElement: StatementType, fromIndex?: number): boolean;
    indexOf(searchElement: StatementType, fromIndex?: number): number;
    keys(): IterableIterator<number>;
    map(callbackfn: (value: StatementType, index?: number, array?: StatementType[]) => unknown, thisArg?: any): unknown[];
    reduce(callbackfn: (previousValue: StatementType, currentValue: StatementType, currentIndex: number, array: StatementType[]) => StatementType): StatementType; 
    slice(start?: number, end?: number): ThingWithNonDestructiveOperations;
    some(predicate: (value: StatementType, index?: number, array?: StatementType[]) => unknown, thisArg?: any): boolean;
}

export interface ThingDesctructiveOperations<
    StatementType extends Statement = Statement
> {
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

export interface IterableThing<
    StatementType extends Statement = Statement
> {
    [Symbol.iterator](): Iterator<StatementType>;
}

export type ThingBase<
    StatementType extends Statement = Statement
> = IterableThing<StatementType> & Resource & WithContext & Comparable & Copyable;

export type ThingWithNonDestructiveOperations<
    StatementType extends Statement = Statement
> = ThingBase &
    ThingNonDesctructiveOperations<StatementType>;

export type ThingWithDestructiveOperations<
    StatementType extends Statement = Statement
> = ThingBase &
    ThingNonDesctructiveOperations<StatementType> & 
    ThingDesctructiveOperations<StatementType>;

export type Thing<
    StatementType extends Statement = Statement
> = ThingWithDestructiveOperations<StatementType>;