import Resource from "../core/Resource";
import { Statement, StatementReadonly } from "../core/Statement";
import { ThingBase } from "../core/Thing";

export class StatementBaseDefaultImpl implements Statement {

    private _thing: ThingBase;
    private _subject: string;
    private _value: string;
    private _datatype?: string;
    private _language?: string;

    public constructor(thing: ThingBase, subject: string, value: string | Resource, datatype?: string | Resource, language?: string) {
        this._thing = thing;
        this._subject = subject;
        this._value = typeof value === 'string'? value: value.getUri();
        this._datatype = typeof datatype === 'string'? datatype: datatype?.getUri();
        this._language = language;
    }
    toCopy(): this {
        throw new Error("Method not implemented.");
    }
    setValue(): this {
        throw new Error("Method not implemented.");
    }
    setDatatype(): this {
        throw new Error("Method not implemented.");
    }
    setLanguage(): this {
        throw new Error("Method not implemented.");
    }
    toCopyReadonly(): StatementReadonly {
        throw new Error("Method not implemented.");
    }
    toCopyWritable(): Statement {
        throw new Error("Method not implemented.");
    }

    public getThing(): ThingBase {
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

//export class StatementReadonlyDefaultImpl extends StatementBaseDefaultImpl

export default StatementBaseDefaultImpl;