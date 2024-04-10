import { ContainedThingOf, Document, DocumentBase, DocumentReadonly, StatementOf } from "./Document";
export interface StatementBase {
    toCopy(): this;
}
export interface WithThing<DocumentType extends DocumentBase<any, any>> {
    getThing(): ContainedThingOf<DocumentType>;
}
export interface WithReadOperations {
    getSubject(): string;
    getValue(): string;
    getDatatype(): string | undefined;
    getLanguage(): string | undefined;
}
export interface WithWriteOperations {
    setValue(): this;
    setDatatype(): this;
    setLanguage(): this;
}
export interface WithCopyOperations {
    toCopyReadonly<DocumentType extends DocumentReadonly<any, any>>(): StatementOf<DocumentType>;
}
export interface WithCopyWritableOperations {
    toCopyWritable<DocumentType extends Document<any, any>>(): StatementOf<DocumentType>;
}
export type Statement<DocumentType extends Document<any, any>> = StatementBase & WithThing<DocumentType> & WithReadOperations & WithWriteOperations & WithCopyOperations & WithCopyWritableOperations;
export type StatementReadonly<DocumentType extends DocumentReadonly<any, any>> = StatementBase & WithThing<DocumentType> & WithReadOperations & WithCopyWritableOperations;
//# sourceMappingURL=Statement.d.ts.map