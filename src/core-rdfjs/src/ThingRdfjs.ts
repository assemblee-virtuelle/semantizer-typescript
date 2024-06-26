import { Thing, Statement, Context, StatementWithDestructiveOperations, ThingWithNonDestructiveOperations } from "@virtual-assembly/semantizer-core";
import DatasetCore from '@rdfjs/dataset/DatasetCore';
import DocumentRdfjs from "./DocumentRdfjs";
import { Quad } from "@rdfjs/types";
import rdfjs from '@rdfjs/data-model';

export class ThingRdfjs<
    StatementType extends Statement = Statement
> implements Thing<StatementType> {

    // private _document: DocumentRdfjs<any, any>;
    private _uri: string;
    private _dataset: DatasetCore<Quad>;

    constructor(dataset: DatasetCore<Quad>) {
        let subject: string = "";
        for (const quad of dataset) {
            if (subject === "")
                subject = quad.subject.value;
            else if (subject !== quad.subject.value)
                throw new Error("A thing can't contain multiple subject");
        }
        this._uri = subject;
        this._dataset = dataset;
    }

    [Symbol.iterator](): Iterator<StatementWithDestructiveOperations> {
        throw new Error("Method not implemented.");
    }
    getUri(): string {
        return this._uri;
    }
    hasUri(): boolean {
        throw new Error("Method not implemented.");
    }
    getContext(): Context | undefined {
        throw new Error("Method not implemented.");
    }
    equals(other: ThisType<this>): boolean {
        throw new Error("Method not implemented.");
    }
    difference(other: ThisType<this>): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    toCopy(): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    getStatement(property: string, language?: string | undefined): StatementType | undefined {
        throw new Error("Method not implemented.");
    }
    getStatementAll(property?: string | undefined, language?: string | undefined): StatementType[] {
        throw new Error("Method not implemented.");
    }
    hasStatement(property?: string | undefined, language?: string | undefined): boolean {
        throw new Error("Method not implemented.");
    }

    isTypeOf(type: string, ...others: string[]): boolean {
        [type, ...others].forEach(type => {
            this._dataset.match(rdfjs.namedNode(this.getUri()), )
        });
        return false;
    }

    at(index: number): StatementType | undefined {
        throw new Error("Method not implemented.");
    }
    contains(other: ThingWithNonDestructiveOperations<StatementWithDestructiveOperations>): boolean {
        throw new Error("Method not implemented.");
    }
    count(): number {
        throw new Error("Method not implemented.");
    }
    every(predicate: (value: StatementType, index?: number | undefined, array?: StatementType[] | undefined) => boolean, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }
    filter(predicate: (value: StatementType, index?: number | undefined, array?: StatementType[] | undefined) => boolean): StatementType[] {
        throw new Error("Method not implemented.");
    }
    find(predicate: (value: StatementType, index?: number | undefined, obj?: StatementType[] | undefined) => boolean, thisArg?: any): StatementType | undefined {
        throw new Error("Method not implemented.");
    }
    findIndex(predicate: (value: StatementType, index?: number | undefined, obj?: StatementType[] | undefined) => unknown, thisArg?: any): number {
        throw new Error("Method not implemented.");
    }
    forEach(callbackfn: (value: StatementType, index?: number | undefined, array?: StatementType[] | undefined) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }
    includes(searchElement: StatementType, fromIndex?: number | undefined): boolean {
        throw new Error("Method not implemented.");
    }
    indexOf(searchElement: StatementType, fromIndex?: number | undefined): number {
        throw new Error("Method not implemented.");
    }
    keys(): IterableIterator<number> {
        throw new Error("Method not implemented.");
    }
    map(callbackfn: (value: StatementType, index?: number | undefined, array?: StatementType[] | undefined) => unknown, thisArg?: any): unknown[] {
        throw new Error("Method not implemented.");
    }
    reduce(callbackfn: (previousValue: StatementType, currentValue: StatementType, currentIndex: number, array: StatementType[]) => StatementType): StatementType {
        throw new Error("Method not implemented.");
    }
    slice(start?: number | undefined, end?: number | undefined): ThingWithNonDestructiveOperations<StatementWithDestructiveOperations> {
        throw new Error("Method not implemented.");
    }
    some(predicate: (value: StatementType, index?: number | undefined, array?: StatementType[] | undefined) => unknown, thisArg?: any): boolean {
        throw new Error("Method not implemented.");
    }
    createStatement(property: string, value: string, datatype?: string | undefined, language?: string | undefined): StatementType {
        throw new Error("Method not implemented.");
    }
    addStatement(other: StatementWithDestructiveOperations): StatementType {
        throw new Error("Method not implemented.");
    }
    addStatementAll(others: Iterable<StatementWithDestructiveOperations>): StatementType[] {
        throw new Error("Method not implemented.");
    }
    setStatement(property: string, value: string, oldValue?: string | undefined, datatype?: string | undefined, language?: string | undefined): StatementType | undefined {
        throw new Error("Method not implemented.");
    }
    deleteStatement(statement: StatementType): boolean {
        throw new Error("Method not implemented.");
    }
    pop(): StatementType | undefined {
        throw new Error("Method not implemented.");
    }
    reverse(): void {
        throw new Error("Method not implemented.");
    }
    shift(): StatementType | undefined {
        throw new Error("Method not implemented.");
    }
    sort(compareFn?: ((a: StatementType, b: StatementType) => number) | undefined): ThisType<this> {
        throw new Error("Method not implemented.");
    }
    splice(start: number, deleteCount?: number | undefined, ...items: StatementType[]): ThisType<this> {
        throw new Error("Method not implemented.");
    } 

}