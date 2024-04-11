import { Context } from "./Context";
import { ContainedThingOf, Document, DocumentBase, DocumentReadonly } from "./Document";
import Resource from "./Resource";
import { Statement, StatementBase, StatementReadonly } from "./Statement";

export interface ThingBase<
    ContainedStatement extends StatementBase
> extends Resource, Iterable<ContainedStatement> {
    getContext(): Context | undefined;
    hasUri(): boolean;
    count(): number;
    isEmpty(): boolean;
    equals(other: ThingBase<any>): boolean;
    get(property: string): ContainedStatement | undefined;
    getAll(property: string): ContainedStatement[];
    [Symbol.iterator](): Iterator<ContainedStatement>;
    toCopy(): ThisType<this>;
}

export interface WithDocument<
    DocumentType extends DocumentBase<any, any>
> {
    getDocument(): DocumentType;
}

export interface WithReadOperations<
    ContainedStatement extends Statement<any> | StatementReadonly<any> = Statement<any>
> {
    forEach(callbackfn: (value: ContainedStatement, index: number, array: ContainedStatement[]) => void, thisArg?: any): void;
    map(callbackfn: (value: ContainedStatement, index: number, array: ContainedStatement[]) => unknown, thisArg?: any): unknown[];
    filter(predicate: (value: ContainedStatement, index: number, array: ContainedStatement[]) => boolean): ContainedStatement[];
}

export interface WithWriteOperations<
    ContainedStatement extends StatementBase = StatementBase
> {
    add(statement: ContainedStatement): ThisType<this>;
    remove(about: string, value: string | Resource, datatype?: string, language?: string): ThisType<this>;
    removeAll(about: string): ThisType<this>;
    set(about: string, value: string, oldValue?: string, datatype?: string, language?: string): ThisType<this>;
}

export interface WithCreateOperations {
    createStatement(about: string, value: string | Resource, datatype?: string, language?: string): this
}

export interface WithCopyOperations {
    toCopyReadonly<DocumentType extends DocumentReadonly<any, any, any, any>>(): ContainedThingOf<DocumentType>;
}

export interface WithCopyWritableOperations {  
    toCopyWritable<DocumentType extends Document<any, any, any, any>>(): ContainedThingOf<DocumentType>;
}

export type Thing<
    ContainedStatement extends Statement<any>, 
    DocumentType extends Document<any, any, any, any> 
> = ThingBase<ContainedStatement> &  
    WithDocument<DocumentType> & 
    WithReadOperations & 
    WithWriteOperations<ContainedStatement> & 
    WithCreateOperations & 
    WithCopyOperations & 
    WithCopyWritableOperations; // should be removed

export type ThingReadonly<
    ContainedStatement extends StatementReadonly<any>,
    DocumentType extends DocumentReadonly<ThingReadonly<ContainedStatement, any>, ThingReadonly<ContainedStatement, any>, any, any>
> = ThingBase<ContainedStatement> & 
    WithDocument<DocumentType> & 
    WithReadOperations & 
    WithCopyWritableOperations;