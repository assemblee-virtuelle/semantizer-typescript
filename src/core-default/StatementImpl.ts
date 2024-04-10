import { ContainedThingOf, Document, DocumentReadonly, StatementOf } from "../core/Document";
import Resource from "../core/Resource";
import { Statement } from "../core/Statement";
import DocumentImpl from "./DocumentImpl";
import ThingImpl from "./ThingImpl";

type DocumentType = Document<DocumentImpl<ThingImpl<StatementImpl>, ThingImpl<StatementImpl>>>;

export class StatementImpl implements Statement<DocumentType> {

    private _thing: ContainedThingOf<DocumentType>;
    private _subject: string;
    private _value: string;
    private _datatype?: string;
    private _language?: string;

    public constructor(thing: ContainedThingOf<DocumentType>, subject: string, value: string | Resource, datatype?: string | Resource, language?: string) {
        this._thing = thing;
        this._subject = subject;
        this._value = typeof value === 'string'? value: value.getUri();
        this._datatype = typeof datatype === 'string'? datatype: datatype?.getUri();
        this._language = language;
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

    public toCopyReadonly<DocumentType extends DocumentReadonly<any>>(): StatementOf<DocumentType> {
        throw new Error("Method not implemented.");
    }

    public toCopyWritable<DocumentType extends Document<any>>(): StatementOf<DocumentType> {
        throw new Error("Method not implemented.");
    }

    public getThing(): ContainedThingOf<DocumentType> {
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