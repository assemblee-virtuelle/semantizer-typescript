import { Resource } from "../core/Common";
import { Statement } from "../core/Statement";
import { StatementOf, Thing } from "./Thing";
export declare class StatementImpl<ThingType extends Thing<any, any>> implements Statement<ThingType> {
    private _thing;
    private _subject;
    private _value;
    private _datatype?;
    private _language?;
    constructor(thing: ThingType, subject: string, value: string | Resource, datatype?: string | Resource, language?: string);
    getOwner(): ThingType;
    equals(other: Statement<ThingType>): boolean;
    difference(other: Statement<ThingType>): Statement<ThingType>;
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