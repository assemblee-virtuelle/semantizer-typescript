import { Context } from "../core/Context.js";
import { ContainedThingOf, Document, DocumentReadonly, StatementOf } from "../core/Document.js";
import Resource from "../core/Resource.js";
import { Statement } from "../core/Statement.js";
import { Thing, ThingBase, ThingOfDocument } from "../core/Thing.js";

export enum ThingType {
    ForDescribing,
    Regular,
    Anonymous
}

//type DocumentType<ContainedStatement extends StatementBase> = Document<ThingImpl<ContainedStatement>, ThingImpl<ContainedStatement>>;

export class ThingImpl<
    DocumentType extends Document<any, any> = Document<Thing<Statement>, Thing<Statement>> //ContainedStatement extends StatementBase // DocumentType extends DocumentBase<any, any> & WithFactory<DocumentType>
> implements ThingOfDocument<DocumentType> { //Thing<DocumentType<ContainedStatement>> { // Thing<DocumentType> {

    private _uri: string;
    private _document: DocumentType; //<ContainedStatement>;
    private _statements: StatementOf<DocumentType>[]; //<ContainedStatement>>[];

    // TODO: add copy constructor
    public constructor(document: DocumentType, stateType?: ThingType, uriOrNameHint?: string) {
        this._uri = uriOrNameHint ?? '';
        this._document = document;
        this._statements = [];

        // TODO use factory
    }
    
    public toCopy(): this {
        return this;
    }

    public createStatement(about: string, value: string | Resource, datatype?: string, language?: string): this {
        const statement = this.getDocument().getFactory().createStatement(this, about, value, datatype, language);
        //this._getStatements().push(statement);
        return this; // as StatementOf<DocumentType>;
    }

    public add(statement: StatementOf<DocumentType/*<ContainedStatement>*/>): this {
        // TODO: set thing of statement
        // this._getStatements().push(statement);
        return this;
    }

    public set(about: string, value: string, oldValue?: string | undefined, ContainedStatement?: string | undefined, language?: string | undefined): this {
        throw new Error("Method not implemented.");
    }
    
    public remove(about: string, value: string | Resource, ContainedStatement?: string | undefined, language?: string | undefined): this {
        throw new Error("Method not implemented.");
    }

    public removeAll(about: string): this {
        throw new Error("Method not implemented.");
    }

    public toCopyReadonly<DocumentType extends DocumentReadonly<any, any>>(): ContainedThingOf<DocumentType> {
        throw new Error("Method not implemented.");
    }

    public toCopyWritable<DocumentType extends Document<any, any>>(): ContainedThingOf<DocumentType> {
        throw new Error("Method not implemented.");
    }

    public getDocument(): DocumentType/*<ContainedStatement>*/ {
        return this._document;
    }

    public count(): number {
        return this._getStatements().length;
    }

    public isEmpty(): boolean {
        return this._getStatements().length === 0;
    }

    public [Symbol.iterator](): Iterator<StatementOf<DocumentType>> {
        return this._getStatements()[Symbol.iterator]();
    }

    public forEach(callbackfn: (value: StatementOf<DocumentType/*<ContainedStatement>*/>, index: number, array: StatementOf<DocumentType/*<ContainedStatement>*/>[]) => void, thisArg?: any): void {
        this._getStatements().forEach(callbackfn, thisArg);
    }
    
    public map(callbackfn: (value: StatementOf<DocumentType/*<ContainedStatement>*/>, index: number, array: StatementOf<DocumentType/*<ContainedStatement>*/>[]) => unknown, thisArg?: any): unknown[] {
        return this._getStatements().map(callbackfn);
    }
    
    public filter(predicate: (value: StatementOf<DocumentType/*<ContainedStatement>*/>, index: number, array: StatementOf<DocumentType/*<ContainedStatement>*/>[]) => boolean): StatementOf<DocumentType/*<ContainedStatement>*/>[] {
        return this._getStatements().filter(predicate);
    }

    private _getStatements(): StatementOf<DocumentType/*<ContainedStatement>*/>[] {
        return this._statements;
    }

    public hasUri(): boolean {
        return this.getUri() !== '';
    }

    public getUri(): string {
        return this._uri;
    }

    public setUri(uri: string): void {
        // Todo: change state
        // Todo: change dataset
    }

    public getContext(): Context | undefined {
        return this.getDocument().getContext();
    }

    /*public expand(uri: string): string {
        return this.getDocument().expand(uri);
    }

    public shorten(uri: string): string {
        return this.getDocument().shorten(uri);
    }*/

    public equals(other: ThingBase<any>): boolean {
        throw new Error("Not implemented.");
    }

    public get(property: string): StatementOf<DocumentType> {
        throw new Error("Method not implemented.");
    }

    public getAll(property: string): StatementOf<DocumentType>[] {
        throw new Error("Method not implemented.");
    }

}

export default ThingImpl;