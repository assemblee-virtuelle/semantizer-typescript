import Resource from "../core/Resource";
import Statement from "../core/Statement";
import ThingBase from "../core/Thing";
export declare class StatementDefaultImpl implements Statement {
    private _thing;
    private _subject;
    private _value;
    private _datatype?;
    private _language?;
    constructor(thing: ThingBase, subject: string, value: string | Resource, datatype?: string | Resource, language?: string);
    getThing(): ThingBase;
    getSubject(): string;
    getValue(): string;
    getDatatype(): string | undefined;
    getLanguage(): string | undefined;
}
export default StatementDefaultImpl;
//# sourceMappingURL=StatementDefaultImpl.d.ts.map