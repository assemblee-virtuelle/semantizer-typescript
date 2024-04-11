import { ContainedThingOf, Document, DocumentReadonly, StatementOf } from "./Document";
import { ThingBase } from "./Thing";
export interface StatementBase {
    toCopy(): ThisType<this>;
}
export interface WithThing<ThingType extends ThingBase<any>> {
    getThing(): ThingType;
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
export type Statement<//OfThing<
ThingType extends ThingBase<any>> = StatementBase & WithThing<ThingType> & WithReadOperations & WithWriteOperations & WithCopyOperations & WithCopyWritableOperations;
export type StatementReadonly<DocumentType extends DocumentReadonly<any, any>> = StatementBase & WithThing<ContainedThingOf<DocumentType>> & // TODO
WithReadOperations & WithCopyWritableOperations;
//# sourceMappingURL=Statement.d.ts.map