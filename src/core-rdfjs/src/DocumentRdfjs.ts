import DatasetCore from '@rdfjs/dataset/DatasetCore';
import rdfjs from '@rdfjs/data-model';
import { Quad } from "@rdfjs/types";
import { 
    Document, 
    DocumentWithNonDestructiveOperations, 
    StatementOf, 
    Context, 
    Resource, 
    StatementWithDestructiveOperations, 
    Thing, 
    ThingWithNonDestructiveOperations,
    ThingConstructor
} from "@virtual-assembly/semantizer-core";
import { ThingRdfjs } from './ThingRdfjs';

export class DocumentRdfjs<
    ContainedThing extends Thing<any>, 
    SelfDescribingThing extends Thing<any>
> implements Document<ContainedThing, SelfDescribingThing> {
    
    private _dataset: DatasetCore<Quad>;
    private _containedThingImpl: ThingConstructor<ContainedThing>;
    private _selfDescribingThingImpl: ThingConstructor<SelfDescribingThing>;

    //public constructor(uri?: string, context?: Context) {
    public constructor(dataset: DatasetCore<Quad>, containedThingImpl: ThingConstructor<ContainedThing>, selfDescribingThingImpl: ThingConstructor<SelfDescribingThing>) {
        this._dataset = dataset;
        this._containedThingImpl = containedThingImpl;
        this._selfDescribingThingImpl = selfDescribingThingImpl;
    }

    getThingAboutSelf(): SelfDescribingThing | undefined {
        throw new Error('Method not implemented.');
    }
    getThingAllIterator(): Iterator<Thing<StatementWithDestructiveOperations>, any, undefined> {
        throw new Error('Method not implemented.');
    }
    getStatementAllIterator(): Iterator<StatementWithDestructiveOperations, any, undefined> {
        throw new Error('Method not implemented.');
    }
    
    [Symbol.iterator](): Iterator<ContainedThing> {
        throw new Error('Method not implemented.');
    }
    
    getUri(): string {
        throw new Error('Method not implemented.');
    }
    hasUri(): boolean {
        throw new Error('Method not implemented.');
    }
    getContext(): Context | undefined {
        throw new Error('Method not implemented.');
    }
    equals(other: ThisType<this>): boolean {
        throw new Error('Method not implemented.');
    }
    difference(other: ThisType<this>): ThisType<this> {
        throw new Error('Method not implemented.');
    }
    toCopy(): ThisType<this> {
        throw new Error('Method not implemented.');
    }

    getUriFromStringOrResource(about: string | Resource): string {
        return typeof about === 'string'? about: about.getUri();
    }

    getThing(about: string | Resource): ContainedThing {
        const uri = this.getUriFromStringOrResource(about);
        const thingDataset = this._dataset.match(rdfjs.namedNode(uri));
        return new this._containedThingImpl(new ThingRdfjs(thingDataset)); // new ThingImpl()
    }
    
    hasThing(about: string | Resource): boolean {
        throw new Error('Method not implemented.');
    }
    hasThingAboutSelf(): boolean {
        throw new Error('Method not implemented.');
    }
    getStatement(about: string | Resource, property: string, language?: string | undefined): StatementOf<ContainedThing> {
        throw new Error('Method not implemented.');
    }
    getStatementAll(about: string | Resource, property?: string | undefined, language?: string | undefined): StatementOf<ContainedThing>[] {
        throw new Error('Method not implemented.');
    }
    getStatementAboutSelf(property: string, language?: string | undefined): StatementOf<SelfDescribingThing> | undefined {
        throw new Error('Method not implemented.');
    }
    getStatementAboutSelfAll(property?: string | undefined, language?: string | undefined): StatementOf<SelfDescribingThing>[] {
        throw new Error('Method not implemented.');
    }
    hasStatement(about: string | Resource, property?: string | undefined, language?: string | undefined): boolean {
        throw new Error('Method not implemented.');
    }
    hasStatementAboutSelf(property?: string | undefined, language?: string | undefined): boolean {
        throw new Error('Method not implemented.');
    }
    at(index: number): ContainedThing | undefined {
        throw new Error('Method not implemented.');
    }
    contains(other: DocumentWithNonDestructiveOperations<any, ThingWithNonDestructiveOperations>): boolean {
        throw new Error('Method not implemented.');
    }
    count(): number {
        throw new Error('Method not implemented.');
    }
    every(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => boolean, thisArg?: any): boolean {
        throw new Error('Method not implemented.');
    }
    filter(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => boolean): ContainedThing[] {
        throw new Error('Method not implemented.');
    }
    filterContainedStatement(predicate: (value: StatementOf<ContainedThing>, index?: number | undefined, array?: StatementOf<ContainedThing>[] | undefined) => boolean): StatementOf<ContainedThing>[] {
        throw new Error('Method not implemented.');
    }
    find(predicate: (value: ContainedThing, index?: number | undefined, obj?: ContainedThing[] | undefined) => boolean, thisArg?: any): ContainedThing | undefined {
        throw new Error('Method not implemented.');
    }
    findIndex(predicate: (value: ContainedThing, index?: number | undefined, obj?: ContainedThing[] | undefined) => unknown, thisArg?: any): number {
        throw new Error('Method not implemented.');
    }
    forEach(callbackfn: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => void, thisArg?: any): void {
        throw new Error('Method not implemented.');
    }
    forEachStatement(callbackfn: (value: StatementOf<ContainedThing>, index?: number | undefined, array?: StatementOf<ContainedThing>[] | undefined) => void, thisArg?: any): void {
        throw new Error('Method not implemented.');
    }
    includes(searchElement: ContainedThing, fromIndex?: number | undefined): boolean {
        throw new Error('Method not implemented.');
    }
    indexOf(searchElement: ContainedThing, fromIndex?: number | undefined): number {
        throw new Error('Method not implemented.');
    }
    keys(): IterableIterator<number> {
        throw new Error('Method not implemented.');
    }
    map(callbackfn: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => unknown, thisArg?: any): unknown[] {
        throw new Error('Method not implemented.');
    }
    reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => ThingWithNonDestructiveOperations): ContainedThing {
        throw new Error('Method not implemented.');
    }
    slice(start?: number | undefined, end?: number | undefined): ThisType<this> {
        throw new Error('Method not implemented.');
    }
    some(predicate: (value: ContainedThing, index?: number | undefined, array?: ContainedThing[] | undefined) => unknown, thisArg?: any): boolean {
        throw new Error('Method not implemented.');
    }
    createThing(uriOrNameHint?: string | Resource | undefined): ContainedThing {
        throw new Error('Method not implemented.');
    }
    createThingAboutSelf(): SelfDescribingThing {
        throw new Error('Method not implemented.');
    }
    addThing(other: ThingWithNonDestructiveOperations): ContainedThing {
        throw new Error('Method not implemented.');
    }
    addThingAll(others: Iterable<ThingWithNonDestructiveOperations>): ContainedThing[] {
        throw new Error('Method not implemented.');
    }
    addThingAboutSelf(other: ThingWithNonDestructiveOperations): SelfDescribingThing {
        throw new Error('Method not implemented.');
    }
    addThingAboutSelfAll(others: Iterable<ThingWithNonDestructiveOperations>): SelfDescribingThing[] {
        throw new Error('Method not implemented.');
    }
    createStatement(about: string | Resource, property: string, value: string, datatype?: string | undefined, language?: string | undefined): StatementOf<ContainedThing> {
        throw new Error('Method not implemented.');
    }
    createStatementAboutSelf(property: string, value: string, datatype?: string | undefined, language?: string | undefined): StatementOf<SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    addStatement(other: StatementWithDestructiveOperations): StatementOf<ContainedThing> {
        throw new Error('Method not implemented.');
    }
    addStatementAll(others: Iterable<StatementWithDestructiveOperations>): StatementOf<ContainedThing>[] {
        throw new Error('Method not implemented.');
    }
    addStatementAboutSelf(other: StatementWithDestructiveOperations): StatementOf<SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    addStatementAboutSelfAll(others: Iterable<StatementWithDestructiveOperations>): StatementOf<SelfDescribingThing>[] {
        throw new Error('Method not implemented.');
    }
    setThing(thing: ContainedThing, uri?: string | undefined): ContainedThing {
        throw new Error('Method not implemented.');
    }
    setThingAt(index: number, thing: ContainedThing): ContainedThing {
        throw new Error('Method not implemented.');
    }
    setStatement(about: string | Resource, property: string, value: string, oldValue?: string | undefined, datatype?: string | undefined, language?: string | undefined): StatementOf<ContainedThing> {
        throw new Error('Method not implemented.');
    }
    setStatementAboutSelf(property: string, value: string, oldValue?: string | undefined, datatype?: string | undefined, language?: string | undefined): StatementOf<SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    removeThing(thingOrUri: string | Resource): boolean {
        throw new Error('Method not implemented.');
    }
    removeStatement(statement: StatementWithDestructiveOperations): boolean;
    removeStatement(about: string | Resource, property: string, value: string, language?: string | undefined): boolean;
    removeStatement(about: unknown, property?: unknown, value?: unknown, language?: unknown): boolean {
        throw new Error('Method not implemented.');
    }
    pop(): ContainedThing | undefined {
        throw new Error('Method not implemented.');
    }
    reverse(): void {
        throw new Error('Method not implemented.');
    }
    shift(): ContainedThing | undefined {
        throw new Error('Method not implemented.');
    }
    sort(compareFn?: ((a: ContainedThing, b: ContainedThing) => number) | undefined): ThisType<this> {
        throw new Error('Method not implemented.');
    }
    splice(start: number, deleteCount?: number | undefined): ContainedThing[];
    splice(start: number, deleteCount: number, ...items: ContainedThing[]): ContainedThing[];
    splice(start: number, deleteCount?: number, ...rest: ContainedThing[]): ContainedThing[] {
        throw new Error('Method not implemented.');
    }

}

export default DocumentRdfjs;