import { Context } from "./Context";
import { DocumentBase } from "./Document";
import Resource from "./Resource";
import { Statement, StatementBase, StatementReadonly } from "./Statement";

export interface ThingBase<
    ContainedStatement extends StatementBase = StatementBase
> extends Resource, Iterable<ContainedStatement> {
    getDocument(): DocumentBase<this>;
    getContext(): Context | undefined;
    hasUri(): boolean;
    //expand(uri: string): string; // TODO: remove
    //shorten(uri: string): string; // TODO: remove
    count(): number;
    isEmpty(): boolean;
    equals(other: ThingBase<ContainedStatement>): boolean;
    // addStatement(statement: Datatype): Thing;
    get(property: string): ContainedStatement | undefined;
    getAll(property: string): ContainedStatement[];
    [Symbol.iterator](): Iterator<ContainedStatement>;
    toCopy(): this;
}

export interface WithReadOperations<
    ContainedStatement extends StatementBase = StatementBase
> {
    forEach(callbackfn: (value: ContainedStatement, index: number, array: ContainedStatement[]) => void, thisArg?: any): void;
    map(callbackfn: (value: ContainedStatement, index: number, array: ContainedStatement[]) => unknown, thisArg?: any): unknown[];
    filter(predicate: (value: ContainedStatement, index: number, array: ContainedStatement[]) => boolean): ContainedStatement[];
}

export interface WithWriteOperations<
    ContainedStatement extends StatementBase = StatementBase
> {
    add(statement: ContainedStatement): this;
    remove(about: string, value: string | Resource, datatype?: string, language?: string): this;
    removeAll(about: string): this;
    set(about: string, value: string, oldValue?: string, datatype?: string, language?: string): this;
}

export interface WithCreateOperations<
    ContainedStatement extends StatementBase = StatementBase
> {
    createStatement(about: string, value: string | Resource, datatype?: string, language?: string): ContainedStatement
}

export interface WithCopyOperations {
    toCopyReadonly<ContainedStatementReadonly extends StatementReadonly = StatementReadonly>(): ThingReadonly<ContainedStatementReadonly>;
}

export interface WithCopyWritableOperations {  
    toCopyWritable<ContainedStatementWritable extends Statement = Statement>(): Thing<ContainedStatementWritable>;
}

export type Thing<
    ContainedStatement extends StatementBase = Statement
> = ThingBase<ContainedStatement> & 
WithReadOperations & 
WithWriteOperations<ContainedStatement> &
WithCreateOperations<ContainedStatement> & 
WithCopyOperations &
WithCopyWritableOperations;

export type ThingReadonly<
    ContainedStatement extends StatementReadonly = StatementReadonly
> = ThingBase<ContainedStatement> & 
WithReadOperations & 
WithCopyWritableOperations;