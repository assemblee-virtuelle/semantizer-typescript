export interface Statement {
    getSubject(): string;
    getProperty(): string;
    getValue(): string;
    getDatatype(): string | undefined;
    getLanguage(): string | undefined;
}

export interface StatementWritable extends Statement {
    setProperty(property: string): ThisType<this>;
    setValue(value: string): ThisType<this>;
    setDatatype(datatype: string): ThisType<this>;
    setLanguage(language: string): ThisType<this>;
}