import { Context } from "./Context";
import { Document, DocumentBase, DocumentReadonly } from "./Document";
import Factory from "./Factory";
import Resource from "./Resource";
import { ThingBase, ThingReadonly } from "./Thing";

export class DocumentDecorated<
    ContainedThing extends ThingBase<any> = ThingBase, 
    SelfDescribingThing extends ThingBase<any> = ThingBase,
>
implements Document<ContainedThing, SelfDescribingThing> {
    
    protected _wrapped: Document<ContainedThing, SelfDescribingThing>;

    public constructor(wrapped: Document<ContainedThing, SelfDescribingThing>) {
        this._wrapped = wrapped;
    }

    public getFactory(): Factory<DocumentBase<ContainedThing, SelfDescribingThing>> {
        return this.getWrappedDocument().getFactory();
    }

    public toCopy(): this {
        throw new Error("Method not implemented.");
    }

    public toCopyReadonly<ContainedThingReadonly extends ThingReadonly<any>, SelfDescribingThingReadonly extends ThingReadonly<any>>(): DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly> {
        throw new Error("Method not implemented.");
    }
    
    public toCopyWritable(): Document<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }

    public createThingToSelfDescribe(): SelfDescribingThing {
        return this.getWrappedDocument().createThingToSelfDescribe();
    }
   
    public createThingWithoutUri(nameHint?: string | undefined): ContainedThing {
        return this.getWrappedDocument().createThingWithoutUri(nameHint);
    }

    public add(thing: ContainedThing): this {
        return this.getWrappedDocument().add(thing) as this;
    }
    
    public addAll(documentOrThings: this | ContainedThing[]): this {
        throw new Error("Method not implemented.");
    }
    
    public delete(thingOrUri: string | ContainedThing): this {
        throw new Error("Method not implemented.");
    }
    
    public deleteContext(): void {
        throw new Error("Method not implemented.");
    }
    
    public deleteMatches(uri?: string | Resource | undefined, property?: string | undefined, value?: string | undefined): this {
        throw new Error("Method not implemented.");
    }
    
    public pop(): ContainedThing | undefined {
        throw new Error("Method not implemented.");
    }
    
    public reverse(): void {
        throw new Error("Method not implemented.");
    }
    
    public setContext(context: Context): void {
        this.getWrappedDocument().setContext(context);
    }
    
    public shift(): ContainedThing | undefined {
        throw new Error("Method not implemented.");
    }
    
    public sort(compareFn?: ((a: ContainedThing, b: ContainedThing) => number) | undefined): this {
        throw new Error("Method not implemented.");
    }
    
    public splice(start: number, deleteCount?: number | undefined, ...items: ContainedThing[]): this {
        throw new Error("Method not implemented.");
    }
    
    public union(other: this): this {
        throw new Error("Method not implemented.");
    }

    public createThingWithUri(nameHintOrUri?: string): ContainedThing {
        throw new Error(); //return this.getWrappedDocument().crea
    }

    protected getWrappedDocument(): Document<ContainedThing, SelfDescribingThing> {
        return this._wrapped;
    }

    public get(uri: string | Resource): ContainedThing | undefined {
        return this.getWrappedDocument().get(uri);
    }

    public getContext(): Context | undefined {
        return this.getWrappedDocument().getContext();
    }

    public getThingThatSelfDescribes(): SelfDescribingThing | undefined {
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

    public [Symbol.iterator](): Iterator<ContainedThing> {
        return this.getWrappedDocument()[Symbol.iterator]();
    }

    public getUri(): string {
        return this.getWrappedDocument().getUri();
    }

    public at(index: number): ContainedThing | undefined {
        return this.getWrappedDocument().at(index);
    }

    public contains(other: this): boolean {
        return this.getWrappedDocument().contains(other);
    }

    public count(callbackfn?: (thing: ContainedThing, document?: ThisType<this>) => boolean): number {
        return this.getWrappedDocument().count(callbackfn);
    }

    public difference(other: this): this {
        return this.getWrappedDocument().difference(other) as this;
    }

    public equals(other: this): boolean {
        return this.getWrappedDocument().equals(other);
    }

    public every(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => boolean, thisArg?: any): boolean {
        return this.getWrappedDocument().every(predicate);
    }

    public filter(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => boolean): ContainedThing[] {
        return this.getWrappedDocument().filter(predicate);
    }

    public find(predicate: (value: ContainedThing, index?: number | undefined, obj?: ContainedThing[] | undefined) => boolean, thisArg?: any): ContainedThing | undefined {
        return this.getWrappedDocument().find(predicate);
    }

    public findIndex(predicate: (value: ContainedThing, index?: number | undefined, obj?: ContainedThing[] | undefined) => unknown, thisArg?: any): number {
        return this.getWrappedDocument().findIndex(predicate);
    }

    public forEach(callbackfn: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => void, thisArg?: any): void {
        return this.getWrappedDocument().forEach(callbackfn);
    }

    public includes(searchElement: ContainedThing, fromIndex?: number | undefined): boolean {
        return this.getWrappedDocument().includes(searchElement);
    }

    public indexOf(searchElement: ContainedThing, fromIndex?: number | undefined): number {
        return this.getWrappedDocument().indexOf(searchElement);
    }

    public keys(): IterableIterator<number> {
        return this.getWrappedDocument().keys();
    }

    public map(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): unknown[] {
        return this.getWrappedDocument().map(callbackfn);
    }

    public reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => ContainedThing): ContainedThing {
        return this.getWrappedDocument().reduce(callbackfn);
    }

    public slice(start?: number | undefined, end?: number | undefined): this {
        return this.getWrappedDocument().slice(start, end) as this;
    }

    public some(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): boolean {
        return this.getWrappedDocument().some(predicate);
    }

}

export default DocumentDecorated;