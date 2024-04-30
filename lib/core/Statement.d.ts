import { Copyable, Resource } from "./Common";
export type StatementConstructor<StatementType extends StatementWithNonDestructiveOperations = Statement> = new (...args: any[]) => StatementType;
export interface StatementNonDestructiveOperations {
    getSubject(): string;
    getProperty(): string;
    getValue(): string;
    getDatatype(): string | undefined;
    getLanguage(): string | undefined;
}
export interface StatementDestructiveOperations {
    setSubject(subject: string | Resource): ThisType<this>;
    setProperty(property: string): ThisType<this>;
    setValue(value: string): ThisType<this>;
    setDatatype(datatype: string): ThisType<this>;
    setLanguage(language: string): ThisType<this>;
}
export type StatementBase = Resource & Copyable;
export type StatementWithNonDestructiveOperations = StatementBase & StatementNonDestructiveOperations;
export type StatementWithDestructiveOperations = StatementBase & StatementNonDestructiveOperations & StatementDestructiveOperations;
export type Statement = StatementWithDestructiveOperations;
//# sourceMappingURL=Statement.d.ts.map