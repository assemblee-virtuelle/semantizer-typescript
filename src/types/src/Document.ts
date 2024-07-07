import { Comparable, Copyable, Loader, Resource, WithContext } from "./Common";
import { Statement, StatementConstructor, StatementConstructorMixin, StatementWithDestructiveOperations } from "./Statement";
import { IterableThing, Thing, ThingConstructor, ThingConstructorMixin, ThingWithNonDestructiveOperations } from "./Thing";

type ContainedThingOfDocument<T extends DocumentWithNonDestructiveOperations<any, any>> = T extends DocumentWithNonDestructiveOperations<infer TypeArg, any> ? TypeArg : never;
type ContainedThingOfDocumentWritable<T extends Document<any, any>> = T extends Document<infer TypeArg, any> ? TypeArg : never;
export type ContainedThingOf<T extends DocumentWithNonDestructiveOperations<any, any> | Document<any, any>> = T extends DocumentWithNonDestructiveOperations<any, any> ? ContainedThingOfDocument<T>: T extends Document<any>? ContainedThingOfDocumentWritable<T>: never;

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

export type StatementOf<T extends ThingWithNonDestructiveOperations<any>> = T extends ThingWithNonDestructiveOperations<infer StatementType>? StatementType: never;

export type DocumentConstructor<
    ContainedThing extends Thing<any> = Thing,
    SelfDescribingThing extends Thing<any> = Thing
> = new (factory: DocumentImplFactory<ContainedThing, SelfDescribingThing>) => Document<ContainedThing, SelfDescribingThing>;

export type DocumentWithNonDestructiveOperationsConstructor<
    ContainedThing extends ThingWithNonDestructiveOperations<any> = ThingWithNonDestructiveOperations,
    SelfDescribingThing extends ThingWithNonDestructiveOperations<any> = ThingWithNonDestructiveOperations
> = new () => DocumentWithNonDestructiveOperations<ContainedThing, SelfDescribingThing>;

export type DocumentWithDestructiveOperationsConstructor<
    ContainedThing extends ThingWithNonDestructiveOperations<any> = ThingWithNonDestructiveOperations,
    SelfDescribingThing extends ThingWithNonDestructiveOperations<any> = ThingWithNonDestructiveOperations
> = new (...args: any[]) => Document<ContainedThing, SelfDescribingThing>;

export type Constructed<
    Constructor extends new (...args: any[]) => any
> = Constructor extends new (...args: any[]) => infer R? R: never;

// export interface ConcreateDocumentConfig {
//     getDocumentImplementation<ContainedThing extends Thing<any>, SelfDescribingThing extends Thing<any>>(): DocumentConstructor<ContainedThing, SelfDescribingThing>;
//     getThingImplementation<StatementType extends StatementWithDestructiveOperations>(): ThingConstructor<Thing<StatementType>, StatementType>;
//     getStatementImplementation(): StatementConstructor<Statement>;
// }

export interface DocumentImplFactory<
    ContainedThing extends Thing<any> = Thing<Statement>,
    SelfDescribingThing extends Thing<any> = Thing<Statement>
> {
    createContainedThing(uri: string): ContainedThing;
    createSelfDescribingThing(): SelfDescribingThing;
}

export interface DocumentFactory<
    DocumentType extends Document<any, any> = Document<Thing, Thing>
> {
    create(): DocumentType;
}

export interface DocumentNonDestructiveOperations<
    ContainedThing extends ThingWithNonDestructiveOperations<any> = ThingWithNonDestructiveOperations,
    SelfDescribingThing extends ThingWithNonDestructiveOperations<any> = ThingWithNonDestructiveOperations
> {
    /**
     * Find a thing inside the document.
     * 
     * @throws Error if the thing is not contained in the document.
     * @param about The URI of the thing.
     */
    getThing(about: string | Resource): ContainedThing;

    hasThing(about: string | Resource): boolean;
    hasThingAboutSelf(): boolean;

    // getConcreateDocumentConfig(): ConcreateDocumentConfig;

    getStatement(about: string | Resource, property: string, language?: string): StatementOf<ContainedThing>;
    getStatementAll(about: string | Resource, property?: string, language?: string): StatementOf<ContainedThing>[];

    getStatementAboutSelf(property: string, language?: string): StatementOf<SelfDescribingThing> | undefined;
    getStatementAboutSelfAll(property?: string, language?: string): StatementOf<SelfDescribingThing>[];

    hasStatement(about: string | Resource, property?: string, language?: string): boolean;
    hasStatementAboutSelf(property?: string, language?: string): boolean;

    // setContext(context: any): void;

    at(index: number): ContainedThing | undefined;
    contains(other: DocumentWithNonDestructiveOperations<any>): boolean;
    count(): number;
    every(predicate: (value: ContainedThing, index?: number, array?: ContainedThing[]) => boolean, thisArg?: any): boolean;
    filter(predicate: (value: ContainedThing, index?: number, array?: ContainedThing[]) => boolean): ContainedThing[];
    filterContainedStatement(predicate: (value: StatementOf<ContainedThing>, index?: number, array?: StatementOf<ContainedThing>[]) => boolean): StatementOf<ContainedThing>[];
    find(predicate: (value: ContainedThing, index?: number, obj?: ContainedThing[]) => boolean, thisArg?: any): ContainedThing | undefined;
    findIndex(predicate: (value: ContainedThing, index?: number, obj?: ContainedThing[]) => unknown, thisArg?: any): number
    forEach(callbackfn: (value: ContainedThing, index?: number, array?: ContainedThing[]) => void, thisArg?: any): void;
    forEachStatement(callbackfn: (value: StatementOf<ContainedThing>, index?: number, array?: StatementOf<ContainedThing>[]) => void, thisArg?: any): void;
    includes(searchElement: ContainedThing, fromIndex?: number): boolean;
    indexOf(searchElement: ContainedThing, fromIndex?: number): number;
    keys(): IterableIterator<number>;
    map(callbackfn: (value: ContainedThing, index?: number, array?: ContainedThing[]) => unknown, thisArg?: any): unknown[];
    reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => ThingWithNonDestructiveOperations): ContainedThing; 
    slice(start?: number, end?: number): ThisType<this>;
    some(predicate: (value: ContainedThing, index?: number, array?: ContainedThing[]) => unknown, thisArg?: any): boolean;
}

export interface DocumentDestructiveOperations<
    ContainedThing extends ThingWithNonDestructiveOperations<any> = ThingWithNonDestructiveOperations,
    SelfDescribingThing extends ThingWithNonDestructiveOperations<any> = ThingWithNonDestructiveOperations
> {
    createThing(uriOrNameHint?: string | Resource): ContainedThing;
    createThingAboutSelf(): SelfDescribingThing;
    // TODO: createThingWithoutUri(uriOrNameHint?: string | Resource): ContainedThing;
    addThing(other: ThingWithNonDestructiveOperations): ContainedThing;
    addThingAll(others: Iterable<ThingWithNonDestructiveOperations>): ContainedThing[];
    addThingAboutSelf(other: ThingWithNonDestructiveOperations): SelfDescribingThing;
    addThingAboutSelfAll(others: Iterable<ThingWithNonDestructiveOperations>): SelfDescribingThing[];

    createStatement(about: string | Resource, property: string, value: string, datatype?: string, language?: string): StatementOf<ContainedThing>;
    createStatementAboutSelf(property: string, value: string, datatype?: string, language?: string): StatementOf<SelfDescribingThing>;
    addStatement(other: Statement): StatementOf<ContainedThing>;
    addStatementAll(others: Iterable<Statement>): StatementOf<ContainedThing>[];
    addStatementAboutSelf(other: Statement): StatementOf<SelfDescribingThing>;
    addStatementAboutSelfAll(others: Iterable<Statement>): StatementOf<SelfDescribingThing>[];

    load(loader?: Loader): Promise<void>;

    setThing(thing: ContainedThing, uri?: string): ContainedThing;
    setThingAt(index: number, thing: ContainedThing): ContainedThing;

    setStatement(about: string | Resource, property: string, value: string, oldValue?: string, datatype?: string, language?: string): StatementOf<ContainedThing>;
    setStatementAboutSelf(property: string, value: string, oldValue?: string, datatype?: string, language?: string): StatementOf<SelfDescribingThing>;

    removeThing(thingOrUri: string | Resource): boolean;
    removeStatement(statement: Statement): boolean;
    removeStatement(about: string | Resource, property: string, value: string, language?: string): boolean;
    
    pop(): ContainedThing | undefined;
    reverse(): void;
    shift(): ContainedThing | undefined;
    sort(compareFn?: (a: ContainedThing, b: ContainedThing) => number): ThisType<this>;
    
    splice(start: number, deleteCount?: number): ContainedThing[];
    splice(start: number, deleteCount: number, ...items: ContainedThing[]): ContainedThing[];
}

export interface IterableDocument<
    ContainedThing extends IterableThing<any>,
    SelfDescribingThing extends IterableThing<any>
> extends Iterable<ContainedThing> {
    [Symbol.iterator](): Iterator<ContainedThing>;
    getThingAboutSelf(): SelfDescribingThing | undefined;
    getThingAllIterator(): Iterator<Thing<Statement>>;
    getStatementAllIterator(): Iterator<Statement>;
}

export type DocumentBase<
    ContainedThing extends ThingWithNonDestructiveOperations<any> = ThingWithNonDestructiveOperations,
    SelfDescribingThing extends ThingWithNonDestructiveOperations<any> = ThingWithNonDestructiveOperations
> = IterableDocument<ContainedThing, SelfDescribingThing> & Resource & WithContext & Comparable & Copyable;

export type DocumentWithNonDestructiveOperations<
    ContainedThing extends ThingWithNonDestructiveOperations<any> = ThingWithNonDestructiveOperations,
    SelfDescribingThing extends ThingWithNonDestructiveOperations<any> = ThingWithNonDestructiveOperations
> = DocumentBase<ContainedThing, SelfDescribingThing> & 
    DocumentNonDestructiveOperations<ContainedThing, SelfDescribingThing>;

export type DocumentWithDestructiveOperations<
    ContainedThing extends ThingWithNonDestructiveOperations<any> = ThingWithNonDestructiveOperations,
    SelfDescribingThing extends ThingWithNonDestructiveOperations<any> = ThingWithNonDestructiveOperations
> = DocumentBase<ContainedThing, SelfDescribingThing> & 
    DocumentNonDestructiveOperations<ContainedThing, SelfDescribingThing> &
    DocumentDestructiveOperations<ContainedThing, SelfDescribingThing>;

export type Document<
    ContainedThing extends ThingWithNonDestructiveOperations<any> = ThingWithNonDestructiveOperations,
    SelfDescribingThing extends ThingWithNonDestructiveOperations<any> = ThingWithNonDestructiveOperations
> = DocumentWithDestructiveOperations<ContainedThing, SelfDescribingThing>;