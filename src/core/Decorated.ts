import DocumentImpl from "../core-default/DocumentImpl.js";
import ThingImpl from "../core-default/ThingImpl.js";
import { Context, Resource } from "./Common";
import { ContainedThingOf, Document, DocumentDecorated, DocumentWritable, SelfDescribingThingOf } from "./Document";
import { Thing } from "./Thing";

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

// //type ThingConstructor = new (document: TypeIndex) => TypeIndexSelfDescribingThing | TypeIndexRegistration;
// type StatementConstructor = new (thing: TypeIndexRegistration, subject: string, value: string | Resource, datatype?: string | Resource, language?: string) => Statement<TypeIndexRegistration> //<TypeIndex>>;
// type SelfDescribingThingConstructor = new (document: TypeIndex) => TypeIndexSelfDescribingThing; //Thing<Statement<TypeIndexSelfDescribingThing>, TypeIndex>;


type DocumentConstructor<DocumentType extends DocumentWritable<any, any>> = new () => DocumentType;
type ContainedThingConstructor<DocumentType extends DocumentWritable<any, any>> = new (document: DocumentType) => ContainedThingOf<DocumentType>;
type SelfDescribingThingConstructor<DocumentType extends DocumentWritable<any, any>> = new (document: DocumentType) => SelfDescribingThingOf<DocumentType>;
type ConstructedDocumentOf<T extends DocumentConstructor<any>> = T extends DocumentConstructor<infer DocumentType> ? DocumentType : never; 

export class DocumentDecoratedImpl<
    //ContainedThingType extends Thing<any, DocumentType>,
    DocumentType extends DocumentWritable<any, any> = DocumentWritable<any, Thing<any, any>> 
    //Constructor extends DocumentConstructor<any> = DocumentConstructor<DocumentWritable<Thing<any, any>, Thing<any, any>>> //DocumentWritable<any, any>,
    //DocumentTypeReadonly extends DocumentBase<ThingReadonly<StatementReadonly<any>, any>, ThingReadonly<StatementReadonly<any>, any>>
>
implements DocumentDecorated<DocumentType> {
    
    protected _wrapped: DocumentType; //ConstructedDocumentOf<Constructor>; // Specific document implementation like DocumentImpl<TypeIndex, TypeIndexReadonly>
    protected _ContainedThingConstructor: ContainedThingConstructor<DocumentDecoratedImpl<DocumentType>>;
    protected _SelfDescribingThingConstructor: SelfDescribingThingConstructor<DocumentDecoratedImpl<DocumentType>>;

    public constructor(DocumentConstructor: DocumentConstructor<DocumentType>, ContainedThingConstructor: ContainedThingConstructor<DocumentDecoratedImpl<DocumentType>>, SelfDescribingThingConstructor: SelfDescribingThingConstructor<DocumentDecoratedImpl<DocumentType>>) { //ConstructedDocumentOf<Constructor>) { DocumentDecoratedImpl<DocumentType>
        this._wrapped = new DocumentConstructor();
        this._ContainedThingConstructor = ContainedThingConstructor;
        this._SelfDescribingThingConstructor = SelfDescribingThingConstructor;
    }

    hasUri(): boolean {
        throw new Error("Method not implemented.");
    }
    
    // public getFactoryForCopying(): FactoryForCopying<Document<DocumentType, DocumentTypeReadonly>> {
    //     return this.getWrappedDocument().getFactoryForCopying();
    // }

    // public getFactory(): Factory<Document<DocumentType, DocumentTypeReadonly>> {
    //     return this.getWrappedDocument().getFactory();
    // }

    public toCopy(): this {
        throw new Error("Method not implemented.");
    }

    // public toCopyReadonly(): DocumentTypeReadonly {
    //     throw new Error("Method not implemented.");
    // }
    
    // public toCopyWritable(): DocumentType { // Should be a Document Writable here (see in DocumentReadonly)
    //     throw new Error("Method not implemented.");
    // }

    public createThingToSelfDescribe(): SelfDescribingThingOf<DocumentType> {
        return new this._SelfDescribingThingConstructor(this);
    }

    public createThingWithUri(nameHintOrUri?: string): ContainedThingOf<DocumentType> {
        return new this._ContainedThingConstructor(this);
    }
   
    // public createThingWithoutUri(nameHint?: string | undefined): ContainedThingOf<DocumentType> {
    //     return this.getWrappedDocument().createThingWithoutUri(nameHint);
    // }

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

    public getWrappedDocument(): DocumentType { 
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

    // public toCanonical(): string {
    //     return this.getWrappedDocument().toCanonical();
    // }

    // public toStream(): string {
    //     return this.getWrappedDocument().toStream();
    // }

    public [Symbol.iterator](): Iterator<ContainedThingOf<DocumentType>> {
        return this.getWrappedDocument()[Symbol.iterator]();
    }

    public getUri(): string {
        return this.getWrappedDocument().getUri();
    }

    public at(index: number): ContainedThingOf<DocumentType> | undefined {
        return this.getWrappedDocument().at(index);
    }

    public contains(other: Document<any, any>): boolean {
        return this.getWrappedDocument().contains(other);
    }

    public count(/*callbackfn?: (thing: ThisType<ContainedThingOf<DocumentType>>, document?: ThisType<this>) => boolean*/): number {
        return this.getWrappedDocument().count(/*callbackfn*/);
    }

    public difference(other: this): this {
        return this.getWrappedDocument().difference(other) as this;
    }

    public equals(other: this): boolean {
        return this.getWrappedDocument().equals(other);
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

    public map(callbackfn: (value: ContainedThingOf<DocumentType>, index?: number, array?: ContainedThingOf<DocumentType>[]) => unknown, thisArg?: any): unknown[] {
        return this.getWrappedDocument().map(callbackfn);
    }

    public reduce(callbackfn: (previousValue: ContainedThingOf<DocumentType>, currentValue: ContainedThingOf<DocumentType>, currentIndex: number, array: ContainedThingOf<DocumentType>[]) => ContainedThingOf<DocumentType>): ContainedThingOf<DocumentType> {
        return this.getWrappedDocument().reduce(callbackfn);
    }

    public slice(start?: number | undefined, end?: number | undefined): this {
        return this.getWrappedDocument().slice(start, end) as this;
    }

    public some(predicate: (value: ContainedThingOf<DocumentType>, index?: number, array?: ContainedThingOf<DocumentType>[]) => unknown, thisArg?: any): boolean {
        return this.getWrappedDocument().some(predicate);
    }

}

const t = new DocumentDecoratedImpl(DocumentImpl, ThingImpl, ThingImpl);
const thing = t.get("");
const tr = t as Document<Thing<any, any>, Thing<any, any>>;

// export class DocumentGenericImpl<
//     Constructor extends DocumentConstructor<any> = DocumentConstructor<DocumentWritable<Thing<any, any>, Thing<any, any>>> 
// > extends DocumentDecoratedImpl<Constructor> {

//     // constructor(ThingConstructor?) // définit dans le DocumentImpl => lier le document, ses things et ses statements ?

//     public createThingToSelfDescribe(): SelfDescribingThingOf<ConstructedDocumentOf<Constructor>> {
//         return this.getWrappedDocument().createThingToSelfDescribe(); // compile ?
//     }

//     public createThingWithUri(nameHintOrUri?: string): ContainedThingOf<DocumentType> {
//         return this.getWrappedDocument().createThingWithUri(nameHintOrUri);
//     }
   
//     public createThingWithoutUri(nameHint?: string | undefined): ContainedThingOf<DocumentType> {
//         return this.getWrappedDocument().createThingWithoutUri(nameHint);
//     }

// }

// const g = new DocumentGenericImpl(DocumentImpl);
// g.createThingToSelfDescribe();

// const gR = g as Document<Thing<any, any>, Thing<any, any>>;
// gR.get("");


// export class ThingDecorated<
//     ContainedStatement extends StatementBase, //<any>, 
//     DocumentType extends Document<any, any>
// > implements Thing<ContainedStatement, DocumentType> {

//     private _wrapped: Thing<ContainedStatement, DocumentType>;

//     public constructor(wrapped: Thing<ContainedStatement, DocumentType>) {
//         this._wrapped = wrapped;
//     }
//     has(resourceOrUri: string | Resource): boolean {
//         throw new Error("Method not implemented.");
//     }
//     at(index: number): ContainedStatement | undefined {
//         throw new Error("Method not implemented.");
//     }
//     contains(other: ContainedStatement[]): boolean {
//         throw new Error("Method not implemented.");
//     }
//     every(predicate: (value: ContainedStatement, index?: number | undefined, array?: ContainedStatement[] | undefined) => boolean, thisArg?: any): boolean {
//         throw new Error("Method not implemented.");
//     }
//     find(predicate: (value: ContainedStatement, index?: number | undefined, obj?: ContainedStatement[] | undefined) => boolean, thisArg?: any): ContainedStatement | undefined {
//         throw new Error("Method not implemented.");
//     }
//     findIndex(predicate: (value: ContainedStatement, index?: number | undefined, obj?: ContainedStatement[] | undefined) => unknown, thisArg?: any): number {
//         throw new Error("Method not implemented.");
//     }
//     includes(searchElement: ContainedStatement, fromIndex?: number | undefined): boolean {
//         throw new Error("Method not implemented.");
//     }
//     indexOf(searchElement: ContainedStatement, fromIndex?: number | undefined): number {
//         throw new Error("Method not implemented.");
//     }
//     keys(): IterableIterator<number> {
//         throw new Error("Method not implemented.");
//     }
//     reduce(callbackfn: (previousValue: ContainedStatement, currentValue: ContainedStatement, currentIndex: number, array: ContainedStatement[]) => ContainedStatement): ContainedStatement {
//         throw new Error("Method not implemented.");
//     }
//     slice(start?: number | undefined, end?: number | undefined): ThisType<this> {
//         throw new Error("Method not implemented.");
//     }
//     some(predicate: (value: ContainedStatement, index?: number | undefined, array?: ContainedStatement[] | undefined) => unknown, thisArg?: any): boolean {
//         throw new Error("Method not implemented.");
//     }
//     [Symbol.iterator](): Iterator<ContainedStatement, any, undefined> {
//         throw new Error("Method not implemented.");
//     }
//     getOwner(): DocumentType {
//         throw new Error("Method not implemented.");
//     }

//     public getWrappedThing(): Thing<ContainedStatement, DocumentType> {
//         return this._wrapped;
//     }

//     public getContext(): Context | undefined {
//         return this.getWrappedThing().getContext();
//     }

//     public hasUri(): boolean {
//         return this.getWrappedThing().hasUri();
//     }

//     public count(): number {
//         return this.getWrappedThing().count();
//     }

//     public isEmpty(): boolean {
//         return this.getWrappedThing().isEmpty();
//     }

//     public equals(other: ThingBase<any>): boolean {
//         return this.getWrappedThing().equals(other);
//     }
    
//     public get(property: string): ContainedStatement | undefined {
//         return this.getWrappedThing().get(property);
//     }
    
//     public getAll(property: string): ContainedStatement[] {
//         return this.getWrappedThing().getAll(property);
//     }

//     public toCopy(): ThisType<this> {
//         return this.getWrappedThing().toCopy();
//     }

//     public [Symbol.iterator](): Iterator<ContainedStatement> {
//         return this.getWrappedThing()[Symbol.iterator]();
//     }

//     public getUri(): string {
//         return this.getWrappedThing().getUri();
//     }

//     public getDocument(): DocumentType {
//         return this.getWrappedThing().getDocument();
//     }

//     public forEach(callbackfn: (value: ContainedStatement, index: number, array: ContainedStatement[]) => void, thisArg?: any): void {
//         return this.getWrappedThing().forEach(callbackfn);
//     }

//     public map(callbackfn: (value: ContainedStatement, index: number, array: ContainedStatement[]) => unknown, thisArg?: any): unknown[] {
//         return this.getWrappedThing().map(callbackfn);
//     }

//     public filter(predicate: (value: ContainedStatement, index: number, array: ContainedStatement[]) => boolean): ContainedStatement[] {
//         return this.getWrappedThing().filter(predicate);
//     }

//     public add(statement: ContainedStatement): ThisType<this> {
//         return this.getWrappedThing().add(statement);
//     }

//     public remove(about: string, value: string | Resource, datatype?: string | undefined, language?: string | undefined): ThisType<this> {
//         return this.getWrappedThing().remove(about, value, datatype, language);
//     }

//     public removeAll(about: string): ThisType<this> {
//         return this.getWrappedThing().removeAll(about);
//     }

//     public set(about: string, value: string, oldValue?: string | undefined, datatype?: string | undefined, language?: string | undefined): ThisType<this> {
//         return this.getWrappedThing().set(about, value, oldValue, datatype, language);
//     }

//     public createStatement(about: string, value: string | Resource, datatype?: string | undefined, language?: string | undefined): this {
//         return this.getWrappedThing().createStatement(about, value, datatype, language) as this;
//     }

//     public toCopyReadonly(): ContainedThingOf<DocumentType> {
//         return this.getWrappedThing().toCopyReadonly();
//     }

//     public toCopyWritable(): ContainedThingOf<DocumentType> {
//         return this.getWrappedThing().toCopyWritable();
//     }
    
// }

export default DocumentDecoratedImpl;