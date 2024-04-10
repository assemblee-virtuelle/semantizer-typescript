import { Context } from "./Context";
import { ContainedThingOf, Document, DocumentBase, DocumentReadonly, SelfDescribingThingOf } from "./Document";
import Factory from "./Factory";
import Resource from "./Resource";
import { ThingBase, ThingReadonly } from "./Thing";

export class DocumentDecorated<
    DocumentType extends Document<any>
>
implements Document<DocumentType> {
    
    protected _wrapped: Document<DocumentType>;

    public constructor(wrapped: Document<DocumentType>) {
        this._wrapped = wrapped;
    }

    public getFactory(): Factory<DocumentType> {
        return this.getWrappedDocument().getFactory();
    }

    public toCopy(): this {
        throw new Error("Method not implemented.");
    }

    public toCopyReadonly<DocumentCopied extends DocumentReadonly<any>>(): DocumentCopied {
        throw new Error("Method not implemented.");
    }
    
    public toCopyWritable<DocumentCopied extends Document<any>>(): DocumentCopied {
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
        throw new Error(); //return this.getWrappedDocument().crea
    }

    protected getWrappedDocument(): Document<DocumentType> {
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

    public difference(other: DocumentType): DocumentType {
        return this.getWrappedDocument().difference(other) as DocumentType;
    }

    public equals(other: DocumentType): boolean {
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

    public map(callbackfn: (value: ContainedThingOf<DocumentType>, index: number, array: ContainedThingOf<DocumentType>[]) => unknown, thisArg?: any): unknown[] {
        return this.getWrappedDocument().map(callbackfn);
    }

    public reduce(callbackfn: (previousValue: ContainedThingOf<DocumentType>, currentValue: ContainedThingOf<DocumentType>, currentIndex: number, array: ContainedThingOf<DocumentType>[]) => ContainedThingOf<DocumentType>): ContainedThingOf<DocumentType> {
        return this.getWrappedDocument().reduce(callbackfn);
    }

    public slice(start?: number | undefined, end?: number | undefined): this {
        return this.getWrappedDocument().slice(start, end) as this;
    }

    public some(predicate: (value: ContainedThingOf<DocumentType>, index: number, array: ContainedThingOf<DocumentType>[]) => unknown, thisArg?: any): boolean {
        return this.getWrappedDocument().some(predicate);
    }

}

export default DocumentDecorated;