import { Comparable, Copyable, Resource, WithContext, WithContextWritable } from "./Common";
import { Statement } from "./Statement";
import { Thing } from "./Thing";
export type DocumentConstructor<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> = new () => Document<ContainedThing, SelfDescribingThing>;
export type DocumentWritableConstructor<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> = new (...args: any[]) => DocumentWritable<ContainedThing, SelfDescribingThing>;
export type DocumentWritableDecoratedConstructor<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> = new (c: DocumentWritableConstructor<ContainedThing, SelfDescribingThing>) => DocumentWritable<ContainedThing, SelfDescribingThing>;
export interface Document<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> extends Resource, WithContext, Comparable, Copyable {
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
    findIndex(predicate: (value: ContainedThing, index?: number, obj?: ContainedThing[]) => unknown, thisArg?: any): number;
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
export interface DocumentWritable<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> extends Document<ContainedThing, SelfDescribingThing>, WithContextWritable {
    createThing(): ContainedThing;
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
//# sourceMappingURL=Document.d.ts.map