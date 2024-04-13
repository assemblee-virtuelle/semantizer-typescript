import { Context } from "../core/Context.js";
import { ContainedThingOf, Document } from "../core/Document.js";
import Resource from "../core/Resource.js";
import { StatementBase } from "../core/Statement.js";
import { Thing, ThingBase } from "../core/Thing.js";
export declare enum ThingType {
    ForDescribing = 0,
    Regular = 1,
    Anonymous = 2
}
export declare class ThingImpl<ContainedStatement extends StatementBase, //<any>,
DocumentType extends Document<any, any>> implements Thing<ContainedStatement, DocumentType> {
    private _uri;
    private _document;
    private _statements;
    constructor(document: DocumentType, stateType?: ThingType, uriOrNameHint?: string);
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