import rdf from 'rdf-ext';
import DatasetExt from "rdf-ext/lib/Dataset";
import { Context } from "../index";
import Document from "../contracts/Document";
import Resource from "../contracts/Resource";
import Thing from "../contracts/Thing";
import DatasetCore from "@rdfjs/dataset/DatasetCore";
import RdfjsDatasetSerializable from './RdfjsDatasetSerializable';

export class DocumentDefaultImpl<SelfDescribingThing extends Thing = Thing> implements Document<Thing, SelfDescribingThing>, RdfjsDatasetSerializable {
    
    private _dataset: DatasetExt;

    public constructor(uri?: string, context?: Context) {
        this._dataset = rdf.dataset();
    }
    at(index: number): Thing | undefined {
        throw new Error('Method not implemented.');
    }
    add(thing: Thing): Document<Thing, SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    addAll(document: Document<Thing, SelfDescribingThing>): Document<Thing, SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    contains(other: Document<Thing, SelfDescribingThing>): boolean {
        throw new Error('Method not implemented.');
    }
    count(callbackfn?: ((thing: Thing, document: Document<Thing, SelfDescribingThing>) => boolean) | undefined): number {
        throw new Error('Method not implemented.');
    }
    createLocalCopy(): Document<Thing, SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    createThingToSelfDescribe(): SelfDescribingThing {
        throw new Error('Method not implemented.');
    }
    createThingWithUri(nameHintOrUri?: string | undefined): Thing {
        throw new Error('Method not implemented.');
    }
    createThingWithoutUri(nameHint?: string | undefined): Thing {
        throw new Error('Method not implemented.');
    }
    delete(thingOrUri: string | Thing): Document<Thing, SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    deleteContext(): void {
        throw new Error('Method not implemented.');
    }
    deleteMatches(uri?: string | Resource | undefined, property?: string | undefined, value?: string | undefined): Document<Thing, SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    difference(other: Document<Thing, SelfDescribingThing>): Document<Thing, SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    equals(other: Document<Thing, SelfDescribingThing>): boolean {
        throw new Error('Method not implemented.');
    }
    every(predicate: (value: Thing, index?: number | undefined, array?: Thing[] | undefined) => boolean, thisArg?: any): boolean {
        throw new Error('Method not implemented.');
    }
    filter(predicate: (value: Thing, index?: number | undefined, array?: Thing[] | undefined) => boolean): Thing[] {
        throw new Error('Method not implemented.');
    }
    find(predicate: (value: Thing, index?: number | undefined, obj?: Thing[] | undefined) => value is Thing, thisArg?: any): Thing | undefined {
        throw new Error('Method not implemented.');
    }
    findIndex(predicate: (value: Thing, index?: number | undefined, obj?: Thing[] | undefined) => unknown, thisArg?: any): number {
        throw new Error('Method not implemented.');
    }
    forEach(callbackfn: (value: Thing, index?: number | undefined, array?: Thing[] | undefined) => void, thisArg?: any): void {
        throw new Error('Method not implemented.');
    }
    get(uri: string | Resource): Thing | undefined {
        throw new Error('Method not implemented.');
    }
    getContext(): Context | undefined {
        throw new Error('Method not implemented.');
    }
    getThingThatSelfDescribes(): SelfDescribingThing | undefined {
        throw new Error('Method not implemented.');
    }
    has(thing: string | Resource): boolean {
        throw new Error('Method not implemented.');
    }
    hasThingThatSelfDescribes(): boolean {
        throw new Error('Method not implemented.');
    }
    includes(searchElement: Thing, fromIndex?: number | undefined): boolean {
        throw new Error('Method not implemented.');
    }
    indexOf(searchElement: Thing, fromIndex?: number | undefined): number {
        throw new Error('Method not implemented.');
    }
    isEmpty(): boolean {
        throw new Error('Method not implemented.');
    }
    isLocal(): boolean {
        throw new Error('Method not implemented.');
    }
    isDistant(): boolean {
        throw new Error('Method not implemented.');
    }
    keys(): IterableIterator<number> {
        throw new Error('Method not implemented.');
    }
    map(callbackfn: (value: Thing, index: number, array: Thing[]) => unknown, thisArg?: any): unknown[] {
        throw new Error('Method not implemented.');
    }
    pop(): Thing | undefined {
        throw new Error('Method not implemented.');
    }
    reduce(callbackfn: (previousValue: Thing, currentValue: Thing, currentIndex: number, array: Thing[]) => Thing): Thing {
        throw new Error('Method not implemented.');
    }
    reverse(): void {
        throw new Error('Method not implemented.');
    }
    setContext(context: Context): void {
        throw new Error('Method not implemented.');
    }
    shift(): Thing | undefined {
        throw new Error('Method not implemented.');
    }
    slice(start?: number | undefined, end?: number | undefined): Document<Thing, SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    some(predicate: (value: Thing, index: number, array: Thing[]) => unknown, thisArg?: any): boolean {
        throw new Error('Method not implemented.');
    }
    sort(compareFn?: ((a: Thing, b: Thing) => number) | undefined): Document<Thing, SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    splice(start: number, deleteCount?: number | undefined, ...items: Thing[]): Document<Thing, SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    toCanonical(): string {
        throw new Error('Method not implemented.');
    }
    toGenericDocument(): Document<Thing, Thing> {
        throw new Error('Method not implemented.');
    }
    toStream(): string {
        throw new Error('Method not implemented.');
    }
    union(other: Document<Thing, SelfDescribingThing>): Document<Thing, SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    getUri(): string {
        throw new Error('Method not implemented.');
    }
    setUri(uri: string): void {
        throw new Error('Method not implemented.');
    }
    [Symbol.iterator](): Iterator<Thing, any, undefined> {
        throw new Error('Method not implemented.');
    }

    public toRdfjsDataset(): DatasetCore {
        return this._dataset.clone();
    }

    /*public equals(other: Document): boolean {
        return this.toRdfDatasetExt().equals(other.toRdfDatasetExt());
    }*/

}

export default DocumentDefaultImpl;