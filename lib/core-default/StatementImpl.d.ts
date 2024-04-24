import { Resource } from "../core/Common";
import { Statement } from "../core/Statement";
type ConstructorParams = {
    subject: string;
    property: string;
    value: string;
    datatype?: string;
    language?: string;
};
export declare class StatementImpl implements Statement {
    private _subject;
    private _property;
    private _value;
    private _datatype?;
    private _language?;
    constructor(other: Statement);
    constructor(params: ConstructorParams);
    setProperty(property: string): ThisType<this>;
    getProperty(): string;
    setValue(value: string): this;
    setSubject(subject: string | Resource): this;
    setDatatype(): this;
    setLanguage(): this;
    getSubject(): string;
    getValue(): string;
    getDatatype(): string | undefined;
    getLanguage(): string | undefined;
    toCopy(): ThisType<this>;
}
export default StatementImpl;
//# sourceMappingURL=StatementImpl.d.ts.map