import { Document, DocumentReadonly, StatementOf } from "../core/Document";
import Resource from "../core/Resource";
import { StatementOfThing } from "../core/Statement";
import { ThingBase } from "../core/Thing";
export declare class StatementImpl<ThingType extends ThingBase<any>> implements StatementOfThing<ThingType> {
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
    toCopyReadonly<DocumentType extends DocumentReadonly<any, any>>(): StatementOf<DocumentType>;
    toCopyWritable<DocumentType extends Document<any, any>>(): StatementOf<DocumentType>;
    getThing(): ThingType;
    getSubject(): string;
    getValue(): string;
    getDatatype(): string | undefined;
    getLanguage(): string | undefined;
}
export default StatementImpl;
//# sourceMappingURL=StatementImpl.d.ts.map