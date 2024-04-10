import { ContainedThingOf, Document, DocumentReadonly, StatementOf } from "../core/Document";
import Resource from "../core/Resource";
import { Statement } from "../core/Statement";
import DocumentImpl from "./DocumentImpl";
import ThingImpl from "./ThingImpl";
type DocumentType = Document<DocumentImpl<ThingImpl<StatementImpl>, ThingImpl<StatementImpl>>>;
export declare class StatementImpl implements Statement<DocumentType> {
    private _thing;
    private _subject;
    private _value;
    private _datatype?;
    private _language?;
    constructor(thing: ContainedThingOf<DocumentType>, subject: string, value: string | Resource, datatype?: string | Resource, language?: string);
    toCopy(): this;
    setValue(): this;
    setDatatype(): this;
    setLanguage(): this;
    toCopyReadonly<DocumentType extends DocumentReadonly<any>>(): StatementOf<DocumentType>;
    toCopyWritable<DocumentType extends Document<any>>(): StatementOf<DocumentType>;
    getThing(): ContainedThingOf<DocumentType>;
    getSubject(): string;
    getValue(): string;
    getDatatype(): string | undefined;
    getLanguage(): string | undefined;
}
export default StatementImpl;
//# sourceMappingURL=StatementImpl.d.ts.map