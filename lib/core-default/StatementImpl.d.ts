import { Statement, StatementWritable } from "../core/Document";
export declare class StatementImpl implements Statement, StatementWritable {
    private _subject;
    private _property;
    private _value;
    private _datatype?;
    private _language?;
    constructor(/*thing: ThingType, */ subject: string, property: string, value: string, datatype?: string, language?: string);
    setProperty(property: string): this;
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