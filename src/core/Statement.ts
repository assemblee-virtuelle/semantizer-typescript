import { ThingBase } from "./Thing";

export interface StatementBase {
    getThing(): ThingBase<any>;
    toCopy(): this;
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
    toCopyReadonly(): StatementReadonly;
}

export interface WithCopyWritableOperations {
    toCopyWritable(): Statement;
}

export type Statement = StatementBase & 
    WithReadOperations & 
    WithWriteOperations & 
    WithCopyOperations & 
    WithCopyWritableOperations;

export type StatementReadonly = StatementBase &
    WithReadOperations & 
    WithCopyWritableOperations;