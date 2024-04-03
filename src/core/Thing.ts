import Context from "./Context";
import DocumentBase from "./Document";
import Resource from "./Resource";
import Statement from "./Statement";

export interface ThingBase extends Resource, Iterable<Statement> {
    getDocument(): DocumentBase<any, any>;
    getContext(): Context | undefined;
    hasUri(): boolean;
    //expand(uri: string): string; // TODO: remove
    //shorten(uri: string): string; // TODO: remove
    count(): number;
    isEmpty(): boolean;
    equals(other: ThingBase): boolean;
    // addStatement(statement: Datatype): Thing;
    get(property: string): string;
    getAll(property: string): string[];
    [Symbol.iterator](): Iterator<Statement>;
}

export interface WithReadOperations {
    forEach(callbackfn: (value: Statement, index: number, array: Statement[]) => void, thisArg?: any): void;
    map(callbackfn: (value: Statement, index: number, array: Statement[]) => unknown, thisArg?: any): unknown[];
    filter(predicate: (value: Statement, index: number, array: Statement[]) => boolean): Statement[];
}

export interface WithWriteOperations {
    add(about: string, value: string | Resource, datatype?: string, language?: string): Thing;
    remove(about: string, value: string | Resource, datatype?: string, language?: string): Thing;
    removeAll(about: string): Thing;
    set(about: string, value: string, oldValue?: string, datatype?: string, language?: string): Thing;
}

export type ReadonlyThing = ThingBase & WithReadOperations;
export type Thing = ThingBase & WithReadOperations & WithWriteOperations;
export default Thing;