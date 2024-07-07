import { Copyable, Resource } from "./Common";

export type StatementConstructorParams = {
    subject: string;
    property: string;
    value: string;
    datatype?: string;
    language?: string;
}

export type StatementConstructor<
    StatementType extends StatementWithNonDestructiveOperations = Statement
> = new (params: StatementType | StatementConstructorParams) => StatementType;

export type StatementConstructorMixin<
    StatementType extends StatementWithNonDestructiveOperations = Statement
> = new (...args: any[]) => StatementType;

export interface StatementNonDestructiveOperations {
    getSubject(): string; // TODO: delete (replaced by getUri())
    getProperty(): string;
    getValue(): string;
    getDatatype(): string | undefined;
    getLanguage(): string | undefined;
}

export interface StatementDestructiveOperations {
    setSubject(subject: string | Resource): ThisType<this>; // TODO: delete (replaced by setUri())
    setProperty(property: string): ThisType<this>;
    setValue(value: string): ThisType<this>;
    setDatatype(datatype: string): ThisType<this>;
    setLanguage(language: string): ThisType<this>;
}

export type StatementBase = Resource & Copyable;

export type StatementWithNonDestructiveOperations = StatementBase &
    StatementNonDestructiveOperations;

export type StatementWithDestructiveOperations = StatementBase &
    StatementNonDestructiveOperations & 
    StatementDestructiveOperations;

export type Statement = StatementWithDestructiveOperations;