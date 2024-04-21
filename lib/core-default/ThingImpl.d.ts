import { Context, Resource } from "../core/Common.js";
import { ContainedThingOf, Document } from "../core/Document.js";
import { Statement } from "../core/Statement.js";
import { ThingBase, ThingWritable } from "./Thing.js";
export declare enum ThingType {
    ForDescribing = 0,
    Regular = 1,
    Anonymous = 2
}
export declare class ThingImpl<ContainedStatement extends Statement<any>, DocumentType extends Document<any, any>> implements ThingWritable<ContainedStatement, DocumentType> {
    private _uri;
    private _document;
    private _statements;
    constructor(document: DocumentType, stateType?: ThingType, uriOrNameHint?: string);
    removeStatement(about: string, value: string | Resource, datatype?: string | undefined, language?: string | undefined): ThisType<this>;
    removeStatementAll(about: string): ThisType<this>;
    setStatement(about: string, value: string, oldValue?: string | undefined, datatype?: string | undefined, language?: string | undefined): ThisType<this>;
    has(resourceOrUri: string | Resource): boolean;
    at(index: number): ContainedStatement | undefined;
    contains(other: Document<any, any>): boolean;
    every(predicate: (value: ContainedStatement, index?: number | undefined, array?: ContainedStatement[] | undefined) => boolean, thisArg?: any): boolean;
    find(predicate: (value: ContainedStatement, index?: number | undefined, obj?: ContainedStatement[] | undefined) => boolean, thisArg?: any): ContainedStatement | undefined;
    findIndex(predicate: (value: ContainedStatement, index?: number | undefined, obj?: ContainedStatement[] | undefined) => unknown, thisArg?: any): number;
    includes(searchElement: ContainedStatement, fromIndex?: number | undefined): boolean;
    indexOf(searchElement: ContainedStatement, fromIndex?: number | undefined): number;
    keys(): IterableIterator<number>;
    reduce(callbackfn: (previousValue: ContainedStatement, currentValue: ContainedStatement, currentIndex: number, array: ContainedStatement[]) => ContainedStatement): ContainedStatement;
    slice(start?: number | undefined, end?: number | undefined): ThisType<this>;
    some(predicate: (value: ContainedStatement, index?: number | undefined, array?: ContainedStatement[] | undefined) => unknown, thisArg?: any): boolean;
    getOwner(): DocumentType;
    toCopy(): this;
    createStatement(about: string, value: string | Resource, datatype?: string, language?: string): this;
    add(statement: ContainedStatement): this;
    set(about: string, value: string, oldValue?: string | undefined, ContainedStatement?: string | undefined, language?: string | undefined): this;
    remove(about: string, value: string | Resource, ContainedStatement?: string | undefined, language?: string | undefined): this;
    removeAll(about: string): this;
    toCopyReadonly(): ContainedThingOf<DocumentType>;
    toCopyWritable(): ContainedThingOf<DocumentType>;
    getDocument(): DocumentType;
    count(): number;
    isEmpty(): boolean;
    [Symbol.iterator](): Iterator<ContainedStatement>;
    forEach(callbackfn: (value: ContainedStatement, index: number, array: ContainedStatement[]) => void, thisArg?: any): void;
    map(callbackfn: (value: ContainedStatement, index: number, array: ContainedStatement[]) => unknown, thisArg?: any): unknown[];
    filter(predicate: (value: ContainedStatement, index: number, array: ContainedStatement[]) => boolean): ContainedStatement[];
    private _getStatements;
    hasUri(): boolean;
    getUri(): string;
    setUri(uri: string): void;
    getContext(): Context | undefined;
    equals(other: ThingBase<any>): boolean;
    get(property: string): ContainedStatement;
    getAll(property: string): ContainedStatement[];
}
export default ThingImpl;
//# sourceMappingURL=ThingImpl.d.ts.map