import { Context } from "./Context";
import { ContainedThingOf, Document, DocumentBase, DocumentReadonly, StatementOf } from "./Document";
import Resource from "./Resource";
import { StatementBase } from "./Statement";
export interface ThingBase<ContainedStatement extends StatementBase> extends Resource, Iterable<ContainedStatement> {
    getContext(): Context | undefined;
    hasUri(): boolean;
    count(): number;
    isEmpty(): boolean;
    equals(other: ThingBase<any>): boolean;
    get(property: string): ContainedStatement | undefined;
    getAll(property: string): ContainedStatement[];
    [Symbol.iterator](): Iterator<ContainedStatement>;
    toCopy(): this;
}
export interface WithDocument<DocumentType extends DocumentBase<any, any>> {
    getDocument(): DocumentType;
}
export interface WithReadOperations<ContainedStatement extends StatementBase = StatementBase> {
    forEach(callbackfn: (value: ContainedStatement, index: number, array: ContainedStatement[]) => void, thisArg?: any): void;
    map(callbackfn: (value: ContainedStatement, index: number, array: ContainedStatement[]) => unknown, thisArg?: any): unknown[];
    filter(predicate: (value: ContainedStatement, index: number, array: ContainedStatement[]) => boolean): ContainedStatement[];
}
export interface WithWriteOperations<ContainedStatement extends StatementBase = StatementBase> {
    add(statement: ContainedStatement): this;
    remove(about: string, value: string | Resource, datatype?: string, language?: string): this;
    removeAll(about: string): this;
    set(about: string, value: string, oldValue?: string, datatype?: string, language?: string): this;
}
export interface WithCreateOperations<ContainedStatement extends StatementBase = StatementBase> {
    createStatement(about: string, value: string | Resource, datatype?: string, language?: string): this;
}
export interface WithCopyOperations {
    toCopyReadonly<DocumentType extends DocumentReadonly<any, any>>(): ContainedThingOf<DocumentType>;
}
export interface WithCopyWritableOperations {
    toCopyWritable<DocumentType extends Document<any, any>>(): ContainedThingOf<DocumentType>;
}
export type Thing<DocumentType extends Document<any, any>> = ThingBase<StatementOf<DocumentType>> & WithDocument<DocumentType> & WithReadOperations & WithWriteOperations<StatementOf<DocumentType>> & WithCreateOperations<StatementOf<DocumentType>> & WithCopyOperations & WithCopyWritableOperations;
export type ThingReadonly<DocumentType extends DocumentReadonly<any, any>> = ThingBase<StatementOf<DocumentType>> & WithDocument<DocumentType> & WithReadOperations & WithCopyWritableOperations;
//# sourceMappingURL=Thing.d.ts.map