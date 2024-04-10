import { Context } from "./Context";
import { ContainedThingOf, Document, DocumentBase, DocumentReadonly, StatementOf } from "./Document";
import Resource from "./Resource";
import { Statement, StatementBase } from "./Statement";

export interface ThingBase<
    ContainedStatement extends StatementBase
> extends Resource, Iterable<ContainedStatement> {
    getContext(): Context | undefined;
    hasUri(): boolean;
    //expand(uri: string): string; // TODO: remove
    //shorten(uri: string): string; // TODO: remove
    count(): number;
    isEmpty(): boolean;
    equals(other: ThingBase<any>): boolean;
    // addStatement(statement: Datatype): Thing;
    get(property: string): ContainedStatement | undefined;
    getAll(property: string): ContainedStatement[];
    [Symbol.iterator](): Iterator<ContainedStatement>;
    toCopy(): this;
}

export interface WithDocument<
    DocumentType extends DocumentBase<any, any>
> {
    getDocument(): DocumentType;
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
    createStatement(about: string, value: string | Resource, datatype?: string, language?: string): this
}

export interface WithCopyOperations {
    toCopyReadonly<DocumentType extends DocumentReadonly<any, any>>(): ContainedThingOf<DocumentType>;
}

export interface WithCopyWritableOperations {  
    toCopyWritable<DocumentType extends Document<any, any>>(): ContainedThingOf<DocumentType>;
}

export type Thing<
    ContainedStatement extends StatementBase = StatementBase,
    //DocumentType extends Document<any, any> | undefined = Document<Thing<Statement, undefined>, Thing<Statement, undefined>>
> = ThingBase<ContainedStatement> &  
    WithDocument<Document<Thing<Statement>, Thing<Statement>>> & 
    WithReadOperations & 
    WithWriteOperations<ContainedStatement> & 
    WithCreateOperations<ContainedStatement> & 
    WithCopyOperations & 
    WithCopyWritableOperations;

export type ThingOfDocument<
    DocumentType extends Document<any, any> = Document<Thing<Statement>, Thing<Statement>>
> = ThingBase<StatementOf<DocumentType>> &  
    WithDocument<DocumentType> & 
    WithReadOperations & 
    WithWriteOperations<StatementOf<DocumentType>> & 
    WithCreateOperations<StatementOf<DocumentType>> & 
    WithCopyOperations & 
    WithCopyWritableOperations;

export type ThingReadonly<
    DocumentType extends DocumentReadonly<any, any>
> = ThingBase<StatementOf<DocumentType>> & 
    WithDocument<DocumentType> & 
    WithReadOperations & 
    WithCopyWritableOperations;