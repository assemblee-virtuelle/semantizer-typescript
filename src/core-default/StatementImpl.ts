import { Statement, StatementWritable } from "../core/Statement";

type ConstructorParams = {
    subject: string;
    property: string;
    value: string;
    datatype?: string;
    language?: string;
}

export class StatementImpl implements StatementWritable { 

    // private _thing: ThingType;
    private _subject: string;
    private _property: string;
    private _value: string;
    private _datatype?: string;
    private _language?: string;

    public constructor(other: Statement);
    public constructor(params: ConstructorParams);
    public constructor(params: Statement | ConstructorParams) {
        this._subject = 'subject' in params? params.subject: params.getSubject();
        this._property = 'subject' in params? params.property: params.getProperty();
        this._value = 'subject' in params? params.value: params.getValue();
        this._datatype = 'subject' in params? params.datatype: params.getDatatype();
        this._language = 'subject' in params? params.language: params.getLanguage();
    }

    setProperty(property: string): ThisType<this> {
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