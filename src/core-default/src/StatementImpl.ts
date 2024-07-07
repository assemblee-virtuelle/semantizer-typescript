import { Resource, Statement, StatementConstructorParams } from "@semantizer/types";

export class StatementImpl implements Statement { 

    private _subject: string;
    private _property: string;
    private _value: string;
    private _datatype?: string;
    private _language?: string;

    // public constructor(other: Statement);
    // public constructor(params: StatementConstructorParams);
    public constructor(params: Statement | StatementConstructorParams) {
        this._subject = 'subject' in params? params.subject: params.getSubject();
        this._property = 'subject' in params? params.property: params.getProperty();
        this._value = 'subject' in params? params.value: params.getValue();
        this._datatype = 'subject' in params? params.datatype: params.getDatatype();
        this._language = 'subject' in params? params.language: params.getLanguage();
    }

    getUri(): string {
        throw new Error("Method not implemented.");
    }
    hasUri(): boolean {
        throw new Error("Method not implemented.");
    }

    public setProperty(property: string): ThisType<this> {
        this._property = property;
        return this;
    }

    public getProperty(): string {
        return this._property;
    }

    public setValue(value: string): this {
        this._value = value;
        return this;
    }

    public setSubject(subject: string | Resource): this {
        throw new Error("Method not implemented.");
    }

    public setDatatype(): this {
        throw new Error("Method not implemented.");
    }

    public setLanguage(): this {
        throw new Error("Method not implemented.");
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

    public toCopy(): ThisType<this> {
        return new StatementImpl(this);
    }

}

export default StatementImpl;