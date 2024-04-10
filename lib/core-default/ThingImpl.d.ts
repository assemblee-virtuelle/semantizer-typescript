import { Context } from "../core/Context.js";
import { ContainedThingOf, Document, DocumentReadonly, StatementOf } from "../core/Document.js";
import Resource from "../core/Resource.js";
import { StatementBase } from "../core/Statement.js";
import { Thing, ThingBase } from "../core/Thing.js";
export declare enum ThingType {
    ForDescribing = 0,
    Regular = 1,
    Anonymous = 2
}
type DocumentType<ContainedStatement extends StatementBase> = Document<ThingImpl<ContainedStatement>, ThingImpl<ContainedStatement>>;
export declare class ThingImpl<ContainedStatement extends StatementBase> implements Thing<DocumentType<ContainedStatement>> {
    private _uri;
    private _document;
    private _statements;
    constructor(document: DocumentType<ContainedStatement>, stateType?: ThingType, uriOrNameHint?: string);
    toCopy(): this;
    createStatement(about: string, value: string | Resource, datatype?: string, language?: string): this;
    add(statement: StatementOf<DocumentType<ContainedStatement>>): this;
    set(about: string, value: string, oldValue?: string | undefined, ContainedStatement?: string | undefined, language?: string | undefined): this;
    remove(about: string, value: string | Resource, ContainedStatement?: string | undefined, language?: string | undefined): this;
    removeAll(about: string): this;
    toCopyReadonly<DocumentType extends DocumentReadonly<any, any>>(): ContainedThingOf<DocumentType>;
    toCopyWritable<DocumentType extends Document<any, any>>(): ContainedThingOf<DocumentType>;
    getDocument(): DocumentType<ContainedStatement>;
    count(): number;
    isEmpty(): boolean;
    [Symbol.iterator](): Iterator<ContainedStatement>;
    forEach(callbackfn: (value: StatementOf<DocumentType<ContainedStatement>>, index: number, array: StatementOf<DocumentType<ContainedStatement>>[]) => void, thisArg?: any): void;
    map(callbackfn: (value: StatementOf<DocumentType<ContainedStatement>>, index: number, array: StatementOf<DocumentType<ContainedStatement>>[]) => unknown, thisArg?: any): unknown[];
    filter(predicate: (value: StatementOf<DocumentType<ContainedStatement>>, index: number, array: StatementOf<DocumentType<ContainedStatement>>[]) => boolean): StatementOf<DocumentType<ContainedStatement>>[];
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