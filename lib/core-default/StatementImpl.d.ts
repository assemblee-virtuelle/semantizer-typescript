import { Statement, StatementWritable } from "../core/Statement";
type ConstructorParams = {
    subject: string;
    property: string;
    value: string;
    datatype?: string;
    language?: string;
};
export declare class StatementImpl implements StatementWritable {
    private _subject;
    private _property;
    private _value;
    private _datatype?;
    private _language?;
    constructor(other: Statement);
    constructor(params: ConstructorParams);
    setProperty(property: string): ThisType<this>;
    getProperty(): string;
    setValue(): this;
    setDatatype(): this;
    setLanguage(): this;
    getSubject(): string;
    getValue(): string;
    getDatatype(): string | undefined;
    getLanguage(): string | undefined;
}
export default StatementImpl;
//# sourceMappingURL=StatementImpl.d.ts.map