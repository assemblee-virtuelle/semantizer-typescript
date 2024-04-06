import ThingBase from "./Thing";

export interface StatementBase {
    getThing(): ThingBase;
}

export interface WithReadOperations {
    getSubject(): string;
    getValue(): string;
    getDatatype(): string | undefined;
    getLanguage(): string | undefined;
}

export interface WithWriteOperations {
    setValue(): Statement;
    setDatatype(): Statement;
    setLanguage(): Statement;
}

export interface StatementReadonly extends StatementBase, WithReadOperations {
    toCopy(): StatementReadonly;
    toCopyWritable(): Statement;
}

export interface Statement extends StatementBase, WithReadOperations, WithWriteOperations {
    toCopy(): Statement;
    toCopyReadonly(): StatementReadonly;
}

export default Statement;