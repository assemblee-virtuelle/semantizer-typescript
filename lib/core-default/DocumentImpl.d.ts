import { Context, Resource } from "../core/Common.js";
import { Document, DocumentWritable, StatementOf } from "../core/Document.js";
import { Statement } from "../core/Statement.js";
import { Thing, ThingConstructor, ThingWritable } from "../core/Thing.js";
export declare class DocumentImpl<ContainedThing extends ThingWritable<any>, SelfDescribingThing extends ThingWritable<any>> implements DocumentWritable<ContainedThing, SelfDescribingThing> {
    private _containedThings;
    private _selfDescribingThing;
    private _containedThingImpl;
    private _selfDescribingThingImpl;
    constructor(containedThingImpl: ThingConstructor<ContainedThing>, selfDescribingThingImpl: ThingConstructor<SelfDescribingThing>);
    protected getContainedThingsInternal(): ContainedThing[];
    protected getSelfDescribingThingInternal(): SelfDescribingThing[];
    createThing(uriOrNameHint?: string | Resource): ContainedThing;
    createThingAboutSelf(): SelfDescribingThing;
    addThing(other: Thing): ContainedThing;
    addThingAll(others: Iterable<Thing>): ContainedThing[];
    addThingAboutSelf(other: Thing): SelfDescribingThing;
    addThingAboutSelfAll(others: Iterable<Thing>): SelfDescribingThing[];
    createStatement(about: string | Resource, property: string, value: string, datatype?: string | undefined, language?: string | undefined): StatementOf<ContainedThing>;
    createStatementAboutSelf(property: string, value: string, datatype?: string | undefined, language?: string | undefined): StatementOf<SelfDescribingThing>;
    addStatement(other: Statement): StatementOf<ContainedThing>;
    addStatementAll(others: Iterable<Statement>): StatementOf<ContainedThing>[];
    addStatementAboutSelf(other: Statement): StatementOf<SelfDescribingThing>;
    addStatementAboutSelfAll(others: Iterable<Statement>): StatementOf<SelfDescribingThing>[];
    setStatement(about: string | Resource, property: string, value: string, oldValue?: string | undefined, datatype?: string | undefined, language?: string | undefined): StatementOf<ContainedThing>;
    setStatementAboutSelf(property: string, value: string, oldValue?: string | undefined, datatype?: string | undefined, language?: string | undefined): StatementOf<SelfDescribingThing>;
    setThing(thing: ContainedThing, uri?: string): ContainedThing;
    setThingAt(index: number, thing: ContainedThing): ContainedThing;
    removeThing(thingOrUri: string | Resource): boolean;
    removeStatement(statement: Statement): boolean;
    removeStatement(about: string | Resource, property: string, value: string, language?: string): boolean;
    pop(): ContainedThing | undefined;
    reverse(): void;
    shift(): ContainedThing | undefined;
    sort(compareFn?: ((a: ContainedThing, b: ContainedThing) => number) | undefined): ThisType<this>;
    splice(start: number, deleteCount?: number): ContainedThing[];
    splice(start: number, deleteCount: number, ...items: ContainedThing[]): ContainedThing[];
    private _getThing;
    getThing(about: string | Resource): ContainedThing;
    getThingAboutSelf(): SelfDescribingThing;
    hasThing(about: string | Resource): boolean;
    hasThingAboutSelf(): boolean;
    getStatement(about: string | Resource, property: string, language?: string | undefined): StatementOf<ContainedThing>;
    getStatementAll(about: string | Resource, property?: string | undefined, language?: string | undefined): StatementOf<ContainedThing>[];
    getStatementAboutSelf(property: string, language?: string | undefined): StatementOf<SelfDescribingThing> | undefined;
    getStatementAboutSelfAll(property?: string | undefined, language?: string | undefined): StatementOf<SelfDescribingThing>[];
    hasStatement(about: string | Resource, property?: string | undefined, language?: string | undefined): boolean;
    hasStatementAboutSelf(property?: string | undefined, language?: string | undefined): boolean;
    at(index: number): ContainedThing | undefined;
    contains(other: Document<any, Thing>): boolean;
    count(): number;
    every(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => boolean, thisArg?: any): boolean;
    filter(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => boolean): ContainedThing[];
    filterContainedStatement(predicate: (value: StatementOf<ContainedThing>, index?: number | undefined, array?: StatementOf<ContainedThing>[] | undefined) => boolean): StatementOf<ContainedThing>[];
    find(predicate: (value: ContainedThing, index?: number | undefined, obj?: ContainedThing[] | undefined) => boolean, thisArg?: any): ContainedThing | undefined;
    findIndex(predicate: (value: ContainedThing, index?: number | undefined, obj?: ContainedThing[] | undefined) => unknown, thisArg?: any): number;
    forEach(callbackfn: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => void, thisArg?: any): void;
    forEachStatement(callbackfn: (value: StatementOf<ContainedThing>, index?: number | undefined, array?: StatementOf<ContainedThing>[] | undefined) => void, thisArg?: any): void;
    includes(searchElement: ContainedThing, fromIndex?: number | undefined): boolean;
    indexOf(searchElement: ContainedThing, fromIndex?: number | undefined): number;
    keys(): IterableIterator<number>;
    map(callbackfn: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => unknown, thisArg?: any): unknown[];
    reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => Thing): ContainedThing;
    slice(start?: number | undefined, end?: number | undefined): ThisType<this>;
    some(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => unknown, thisArg?: any): boolean;
    [Symbol.iterator](): Iterator<ContainedThing>;
    getUri(): string;
    hasUri(): boolean;
    getContext(): Context | undefined;
    equals(other: ThisType<this>): boolean;
    difference(other: ThisType<this>): ThisType<this>;
    toCopy(): ThisType<this>;
    deleteContext(): void;
    setContext(context: Context): void;
}
export declare class DocumentImplDefault extends DocumentImpl<ThingWritable<Statement>, ThingWritable<Statement>> {
    constructor();
}
export default DocumentImpl;
//# sourceMappingURL=DocumentImpl.d.ts.map