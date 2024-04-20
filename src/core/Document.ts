import { Comparable, Copyable, Resource, ResourceCollection, WithContext, WithContextWritable } from "./Common";

// type ContainedThingOfDocument<T extends Document<any, any>> = T extends Document<infer TypeArg, any> ? TypeArg : never;
// type ContainedThingOfDocumentWritable<T extends DocumentWritable<any>> = T extends DocumentWritable<infer TypeArg> ? ContainedThingOfDocument<TypeArg> : never;
// export type ContainedThingOf<T extends Document<any, any> | DocumentWritable<any>> = T extends Document<any, any> ? ContainedThingOfDocument<T>: T extends DocumentWritable<any>? ContainedThingOfDocumentWritable<T>: never;

// type SelfDescribingThingOfDocument<T extends Document<any, any>> = T extends Document<any, infer TypeArg> ? TypeArg : never;
// type SelfDescribingThingOfDocumentWritable<T extends DocumentWritable<any>> = T extends DocumentWritable<infer TypeArg> ? SelfDescribingThingOfDocument<TypeArg> : never;
// export type SelfDescribingThingOf<T extends Document<any, any> | DocumentWritable<any>> = T extends Document<any, any> ? SelfDescribingThingOfDocument<T>: T extends DocumentWritable<any>? SelfDescribingThingOfDocumentWritable<T>: never;

// //export type ContainedThingOfReadonly<T extends Document<any, any>> = T extends Document<any, any, infer TypeArg, any> ? TypeArg : never;
// //export type SelfDescribingThingOfReadonly<T extends Document<any, any>> = T extends Document<any, any, any, infer TypeArg> ? TypeArg : never;
// type StatementOfDocumentBase<T extends DocumentBase<any, any>> = T extends DocumentBase<infer TypeArg, any> ? TypeArg extends ThingBase<infer StatementType> ? StatementType: never : never;
// type StatementOfDocument<T extends Document<any, any>> = T extends Document<infer TypeArg, any> ? TypeArg extends Thing<infer StatementType, any> ? StatementType: never : never;
// export type StatementOf<T extends DocumentBase<any, any> | Document<any, any>> = T extends DocumentBase<any, any> ? StatementOfDocumentBase<T>: T extends Document<any, any>? StatementOfDocument<T>: never;

// type InputOfDocumentWritable<T extends DocumentWritable<any>> = T extends DocumentWritable<infer TypeArg> ? TypeArg : never;
// type InputOfDocumentReadonly<T extends Document<any, any>> = T extends Document<infer TypeArg, any> ? TypeArg : never;
// export type InputOf<T extends Document<any, any> | DocumentWritable<any>> = T extends DocumentWritable<any> ? InputOfDocumentWritable<T> : T extends Document<any, any> ? InputOfDocumentReadonly<T> : never;

// // export type OutputOfDocumentWritable<T extends DocumentWritable<any, any>> = T extends Document<any, infer TypeArg> ? TypeArg : never;
// type OutputOfDocumentReadonly<T extends Document<any, any>> = T extends DocumentBase<any, infer TypeArg> ? TypeArg : never;
// export type OutputOf<T extends Document<any, any>/* | DocumentWritable<any, any>*/> = /*T extends DocumentWritable<any, any> ? OutputOfDocumentWritable<T> : */T extends Document<any, any> ? OutputOfDocumentReadonly<T> : never;

export interface Statement {
    getSubject(): string;
    getValue(): string;
    getDatatype(): string | undefined;
    getLanguage(): string | undefined;
}

export interface StatementWritable extends Statement {
    setValue(value: string): this;
    setDatatype(datatype: string): this;
    setLanguage(language: string): this;
}

export type DocumentConstructor<
    ContainedStatement extends Statement = Statement,
    SelfDescribingStatement extends Statement = Statement
> = new () => Document<ContainedStatement, SelfDescribingStatement>;

export type DocumentWritableConstructor<
    ContainedStatement extends Statement = Statement,
    SelfDescribingStatement extends Statement = Statement
> = new () => DocumentWritable<ContainedStatement, SelfDescribingStatement>;

export interface Document<
    ContainedStatement extends Statement = Statement,
    SelfDescribingStatement extends Statement = Statement
> extends Resource, 
    ResourceCollection<ContainedStatement>, WithContext, Comparable, Copyable 
{
    getStatement(about: string, property: string): ContainedStatement;
    getStatementAll(about: string, property: string): ContainedStatement[];

    getStatementAboutSelf(property: string): SelfDescribingStatement;
    getStatementAboutSelfAll(property: string): SelfDescribingStatement[];

    hasStatement(about: string, property: string): boolean;
    hasStatementAboutSelf(): boolean;

    [Symbol.iterator](): Iterator<ContainedStatement>;

    at(index: number): ContainedStatement | undefined;
    contains(other: Document<any>): boolean;
    count(): number; //callbackfn?: (element: StatementType, owner?: ResourceCollection<Statement>) => boolean): number;
    every(predicate: (value: ContainedStatement, index?: number, array?: ContainedStatement[]) => boolean, thisArg?: any): boolean;
    filter(predicate: (value: ContainedStatement, index?: number, array?: ContainedStatement[]) => boolean): ContainedStatement[];
    find(predicate: (value: ContainedStatement, index?: number, obj?: ContainedStatement[]) => boolean, thisArg?: any): ContainedStatement | undefined;
    findIndex(predicate: (value: ContainedStatement, index?: number, obj?: ContainedStatement[]) => unknown, thisArg?: any): number
    forEach(callbackfn: (value: ContainedStatement, index?: number, array?: ContainedStatement[]) => void, thisArg?: any): void;
    includes(searchElement: ContainedStatement, fromIndex?: number): boolean;
    indexOf(searchElement: ContainedStatement, fromIndex?: number): number;
    keys(): IterableIterator<number>;
    map(callbackfn: (value: ContainedStatement, index?: number, array?: ContainedStatement[]) => unknown, thisArg?: any): unknown[];
    reduce(callbackfn: (previousValue: ContainedStatement, currentValue: ContainedStatement, currentIndex: number, array: ContainedStatement[]) => Statement): ContainedStatement; 
    slice(start?: number, end?: number): Document;
    some(predicate: (value: ContainedStatement, index?: number, array?: ContainedStatement[]) => unknown, thisArg?: any): boolean;
}

export interface DocumentWritable<
    ContainedStatement extends Statement = Statement,
    SelfDescribingStatement extends Statement = Statement
> extends Document<ContainedStatement, SelfDescribingStatement>, WithContextWritable {
    createStatement(about: string, value: string): ThisType<this>;
    addStatement(other: ContainedStatement): ThisType<this>;
    addStatementAll(others: Iterable<ContainedStatement>): ThisType<this>;

    createStatementAboutSelf(value: string): ThisType<this>;
    addStatementAboutSelf(other: ContainedStatement): ThisType<this>;
    addStatementAboutSelfAll(others: Iterable<ContainedStatement>): ThisType<this>;

    delete(element: ContainedStatement): ThisType<this>;
    deleteMatches(uri?: string | Resource, property?: string, value?: string): ThisType<this>;
    pop(): ContainedStatement | undefined;
    reverse(): void;
    shift(): ContainedStatement | undefined;
    sort(compareFn?: (a: ContainedStatement, b: ContainedStatement) => number): ThisType<this>;
    splice(start: number, deleteCount?: number, ...items: ContainedStatement[]): ThisType<this>;
    //union(other: ThisType<this>): ThisType<this>;
}