import { Context } from "./Context";
import { ContainedThingOf, Document, DocumentBase, DocumentDecorated, SelfDescribingThingOf } from "./Document";
import Factory, { FactoryForCopying } from "./Factory";
import Resource from "./Resource";
import { StatementBase, StatementReadonly } from "./Statement";
import { Thing, ThingBase, ThingReadonly } from "./Thing";

/*type DocumentBaseWithReadOperations<
    DocumentType extends DocumentBase<any, any>
> = DocumentBase<ContainedThingOf<DocumentType>, SelfDescribingThingOf<DocumentType>> & WithReadOperations<DocumentType>;

export class DocumentBaseDecorated<
    DocumentType extends DocumentBase<any, any>
>
implements DocumentBase<ContainedThingOf<DocumentType>, SelfDescribingThingOf<DocumentType>> {
    
    protected _wrapped: DocumentBaseWithReadOperations<DocumentType>;

    public constructor(wrapped: DocumentBaseWithReadOperations<DocumentType>) {
        this._wrapped = wrapped;
    }

    public toCopy(): this {
        throw new Error("Method not implemented.");
    }

    public toCopyReadonly<DocumentCopied extends DocumentReadonly<any, any>>(): DocumentCopied {
        throw new Error("Method not implemented.");
    }
    
    public toCopyWritable<DocumentCopied extends Document<any, any>>(): DocumentCopied {
        throw new Error("Method not implemented.");
    }

    protected getWrappedDocument(): DocumentBaseWithReadOperations<DocumentType> {
        return this._wrapped;
    }

    public get(uri: string | Resource): ContainedThingOf<DocumentType> | undefined {
        return this.getWrappedDocument().get(uri);
    }

    public getContext(): Context | undefined {
        return this.getWrappedDocument().getContext();
    }

    public getThingThatSelfDescribes(): SelfDescribingThingOf<DocumentType> | undefined {
        return this.getWrappedDocument().getThingThatSelfDescribes();
    }

    public has(thing: string | Resource): boolean {
        return this.getWrappedDocument().has(thing);
    }

    public hasThingThatSelfDescribes(): boolean {
        return this.getWrappedDocument().hasThingThatSelfDescribes();
    }

    public isEmpty(): boolean {
        return this.getWrappedDocument().isEmpty();
    }

    public toCanonical(): string {
        return this.getWrappedDocument().toCanonical();
    }

    public toStream(): string {
        return this.getWrappedDocument().toStream();
    }

    public [Symbol.iterator](): Iterator<ContainedThingOf<DocumentType>> {
        return this.getWrappedDocument()[Symbol.iterator]();
    }

    public getUri(): string {
        return this.getWrappedDocument().getUri();
    }

    public at(index: number): ContainedThingOf<DocumentType> | undefined {
        return this.getWrappedDocument().at(index);
    }

    public contains(other: this): boolean {
        return this.getWrappedDocument().contains(other);
    }

    public count(callbackfn?: (thing: ContainedThingOf<DocumentType>, document?: ThisType<this>) => boolean): number {
        return this.getWrappedDocument().count(callbackfn);
    }

    public every(predicate: (value: ContainedThingOf<DocumentType>, index?: number | undefined, array?: ContainedThingOf<DocumentType>[] | undefined) => boolean, thisArg?: any): boolean {
        return this.getWrappedDocument().every(predicate);
    }

    public filter(predicate: (value: ContainedThingOf<DocumentType>, index?: number | undefined, array?: ContainedThingOf<DocumentType>[] | undefined) => boolean): ContainedThingOf<DocumentType>[] {
        return this.getWrappedDocument().filter(predicate);
    }

    public find(predicate: (value: ContainedThingOf<DocumentType>, index?: number | undefined, obj?: ContainedThingOf<DocumentType>[] | undefined) => boolean, thisArg?: any): ContainedThingOf<DocumentType> | undefined {
        return this.getWrappedDocument().find(predicate);
    }

    public findIndex(predicate: (value: ContainedThingOf<DocumentType>, index?: number | undefined, obj?: ContainedThingOf<DocumentType>[] | undefined) => unknown, thisArg?: any): number {
        return this.getWrappedDocument().findIndex(predicate);
    }

    public forEach(callbackfn: (value: ContainedThingOf<DocumentType>, index?: number | undefined, array?: ContainedThingOf<DocumentType>[] | undefined) => void, thisArg?: any): void {
        return this.getWrappedDocument().forEach(callbackfn);
    }

    public includes(searchElement: ContainedThingOf<DocumentType>, fromIndex?: number | undefined): boolean {
        return this.getWrappedDocument().includes(searchElement);
    }

    public indexOf(searchElement: ContainedThingOf<DocumentType>, fromIndex?: number | undefined): number {
        return this.getWrappedDocument().indexOf(searchElement);
    }

    public keys(): IterableIterator<number> {
        return this.getWrappedDocument().keys();
    }

    public map(callbackfn: (value: ContainedThingOf<DocumentType>, index: number, array: ContainedThingOf<DocumentType>[]) => unknown, thisArg?: any): unknown[] {
        return this.getWrappedDocument().map(callbackfn);
    }

    public reduce(callbackfn: (previousValue: ContainedThingOf<DocumentType>, currentValue: ContainedThingOf<DocumentType>, currentIndex: number, array: ContainedThingOf<DocumentType>[]) => ContainedThingOf<DocumentType>): ContainedThingOf<DocumentType> {
        return this.getWrappedDocument().reduce(callbackfn);
    }

    public some(predicate: (value: ContainedThingOf<DocumentType>, index: number, array: ContainedThingOf<DocumentType>[]) => unknown, thisArg?: any): boolean {
        return this.getWrappedDocument().some(predicate);
    }

}*/

export class DocumentDecoratedImpl<
    DocumentType extends Document<any, any>,
    DocumentTypeReadonly extends DocumentBase<ThingReadonly<StatementReadonly<any>, any>, ThingReadonly<StatementReadonly<any>, any>>
>
implements DocumentDecorated<DocumentType, DocumentTypeReadonly> {
    
    protected _wrapped: Document<DocumentType, DocumentTypeReadonly>; // Specific document implementation like DocumentImpl<TypeIndex, TypeIndexReadonly>

    public constructor(wrapped: Document<DocumentType, DocumentTypeReadonly>) {
        this._wrapped = wrapped;
    }
    
    public getFactoryForCopying(): FactoryForCopying<Document<DocumentType, DocumentTypeReadonly>> {
        return this.getWrappedDocument().getFactoryForCopying();
    }

    public getFactory(): Factory<Document<DocumentType, DocumentTypeReadonly>> {
        return this.getWrappedDocument().getFactory();
    }

    public toCopy(): this {
        throw new Error("Method not implemented.");
    }

    public toCopyReadonly(): DocumentTypeReadonly {
        throw new Error("Method not implemented.");
    }
    
    public toCopyWritable(): DocumentType { // Should be a Document Writable here (see in DocumentReadonly)
        throw new Error("Method not implemented.");
    }

    public createThingToSelfDescribe(): SelfDescribingThingOf<DocumentType> {
        return this.getWrappedDocument().createThingToSelfDescribe();
    }
   
    public createThingWithoutUri(nameHint?: string | undefined): ContainedThingOf<DocumentType> {
        return this.getWrappedDocument().createThingWithoutUri(nameHint);
    }

    public add(thing: ContainedThingOf<DocumentType>): this {
        return this.getWrappedDocument().add(thing) as this;
    }
    
    public addAll(documentOrThings: DocumentType | ContainedThingOf<DocumentType>[]): this {
        throw new Error("Method not implemented.");
    }
    
    public delete(thingOrUri: string | ContainedThingOf<DocumentType>): this {
        throw new Error("Method not implemented.");
    }
    
    public deleteContext(): void {
        throw new Error("Method not implemented.");
    }
    
    public deleteMatches(uri?: string | Resource | undefined, property?: string | undefined, value?: string | undefined): this {
        throw new Error("Method not implemented.");
    }
    
    public pop(): ContainedThingOf<DocumentType> | undefined {
        throw new Error("Method not implemented.");
    }
    
    public reverse(): void {
        throw new Error("Method not implemented.");
    }
    
    public setContext(context: Context): void {
        this.getWrappedDocument().setContext(context);
    }
    
    public shift(): ContainedThingOf<DocumentType> | undefined {
        throw new Error("Method not implemented.");
    }
    
    public sort(compareFn?: ((a: ContainedThingOf<DocumentType>, b: ContainedThingOf<DocumentType>) => number) | undefined): this {
        throw new Error("Method not implemented.");
    }
    
    public splice(start: number, deleteCount?: number | undefined, ...items: ContainedThingOf<DocumentType>[]): this {
        throw new Error("Method not implemented.");
    }
    
    public union(other: DocumentType): this {
        throw new Error("Method not implemented.");
    }

    public createThingWithUri(nameHintOrUri?: string): ContainedThingOf<DocumentType> {
        return this.getWrappedDocument().createThingWithUri(nameHintOrUri);
    }

    public getWrappedDocument(): Document<DocumentType, DocumentTypeReadonly> { 
        return this._wrapped;
    }

    public get(uri: string | Resource): ThisType<ContainedThingOf<DocumentType>> | undefined {
        return this.getWrappedDocument().get(uri);
    }

    public getContext(): Context | undefined {
        return this.getWrappedDocument().getContext();
    }

    public getThingThatSelfDescribes(): SelfDescribingThingOf<DocumentType> | undefined {
        return this.getWrappedDocument().getThingThatSelfDescribes();
    }

    public has(thing: string | Resource): boolean {
        return this.getWrappedDocument().has(thing);
    }

    public hasThingThatSelfDescribes(): boolean {
        return this.getWrappedDocument().hasThingThatSelfDescribes();
    }

    public isEmpty(): boolean {
        return this.getWrappedDocument().isEmpty();
    }

    public toCanonical(): string {
        return this.getWrappedDocument().toCanonical();
    }

    public toStream(): string {
        return this.getWrappedDocument().toStream();
    }

    public [Symbol.iterator](): Iterator<ContainedThingOf<DocumentType>> {
        return this.getWrappedDocument()[Symbol.iterator]();
    }

    public getUri(): string {
        return this.getWrappedDocument().getUri();
    }

    public at(index: number): ThisType<ContainedThingOf<DocumentType>> | undefined {
        return this.getWrappedDocument().at(index);
    }

    public contains(other: this): boolean {
        return this.getWrappedDocument().contains(other);
    }

    public count(callbackfn?: (thing: ThisType<ContainedThingOf<DocumentType>>, document?: ThisType<this>) => boolean): number {
        return this.getWrappedDocument().count(callbackfn);
    }

    public difference(other: this): this {
        return this.getWrappedDocument().difference(other) as this;
    }

    public equals(other: this): boolean {
        return this.getWrappedDocument().equals(other);
    }

    public every(predicate: (value: ThisType<ContainedThingOf<DocumentType>>, index?: number | undefined, array?: ThisType<ContainedThingOf<DocumentType>>[] | undefined) => boolean, thisArg?: any): boolean {
        return this.getWrappedDocument().every(predicate);
    }

    public filter(predicate: (value: ThisType<ContainedThingOf<DocumentType>>, index?: number | undefined, array?: ThisType<ContainedThingOf<DocumentType>>[] | undefined) => boolean): ThisType<ContainedThingOf<DocumentType>>[] {
        return this.getWrappedDocument().filter(predicate);
    }

    public find(predicate: (value: ThisType<ContainedThingOf<DocumentType>>, index?: number | undefined, obj?: ThisType<ContainedThingOf<DocumentType>>[] | undefined) => boolean, thisArg?: any): ThisType<ContainedThingOf<DocumentType>> | undefined {
        return this.getWrappedDocument().find(predicate);
    }

    public findIndex(predicate: (value: ThisType<ContainedThingOf<DocumentType>>, index?: number | undefined, obj?: ThisType<ContainedThingOf<DocumentType>>[] | undefined) => unknown, thisArg?: any): number {
        return this.getWrappedDocument().findIndex(predicate);
    }

    public forEach(callbackfn: (value: ContainedThingOf<DocumentType>, index?: number | undefined, array?: ContainedThingOf<DocumentType>[] | undefined) => void, thisArg?: any): void {
        return this.getWrappedDocument().forEach(callbackfn);
    }

    public includes(searchElement: ThisType<ContainedThingOf<DocumentType>>, fromIndex?: number | undefined): boolean {
        return this.getWrappedDocument().includes(searchElement);
    }

    public indexOf(searchElement: ThisType<ContainedThingOf<DocumentType>>, fromIndex?: number | undefined): number {
        return this.getWrappedDocument().indexOf(searchElement);
    }

    public keys(): IterableIterator<number> {
        return this.getWrappedDocument().keys();
    }

    public map(callbackfn: (value: ThisType<ContainedThingOf<DocumentType>>, index: number, array: ThisType<ContainedThingOf<DocumentType>>[]) => unknown, thisArg?: any): unknown[] {
        return this.getWrappedDocument().map(callbackfn);
    }

    public reduce(callbackfn: (previousValue: ThisType<ContainedThingOf<DocumentType>>, currentValue: ThisType<ContainedThingOf<DocumentType>>, currentIndex: number, array: ThisType<ContainedThingOf<DocumentType>>[]) => ThisType<ContainedThingOf<DocumentType>>): ThisType<ContainedThingOf<DocumentType>> {
        return this.getWrappedDocument().reduce(callbackfn);
    }

    public slice(start?: number | undefined, end?: number | undefined): this {
        return this.getWrappedDocument().slice(start, end) as this;
    }

    public some(predicate: (value: ThisType<ContainedThingOf<DocumentType>>, index: number, array: ThisType<ContainedThingOf<DocumentType>>[]) => unknown, thisArg?: any): boolean {
        return this.getWrappedDocument().some(predicate);
    }

}

export class ThingDecorated<
    ContainedStatement extends StatementBase, //<any>, 
    DocumentType extends Document<any, any>
> implements Thing<ContainedStatement, DocumentType> {

    private _wrapped: Thing<ContainedStatement, DocumentType>;

    public constructor(wrapped: Thing<ContainedStatement, DocumentType>) {
        this._wrapped = wrapped;
    }

    public getWrappedThing(): Thing<ContainedStatement, DocumentType> {
        return this._wrapped;
    }

    public getContext(): Context | undefined {
        return this.getWrappedThing().getContext();
    }

    public hasUri(): boolean {
        return this.getWrappedThing().hasUri();
    }

    public count(): number {
        return this.getWrappedThing().count();
    }

    public isEmpty(): boolean {
        return this.getWrappedThing().isEmpty();
    }

    public equals(other: ThingBase<any>): boolean {
        return this.getWrappedThing().equals(other);
    }
    
    public get(property: string): ContainedStatement | undefined {
        return this.getWrappedThing().get(property);
    }
    
    public getAll(property: string): ContainedStatement[] {
        return this.getWrappedThing().getAll(property);
    }

    public toCopy(): ThisType<this> {
        return this.getWrappedThing().toCopy();
    }

    public [Symbol.iterator](): Iterator<ContainedStatement> {
        return this.getWrappedThing()[Symbol.iterator]();
    }

    public getUri(): string {
        return this.getWrappedThing().getUri();
    }

    public getDocument(): DocumentType {
        return this.getWrappedThing().getDocument();
    }

    public forEach(callbackfn: (value: ContainedStatement, index: number, array: ContainedStatement[]) => void, thisArg?: any): void {
        return this.getWrappedThing().forEach(callbackfn);
    }

    public map(callbackfn: (value: ContainedStatement, index: number, array: ContainedStatement[]) => unknown, thisArg?: any): unknown[] {
        return this.getWrappedThing().map(callbackfn);
    }

    public filter(predicate: (value: ContainedStatement, index: number, array: ContainedStatement[]) => boolean): ContainedStatement[] {
        return this.getWrappedThing().filter(predicate);
    }

    public add(statement: ContainedStatement): ThisType<this> {
        return this.getWrappedThing().add(statement);
    }

    public remove(about: string, value: string | Resource, datatype?: string | undefined, language?: string | undefined): ThisType<this> {
        return this.getWrappedThing().remove(about, value, datatype, language);
    }

    public removeAll(about: string): ThisType<this> {
        return this.getWrappedThing().removeAll(about);
    }

    public set(about: string, value: string, oldValue?: string | undefined, datatype?: string | undefined, language?: string | undefined): ThisType<this> {
        return this.getWrappedThing().set(about, value, oldValue, datatype, language);
    }

    public createStatement(about: string, value: string | Resource, datatype?: string | undefined, language?: string | undefined): this {
        return this.getWrappedThing().createStatement(about, value, datatype, language) as this;
    }

    public toCopyReadonly(): ContainedThingOf<DocumentType> {
        return this.getWrappedThing().toCopyReadonly();
    }

    public toCopyWritable(): ContainedThingOf<DocumentType> {
        return this.getWrappedThing().toCopyWritable();
    }
    
}

export default DocumentDecoratedImpl;