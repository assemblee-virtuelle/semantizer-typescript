import { Comparable, Copyable, Resource, WithContext, WithContextWritable } from "./Common";
import { Statement } from "./Statement";
import { Thing, ThingWritable } from "./Thing";

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

// export type StatementOf<T extends Thing<any>> = T extends Thing<infer StatementType>? StatementType: never;

export type DocumentConstructor<
    ContainedThing extends Thing<any> = Thing,
    SelfDescribingThing extends Thing<any> = Thing
> = new () => Document<ContainedThing, SelfDescribingThing>;

export type DocumentWritableConstructor<
    ContainedThing extends Thing<any> = Thing,
    SelfDescribingThing extends Thing<any> = Thing
> = new (...args: any[]) => DocumentWritable<ContainedThing, SelfDescribingThing>;

export interface Document<
    ContainedThing extends Thing<any> = Thing,
    SelfDescribingThing extends Thing<any> = Thing
> extends Resource, 
    /*ResourceCollection<ContainedThing>,*/ WithContext, Comparable, Copyable 
{
    getThing(about: string): ContainedThing | undefined;
    getThingAboutSelf(): SelfDescribingThing | undefined;

    hasThing(about: string): boolean;
    hasThingAboutSelf(): boolean;

    getStatement(about: string | Thing, property: string, language?: string): Statement | undefined;
    getStatementAll(about: string | Thing, property?: string, language?: string): Statement[];

    getStatementAboutSelf(property: string, language?: string): Statement | undefined;
    getStatementAboutSelfAll(property?: string, language?: string): Statement[];

    hasStatement(about: string | Thing, property?: string, language?: string): boolean;
    hasStatementAboutSelf(property?: string, language?: string): boolean;

    [Symbol.iterator](): Iterator<ContainedThing>;

    at(index: number): ContainedThing | undefined;
    contains(other: Document<any>): boolean;
    count(): number;
    every(predicate: (value: ContainedThing, index?: number, array?: ContainedThing[]) => boolean, thisArg?: any): boolean;
    filter(predicate: (value: ContainedThing, index?: number, array?: ContainedThing[]) => boolean): ContainedThing[];
    filterContainedStatement(predicate: (value: Statement, index?: number, array?: Statement[]) => boolean): Statement[];
    find(predicate: (value: ContainedThing, index?: number, obj?: ContainedThing[]) => boolean, thisArg?: any): ContainedThing | undefined;
    findIndex(predicate: (value: ContainedThing, index?: number, obj?: ContainedThing[]) => unknown, thisArg?: any): number
    forEach(callbackfn: (value: ContainedThing, index?: number, array?: ContainedThing[]) => void, thisArg?: any): void;
    forEachStatement(callbackfn: (value: Statement, index?: number, array?: Statement[]) => void, thisArg?: any): void;
    includes(searchElement: ContainedThing, fromIndex?: number): boolean;
    indexOf(searchElement: ContainedThing, fromIndex?: number): number;
    keys(): IterableIterator<number>;
    map(callbackfn: (value: ContainedThing, index?: number, array?: ContainedThing[]) => unknown, thisArg?: any): unknown[];
    reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => Thing): ContainedThing; 
    slice(start?: number, end?: number): ThisType<this>;
    some(predicate: (value: ContainedThing, index?: number, array?: ContainedThing[]) => unknown, thisArg?: any): boolean;
}

export interface DocumentWritable<
    ContainedThing extends Thing<any> = Thing,
    SelfDescribingThing extends Thing<any> = Thing
> extends Document<ContainedThing, SelfDescribingThing>, WithContextWritable {
    createThing(uriOrNameHint?: string): ContainedThing;
    createThingAboutSelf(): SelfDescribingThing;
    addThing(other: Thing): ContainedThing;
    addThingAll(others: Iterable<Thing>): ContainedThing[];
    addThingAboutSelf(other: Thing): SelfDescribingThing;
    addThingAboutSelfAll(others: Iterable<Thing>): SelfDescribingThing[];

    createStatement(about: string | ContainedThing, property: string, value: string, datatype?: string, language?: string): Statement | undefined;
    createStatementAboutSelf(property: string, value: string, datatype?: string, language?: string): Statement;
    addStatement(other: Statement): Statement;
    addStatementAll(others: Iterable<Statement>): Statement[];
    addStatementAboutSelf(other: Statement): Statement;
    addStatementAboutSelfAll(others: Iterable<Statement>): Statement[];

    setStatement(about: string | ContainedThing, value: string, oldValue?: string, datatype?: string, language?: string): Statement | undefined;
    setStatementAboutSelf(value: string, oldValue?: string, datatype?: string, language?: string): Statement | undefined;

    deleteThing(thingOrUri: string | Thing): boolean;
    deleteStatement(statement: Statement): boolean;
    pop(): ContainedThing | undefined;
    reverse(): void;
    shift(): ContainedThing | undefined;
    sort(compareFn?: (a: ContainedThing, b: ContainedThing) => number): ThisType<this>;
    splice(start: number, deleteCount?: number, ...items: ContainedThing[]): ThisType<this>;
}