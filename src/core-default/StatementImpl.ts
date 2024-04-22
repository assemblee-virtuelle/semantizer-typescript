import { Resource } from "../core/Common";
import { Statement, StatementWritable } from "../core/Document";
import { StatementOf, Thing } from "./Thing";

export class StatementImpl implements Statement, StatementWritable { 

    // private _thing: ThingType;
    private _subject: string;
    private _property: string;
    private _value: string;
    private _datatype?: string;
    private _language?: string;

    public constructor(/*thing: ThingType, */subject: string, property: string, value: string, datatype?: string, language?: string) {
        //this._thing = thing;
        this._subject = subject;
        this._property = property;
        this._value = value; //typeof value === 'string'? value: value.getUri();
        this._datatype = datatype; //typeof datatype === 'string'? datatype: datatype?.getUri();
        this._language = language;
    }

    setProperty(property: string): this {
        this._property = property;
        return this;
    }

    getProperty(): string {
        return this._property;
    }

    // getOwner(): ThingType {
    //     throw new Error("Method not implemented.");
    // }
    // equals(other: Statement<ThingType>): boolean {
    //     throw new Error("Method not implemented.");
    // }
    // difference(other: Statement<ThingType>): Statement<ThingType> {
    //     throw new Error("Method not implemented.");
    // }

    // public toCopy(): this {
    //     throw new Error("Method not implemented.");
    // }

    public setValue(): this {
        throw new Error("Method not implemented.");
    }

    public setDatatype(): this {
        throw new Error("Method not implemented.");
    }

    public setLanguage(): this {
        throw new Error("Method not implemented.");
    }

    // public toCopyReadonly(): StatementOf<ThingType> {
    //     throw new Error("Method not implemented.");
    // }

    // public toCopyWritable(): StatementOf<ThingType> {
    //     throw new Error("Method not implemented.");
    // }

    // public getThing(): ThingType {
    //     return this._thing;
    // }

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