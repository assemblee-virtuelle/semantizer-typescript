import Context from "./Context";
import DocumentBase from "./Document";
import Resource from "./Resource";
import Statement, { StatementBase, StatementReadonly } from "./Statement";

export interface ThingBase<
    ContainedStatement extends StatementBase = StatementBase
> extends Resource, Iterable<ContainedStatement>, WithReadOperations<ContainedStatement> {
    getDocument(): DocumentBase<any, any>;
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
}

export interface WithReadOperations<ContainedStatement extends StatementBase> {
    forEach(callbackfn: (value: ContainedStatement, index: number, array: ContainedStatement[]) => void, thisArg?: any): void;
    map(callbackfn: (value: ContainedStatement, index: number, array: ContainedStatement[]) => unknown, thisArg?: any): unknown[];
    filter(predicate: (value: ContainedStatement, index: number, array: ContainedStatement[]) => boolean): ContainedStatement[];
}

export interface WithWriteOperations {
    add(about: string, value: string | Resource, datatype?: string, language?: string): Thing;
    remove(about: string, value: string | Resource, datatype?: string, language?: string): Thing;
    removeAll(about: string): Thing;
    set(about: string, value: string, oldValue?: string, datatype?: string, language?: string): Thing;
}

export interface ThingReadonly<ContainedStatement extends StatementReadonly = StatementReadonly> extends ThingBase<StatementReadonly> {
    toCopy(): ThingReadonly<ContainedStatement>;
    toCopyWritable<ContainedStatementWritable extends Statement = Statement>(): Thing<ContainedStatementWritable>;
}

export interface Thing<ContainedStatement extends Statement = Statement> extends ThingBase<Statement>, WithWriteOperations {
    toCopy(): Thing<ContainedStatement>;
    toCopyReadonly<ContainedStatementReadonly extends StatementReadonly = StatementReadonly>(): ThingReadonly<ContainedStatementReadonly>;
}

export default Thing;