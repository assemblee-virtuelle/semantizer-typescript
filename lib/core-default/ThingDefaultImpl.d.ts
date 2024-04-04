import Context from "../core/Context.js";
import DocumentBase from "../core/Document.js";
import Resource from "../core/Resource.js";
import Statement from "../core/Statement.js";
import { Thing, ThingBase } from "../core/Thing.js";
export declare enum ThingType {
    ForDescribing = 0,
    Regular = 1,
    Anonymous = 2
}
export declare class ThingDefaultImpl implements Thing {
    private _uri;
    private _document;
    private _statements;
    constructor(document: DocumentBase<any, any>, stateType: ThingType, uriOrNameHint?: string);
    getDocument(): DocumentBase<any, any>;
    count(): number;
    isEmpty(): boolean;
    [Symbol.iterator](): Iterator<Statement>;
    forEach(callbackfn: (value: Statement, index: number, array: Statement[]) => void, thisArg?: any): void;
    map(callbackfn: (value: Statement, index: number, array: Statement[]) => unknown, thisArg?: any): unknown[];
    filter(predicate: (value: Statement, index: number, array: Statement[]) => boolean): Statement[];
    private _getStatements;
    hasUri(): boolean;
    getUri(): string;
    setUri(uri: string): void;
    getContext(): Context | undefined;
    equals(other: ThingBase): boolean;
    add(about: string, value: string | Resource, Statement?: string, language?: string): Thing;
    get(property: string): string;
    getAll(property: string): string[];
    set(about: string, value: string, oldValue?: string | undefined, Statement?: string | undefined, language?: string | undefined): Thing;
    remove(about: string, value: string | Resource, Statement?: string | undefined, language?: string | undefined): Thing;
    removeAll(about: string): Thing;
}
export default ThingDefaultImpl;
//# sourceMappingURL=ThingDefaultImpl.d.ts.map