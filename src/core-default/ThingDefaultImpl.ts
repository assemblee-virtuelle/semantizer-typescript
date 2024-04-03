import Context from "../core/Context.js";
import DocumentBase from "../core/Document.js";
import Resource from "../core/Resource.js";
import Statement from "../core/Statement.js";
import Thing from "../core/Thing.js";
import StatementDefaultImpl from "./StatementDefaultImpl.js";

export enum ThingType {
    ForDescribing,
    Regular,
    Anonymous
}

export class ThingDefaultImpl<Datatype = Statement> implements Thing<Datatype> {

    private _uri: string;
    private _document: DocumentBase;
    private _statements: Iterable<Datatype>;

    // TODO: add copy constructor
    public constructor(document: DocumentBase, stateType: ThingType, uriOrNameHint?: string) {
        this._uri = uriOrNameHint ?? '';
        this._document = document;
        this._statements = [];

        // TODO use factory
    }

    public getDocument(): DocumentBase {
        return this._document;
    }

    public count(): number {
        return this._getStatements().length;
    }

    public isEmpty(): boolean {
        return this._getStatements().length === 0;
    }

    public [Symbol.iterator](): Iterator<Datatype, any, undefined> {
        return this._getStatements()[Symbol.iterator]();
    }

    public forEach(callbackfn: (value: Datatype, index: number, array: Datatype[]) => void, thisArg?: any): void {
        this._getStatements().forEach(callbackfn, thisArg);
    }
    
    public map(callbackfn: (value: Datatype, index: number, array: Datatype[]) => unknown, thisArg?: any): unknown[] {
        return this._getStatements().map(callbackfn);
    }
    
    public filter(predicate: (value: Datatype, index: number, array: Datatype[]) => boolean): Datatype[] {
        return this._getStatements().filter(predicate);
    }

    private _getStatements(): Iterable<Datatype> {
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

    public expand(uri: string): string {
        return this.getDocument().expand(uri);
    }

    public shorten(uri: string): string {
        return this.getDocument().shorten(uri);
    }

    public equals(other: Thing): boolean {
        throw new Error("Not implemented.");
    }

    public add(about: string, value: string | Resource, datatype?: string, language?: string): Thing {
        const statement = new StatementDefaultImpl(this, about, value, datatype, language);
        this._getStatements().push(statement);
        return this;
    }

    public get(property: string): string {
        throw new Error("Method not implemented.");
    }

    public set(about: string, value: string, oldValue?: string | undefined, datatype?: string | undefined, language?: string | undefined): Thing {
        throw new Error("Method not implemented.");
    }
    
    public remove(about: string, value: string | Resource, datatype?: string | undefined, language?: string | undefined): Thing {
        throw new Error("Method not implemented.");
    }

}

export default ThingDefaultImpl;