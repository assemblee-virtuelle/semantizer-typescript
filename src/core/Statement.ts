import { Copyable } from "./Common";

export type StatementConstructor<
    StatementType extends StatementReadonly = Statement
> = new (...args: any[]) => StatementType;

export interface StatementReadonly extends Copyable {
    getSubject(): string;
    getProperty(): string;
    getValue(): string;
    getDatatype(): string | undefined;
    getLanguage(): string | undefined;
}

export interface Statement extends StatementReadonly {
    setProperty(property: string): ThisType<this>;
    setValue(value: string): ThisType<this>;
    setDatatype(datatype: string): ThisType<this>;
    setLanguage(language: string): ThisType<this>;
}