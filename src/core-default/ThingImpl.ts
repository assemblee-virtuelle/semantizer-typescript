import { Context, Resource } from "../core/Common.js";
import { ContainedThingOf, Document } from "../core/Document.js";
import { Statement } from "../core/Statement.js";
import { Thing, ThingBase, ThingWritable } from "./Thing.js";

export enum ThingType {
    ForDescribing,
    Regular,
    Anonymous
}

export class ThingImpl<
    ContainedStatement extends Statement<any>,
    DocumentType extends Document<any, any> 
> implements ThingWritable<ContainedStatement, DocumentType> { 

    private _uri: string;
    private _document: DocumentType;
    private _statements: ContainedStatement[];

    // TODO: add copy constructor
    public constructor(document: DocumentType, stateType?: ThingType, uriOrNameHint?: string) {
        this._uri = uriOrNameHint ?? '';
        this._document = document;
        this._statements = [];

        // TODO use factory
    }

    removeStatement(about: string, value: string | Resource, datatype?: string | undefined, language?: string | undefined): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    removeStatementAll(about: string): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    setStatement(about: string, value: string, oldValue?: string | undefined, datatype?: string | undefined, language?: string | undefined): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    has(resourceOrUri: string | Resource): boolean {
        throw new Error("Method not implemented.");
    }
    at(index: number): ContainedStatement | undefined {
        throw new Error("Method not implemented.");
    }
    contains(other: Document<any, any>): boolean {
        throw new Error("Method not implemented.");
    }
    every(predicate: (value: ContainedStatement, index?: number | undefined, array?: ContainedStatement[] | undefined) => boolean, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }
    find(predicate: (value: ContainedStatement, index?: number | undefined, obj?: ContainedStatement[] | undefined) => boolean, thisArg?: any): ContainedStatement | undefined {
        throw new Error("Method not implemented.");
    }
    findIndex(predicate: (value: ContainedStatement, index?: number | undefined, obj?: ContainedStatement[] | undefined) => unknown, thisArg?: any): number {
        throw new Error("Method not implemented.");
    }
    includes(searchElement: ContainedStatement, fromIndex?: number | undefined): boolean {
        throw new Error("Method not implemented.");
    }
    indexOf(searchElement: ContainedStatement, fromIndex?: number | undefined): number {
        throw new Error("Method not implemented.");
    }
    keys(): IterableIterator<number> {
        throw new Error("Method not implemented.");
    }
    reduce(callbackfn: (previousValue: ContainedStatement, currentValue: ContainedStatement, currentIndex: number, array: ContainedStatement[]) => ContainedStatement): ContainedStatement {
        throw new Error("Method not implemented.");
    }
    slice(start?: number | undefined, end?: number | undefined): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    some(predicate: (value: ContainedStatement, index?: number | undefined, array?: ContainedStatement[] | undefined) => unknown, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }

    getOwner(): DocumentType {
        throw new Error("Method not implemented.");
    }
    
    public toCopy(): this {
        return this;
    }

    public createStatement(about: string, value: string | Resource, datatype?: string, language?: string): this {
        // const statement = this.getDocument().getFactory().createStatement(this, about, value, datatype, language);
        // this._getStatements().push(statement as ContainedStatement);
        // return this;
        throw new Error("Not implemented.");
    }

    public add(statement: ContainedStatement): this {
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

    public toCopyReadonly(): ContainedThingOf<DocumentType> {
        throw new Error("Method not implemented.");
    }

    public toCopyWritable(): ContainedThingOf<DocumentType> {
        throw new Error("Method not implemented.");
    }

    public getDocument(): DocumentType {
        return this._document;
    }

    public count(): number {
        return this._getStatements().length;
    }

    public isEmpty(): boolean {
        return this._getStatements().length === 0;
    }

    public [Symbol.iterator](): Iterator<ContainedStatement> { 
        return this._getStatements()[Symbol.iterator]();
    }

    public forEach(callbackfn: (value: ContainedStatement, index: number, array: ContainedStatement[]) => void, thisArg?: any): void {
        this._getStatements().forEach(callbackfn, thisArg);
    }
    
    public map(callbackfn: (value: ContainedStatement, index: number, array: ContainedStatement[]) => unknown, thisArg?: any): unknown[] {
        return this._getStatements().map(callbackfn);
    }
    
    public filter(predicate: (value: ContainedStatement, index: number, array: ContainedStatement[]) => boolean): ContainedStatement[] {
        return this._getStatements().filter(predicate);
    }

    private _getStatements(): ContainedStatement[] { 
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
        throw new Error("Not implemented."); //return this.getDocument().getContext();
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

    public get(property: string): ContainedStatement {
        throw new Error("Method not implemented.");
    }

    public getAll(property: string): ContainedStatement[] {
        throw new Error("Method not implemented.");
    }

}

export default ThingImpl;