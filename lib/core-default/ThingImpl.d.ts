import { Context } from "../core/Context.js";
import { ContainedThingOf, Document, DocumentReadonly, StatementOf } from "../core/Document.js";
import Resource from "../core/Resource.js";
import { Statement } from "../core/Statement.js";
import { Thing, ThingBase, ThingOfDocument } from "../core/Thing.js";
export declare enum ThingType {
    ForDescribing = 0,
    Regular = 1,
    Anonymous = 2
}
export declare class ThingImpl<DocumentType extends Document<any, any> = Document<Thing<Statement>, Thing<Statement>>> implements ThingOfDocument<DocumentType> {
    private _uri;
    private _document;
    private _statements;
    constructor(document: DocumentType, stateType?: ThingType, uriOrNameHint?: string);
    toCopy(): this;
    createStatement(about: string, value: string | Resource, datatype?: string, language?: string): this;
    add(statement: StatementOf<DocumentType>): this;
    set(about: string, value: string, oldValue?: string | undefined, ContainedStatement?: string | undefined, language?: string | undefined): this;
    remove(about: string, value: string | Resource, ContainedStatement?: string | undefined, language?: string | undefined): this;
    removeAll(about: string): this;
    toCopyReadonly<DocumentType extends DocumentReadonly<any, any>>(): ContainedThingOf<DocumentType>;
    toCopyWritable<DocumentType extends Document<any, any>>(): ContainedThingOf<DocumentType>;
    getDocument(): DocumentType;
    count(): number;
    isEmpty(): boolean;
    [Symbol.iterator](): Iterator<StatementOf<DocumentType>>;
    forEach(callbackfn: (value: StatementOf<DocumentType>, index: number, array: StatementOf<DocumentType>[]) => void, thisArg?: any): void;
    map(callbackfn: (value: StatementOf<DocumentType>, index: number, array: StatementOf<DocumentType>[]) => unknown, thisArg?: any): unknown[];
    filter(predicate: (value: StatementOf<DocumentType>, index: number, array: StatementOf<DocumentType>[]) => boolean): StatementOf<DocumentType>[];
    private _getStatements;
    hasUri(): boolean;
    getUri(): string;
    setUri(uri: string): void;
    getContext(): Context | undefined;
    equals(other: ThingBase<any>): boolean;
    get(property: string): StatementOf<DocumentType>;
    getAll(property: string): StatementOf<DocumentType>[];
}
export default ThingImpl;
//# sourceMappingURL=ThingImpl.d.ts.map