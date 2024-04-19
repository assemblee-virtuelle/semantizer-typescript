import { Resource } from "../core/Common";
import { Statement, StatementOf } from "../core/Statement";
import { Thing, ThingBase } from "../core/Thing";

export class StatementImpl<
    ThingType extends Thing<any, any>
> implements Statement<ThingType> { 

    private _thing: ThingType;
    private _subject: string;
    private _value: string;
    private _datatype?: string;
    private _language?: string;

    public constructor(thing: ThingType, subject: string, value: string | Resource, datatype?: string | Resource, language?: string) {
        this._thing = thing;
        this._subject = subject;
        this._value = typeof value === 'string'? value: value.getUri();
        this._datatype = typeof datatype === 'string'? datatype: datatype?.getUri();
        this._language = language;
    }
    
    getOwner(): ThingType {
        throw new Error("Method not implemented.");
    }
    equals(other: Statement<ThingType>): boolean {
        throw new Error("Method not implemented.");
    }
    difference(other: Statement<ThingType>): Statement<ThingType> {
        throw new Error("Method not implemented.");
    }

    public toCopy(): this {
        throw new Error("Method not implemented.");
    }

    public setValue(): this {
        throw new Error("Method not implemented.");
    }

    public setDatatype(): this {
        throw new Error("Method not implemented.");
    }

    public setLanguage(): this {
        throw new Error("Method not implemented.");
    }

    public toCopyReadonly(): StatementOf<ThingType> {
        throw new Error("Method not implemented.");
    }

    public toCopyWritable(): StatementOf<ThingType> {
        throw new Error("Method not implemented.");
    }

    public getThing(): ThingType {
        return this._thing;
    }

    public getSubject(): string {
        return this._subject;
    }

    public getValue(): string {
        return this._value;
    }

    public getDatatype(): string | undefined {
        return this._datatype;
    }

    public getLanguage(): string | undefined {
        return this._language;
    }

}

export default StatementImpl;