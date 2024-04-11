import { Context } from "./Context";
import Factory, { FactoryForCopying } from "./Factory";
import Resource from "./Resource";
import { Statement, StatementReadonly } from "./Statement";
import { Thing, ThingBase, ThingReadonly } from "./Thing";
export type ContainedThingOf<T extends DocumentBase<any, any> | Document<any, any, any, any>> = T extends DocumentBase<infer TypeArg, any> ? TypeArg : T extends Document<infer TypeArg, any, any, any> ? TypeArg : never;
export type SelfDescribingThingOf<T extends DocumentBase<any, any>> = T extends DocumentBase<any, infer TypeArg> ? TypeArg : never;
export type ContainedThingOfReadonly<T extends Document<any, any, any, any>> = T extends Document<any, any, infer TypeArg, any> ? TypeArg : never;
export type SelfDescribingThingOfReadonly<T extends Document<any, any, any, any>> = T extends Document<any, any, any, infer TypeArg> ? TypeArg : never;
export type StatementOf<T extends DocumentBase<any, any> | Document<any, any, any, any>> = T extends DocumentBase<infer TypeArg, any> ? TypeArg extends ThingBase<infer StatementType> ? StatementType : never : never;
export type StatementOfDoc<T extends Document<any, any, any, any>> = T extends Document<infer TypeArg, any, any, any> ? TypeArg extends Thing<infer StatementType, any> ? StatementType : never : never;
export type Constructor<T = {}> = new (...args: any[]) => T;
export interface DocumentBase<ContainedThing extends ThingBase<any>, SelfDescribingThing extends ThingBase<any>> extends Resource, Iterable<ContainedThing> {
    get(uri: string | Resource): ContainedThing | undefined;
    getContext(): Context | undefined;
    getThingThatSelfDescribes(): SelfDescribingThing | undefined;
    has(thing: string | Resource): boolean;
    hasThingThatSelfDescribes(): boolean;
    isEmpty(): boolean;
    toCanonical(): string;
    toStream(): string;
    [Symbol.iterator](): Iterator<ContainedThing>;
    toCopy(): ThisType<this>;
}
export interface WithFactory<DocumentType extends Document<any, any, any, any>> {
    getFactory(): Factory<DocumentType>;
}
export interface WithFactoryForCopying<InputDocument extends DocumentBase<any, any>, OutputDocument extends DocumentBase<any, any>> {
    getFactoryForCopying(): FactoryForCopying<InputDocument, OutputDocument>;
}
export interface WithReadOperations<DocumentType extends Document<any, any, any, any> | DocumentReadonly<any, any, any, any>> {
    at(index: number): ContainedThingOf<DocumentType> | undefined;
    contains(other: ThisType<this>): boolean;
    count(callbackfn?: (thing: ContainedThingOf<DocumentType>, document?: ThisType<this>) => boolean): number;
    difference(other: ThisType<this>): ThisType<this>;
    equals(other: ThisType<this>): boolean;
    every(predicate: (value: ContainedThingOf<DocumentType>, index?: number, array?: ContainedThingOf<DocumentType>[]) => boolean, thisArg?: any): boolean;
    filter(predicate: (value: ContainedThingOf<DocumentType>, index?: number, array?: ContainedThingOf<DocumentType>[]) => boolean): ContainedThingOf<DocumentType>[];
    find(predicate: (value: ContainedThingOf<DocumentType>, index?: number, obj?: ContainedThingOf<DocumentType>[]) => boolean, thisArg?: any): ContainedThingOf<DocumentType> | undefined;
    findIndex(predicate: (value: ContainedThingOf<DocumentType>, index?: number, obj?: ContainedThingOf<DocumentType>[]) => unknown, thisArg?: any): number;
    forEach(callbackfn: (value: ContainedThingOf<DocumentType>, index?: number, array?: ContainedThingOf<DocumentType>[]) => void, thisArg?: any): void;
    includes(searchElement: ContainedThingOf<DocumentType>, fromIndex?: number | undefined): boolean;
    indexOf(searchElement: ContainedThingOf<DocumentType>, fromIndex?: number | undefined): number;
    keys(): IterableIterator<number>;
    map(callbackfn: (value: ContainedThingOf<DocumentType>, index: number, array: ContainedThingOf<DocumentType>[]) => unknown, thisArg?: any): unknown[];
    reduce(callbackfn: (previousValue: ContainedThingOf<DocumentType>, currentValue: ContainedThingOf<DocumentType>, currentIndex: number, array: ContainedThingOf<DocumentType>[]) => ContainedThingOf<DocumentType>): ContainedThingOf<DocumentType>;
    slice(start?: number, end?: number): ThisType<this>;
    some(predicate: (value: ContainedThingOf<DocumentType>, index: number, array: ContainedThingOf<DocumentType>[]) => unknown, thisArg?: any): boolean;
}
export interface WithWriteOperations<DocumentType extends DocumentBase<any, any>> {
    add(thing: ContainedThingOf<DocumentType>): ThisType<this>;
    addAll(documentOrThings: DocumentBase<any, any> | ContainedThingOf<DocumentType>[]): ThisType<this>;
    delete(thingOrUri: string | ContainedThingOf<DocumentType>): ThisType<this>;
    deleteContext(): void;
    deleteMatches(uri?: string | Resource, property?: string, value?: string): ThisType<this>;
    pop(): ContainedThingOf<DocumentType> | undefined;
    reverse(): void;
    setContext(context: Context): void;
    shift(): ContainedThingOf<DocumentType> | undefined;
    sort(compareFn?: (a: ContainedThingOf<DocumentType>, b: ContainedThingOf<DocumentType>) => number): ThisType<this>;
    splice(start: number, deleteCount?: number, ...items: ContainedThingOf<DocumentType>[]): ThisType<this>;
    union(other: DocumentBase<any, any>): ThisType<this>;
}
export interface WithCreateOperations<DocumentType extends DocumentBase<any, any>> {
    createThingToSelfDescribe(): SelfDescribingThingOf<DocumentType>;
    createThingWithUri(nameHintOrUri?: string): ContainedThingOf<DocumentType>;
    createThingWithoutUri(nameHint?: string): ContainedThingOf<DocumentType>;
}
export interface WithCopyOperations<DocumentResulting extends DocumentReadonly<any, any, any, any>> {
    toCopyReadonly(): DocumentResulting;
}
export interface WithCopyWritableOperations {
    toCopyWritable<DocumentType extends Document<any, any, any, any>>(): DocumentType;
}
export type Document<ContainedThing extends Thing<Statement<any>, any> | ThingReadonly<any, any>, SelfDescribingThing extends Thing<Statement<any>, any> | ThingReadonly<any, any>, ContainedThingReadonly extends ThingReadonly<any, any>, SelfDescribingThingReadonly extends ThingReadonly<any, any>> = DocumentBase<ContainedThing, SelfDescribingThing> & WithFactory<Document<ContainedThing, SelfDescribingThing, ContainedThingReadonly, SelfDescribingThingReadonly>> & // Should be this
WithFactoryForCopying<DocumentBase<ContainedThing, SelfDescribingThing>, DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly, ContainedThing, SelfDescribingThing>> & WithReadOperations<Document<ContainedThing, SelfDescribingThing, ContainedThingReadonly, SelfDescribingThingReadonly>> & WithWriteOperations<Document<ContainedThing, SelfDescribingThing, ContainedThingReadonly, SelfDescribingThingReadonly>> & WithCreateOperations<Document<ContainedThing, SelfDescribingThing, ContainedThingReadonly, SelfDescribingThingReadonly>> & WithCopyOperations<DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly, ContainedThing, SelfDescribingThing>>;
export type DocumentReadonly<ContainedThing extends ThingReadonly<StatementReadonly<any>, any>, SelfDescribingThing extends ThingReadonly<StatementReadonly<any>, any>, ContainedThingWritable extends Thing<Statement<any>, any> | ThingReadonly<any, any>, SelfDescribingThingWritable extends Thing<Statement<any>, any> | ThingReadonly<any, any>> = DocumentBase<ContainedThing, SelfDescribingThing> & WithFactoryForCopying<DocumentBase<ContainedThing, SelfDescribingThing>, Document<ContainedThingWritable, SelfDescribingThingWritable, ContainedThing, SelfDescribingThing>> & // TODO: use DocumentReadonly instead
WithReadOperations<DocumentReadonly<ContainedThing, SelfDescribingThing, ContainedThingWritable, SelfDescribingThingWritable>> & WithCopyWritableOperations;
//# sourceMappingURL=Document.d.ts.map