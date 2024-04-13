import Resource from "../core/Resource";
import { Statement, StatementOf } from "../core/Statement";
import { ThingBase } from "../core/Thing";
export declare class StatementImpl<ThingType extends ThingBase<any>> implements Statement<ThingType> {
    private _thing;
    private _subject;
    private _value;
    private _datatype?;
    private _language?;
    constructor(thing: ThingType, subject: string, value: string | Resource, datatype?: string | Resource, language?: string);
    toCopy(): this;
    setValue(): this;
    setDatatype(): this;
    setLanguage(): this;
    toCopyReadonly(): StatementOf<ThingType>;
    toCopyWritable(): StatementOf<ThingType>;
    getThing(): ThingType;
    getSubject(): string;
    getValue(): string;
    getDatatype(): string | undefined;
    getLanguage(): string | undefined;
}
export default StatementImpl;
//# sourceMappingURL=StatementImpl.d.ts.map