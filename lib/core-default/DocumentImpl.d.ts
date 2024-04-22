import { Context } from "../core/Common.js";
import { Document, DocumentWritable } from "../core/Document.js";
import { Statement } from "../core/Statement.js";
import { Thing, ThingConstructor, ThingWithWriteOperations } from "../core/Thing.js";
import ThingImpl from "./ThingImpl.js";
export declare class DocumentImpl<ContainedThing extends Thing, SelfDescribingThing extends Thing, ContainedThingImpl extends ContainedThing & ThingWithWriteOperations, SelfDescribingThingImpl extends SelfDescribingThing & ThingWithWriteOperations> implements DocumentWritable<ContainedThing, SelfDescribingThing> {
    private _containedThings;
    private _selfDescribingThing;
    private _containedThingImpl;
    private _selfDescribingThingImpl;
    constructor(containedThingImpl: ThingConstructor<ContainedThingImpl>, selfDescribingThingImpl: ThingConstructor<SelfDescribingThingImpl>);
    protected getContainedThingsInternal(): ContainedThingImpl[];
    protected getSelfDescribingThingInternal(): SelfDescribingThingImpl[];
    createThing(): ContainedThing;
    createThingAboutSelf(): SelfDescribingThing;
    addThing(other: Thing): ContainedThing;
    addThingAll(others: Iterable<Thing>): ContainedThing[];
    addThingAboutSelf(other: Thing): SelfDescribingThing;
    addThingAboutSelfAll(others: Iterable<Thing>): SelfDescribingThing[];
    createStatement(about: string | ContainedThing, property: string, value: string, datatype?: string | undefined, language?: string | undefined): Statement | undefined;
    createStatementAboutSelf(property: string, value: string, datatype?: string | undefined, language?: string | undefined): Statement;
    addStatement(other: Statement): Statement;
    addStatementAll(others: Iterable<Statement>): Statement[];
    addStatementAboutSelf(other: Statement): Statement;
    addStatementAboutSelfAll(others: Iterable<Statement>): Statement[];
    setStatement(about: string | ContainedThing, value: string, oldValue?: string | undefined, datatype?: string | undefined, language?: string | undefined): Statement | undefined;
    setStatementAboutSelf(value: string, oldValue?: string | undefined, datatype?: string | undefined, language?: string | undefined): Statement | undefined;
    deleteThing(thingOrUri: string | Thing): boolean;
    deleteStatement(statement: Statement): boolean;
    pop(): ContainedThing | undefined;
    reverse(): void;
    shift(): ContainedThing | undefined;
    sort(compareFn?: ((a: ContainedThing, b: ContainedThing) => number) | undefined): ThisType<this>;
    splice(start: number, deleteCount?: number | undefined, ...items: ContainedThing[]): ThisType<this>;
    private _getThing;
    getThing(about: string): ContainedThing | undefined;
    getThingAboutSelf(): SelfDescribingThing | undefined;
    hasThing(about: string): boolean;
    hasThingAboutSelf(): boolean;
    getStatement(about: string | Thing, property: string, language?: string | undefined): Statement | undefined;
    getStatementAll(about: string | Thing, property?: string | undefined, language?: string | undefined): Statement[];
    getStatementAboutSelf(property: string, language?: string | undefined): Statement | undefined;
    getStatementAboutSelfAll(property?: string | undefined, language?: string | undefined): Statement[];
    hasStatement(about: string | Thing, property?: string | undefined, language?: string | undefined): boolean;
    hasStatementAboutSelf(property?: string | undefined, language?: string | undefined): boolean;
    at(index: number): ContainedThing | undefined;
    contains(other: Document<any, Thing>): boolean;
    count(): number;
    every(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => boolean, thisArg?: any): boolean;
    filter(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => boolean): ContainedThing[];
    filterContainedStatement(predicate: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => boolean): Statement[];
    find(predicate: (value: ContainedThing, index?: number | undefined, obj?: ContainedThing[] | undefined) => boolean, thisArg?: any): ContainedThing | undefined;
    findIndex(predicate: (value: ContainedThing, index?: number | undefined, obj?: ContainedThing[] | undefined) => unknown, thisArg?: any): number;
    forEach(callbackfn: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => void, thisArg?: any): void;
    forEachStatement(callbackfn: (value: Statement, index?: number | undefined, array?: Statement[] | undefined) => void, thisArg?: any): void;
    includes(searchElement: ContainedThing, fromIndex?: number | undefined): boolean;
    indexOf(searchElement: ContainedThing, fromIndex?: number | undefined): number;
    keys(): IterableIterator<number>;
    map(callbackfn: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => unknown, thisArg?: any): unknown[];
    reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => Thing): ContainedThing;
    slice(start?: number | undefined, end?: number | undefined): ThisType<this>;
    some(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => unknown, thisArg?: any): boolean;
    [Symbol.iterator](): Iterator<ContainedThing, any, undefined>;
    getUri(): string;
    hasUri(): boolean;
    getContext(): Context | undefined;
    equals(other: ThisType<this>): boolean;
    difference(other: ThisType<this>): ThisType<this>;
    toCopy(): ThisType<this>;
    deleteContext(): void;
    setContext(context: Context): void;
}
export declare class DocumentImplDefault extends DocumentImpl<Thing, Thing, ThingImpl, ThingImpl> {
    constructor();
}
export default DocumentImpl;
//# sourceMappingURL=DocumentImpl.d.ts.map