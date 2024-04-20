import rdf from 'rdf-ext';
import DatasetExt from "rdf-ext/lib/Dataset";
import { Context } from "../index";
import DocumentBase from "../core/Document";
import Resource from "../core/Resource";
import ThingBase from "../core-default/Thing";
import DatasetCore from "@rdfjs/dataset/DatasetCore";
import RdfjsDatasetSerializable from './RdfjsDatasetSerializable';

export class DocumentDefaultImpl<SelfDescribingThing extends ThingBase = ThingBase> implements DocumentBase<ThingBase, SelfDescribingThing>, RdfjsDatasetSerializable {
    
    private _dataset: DatasetExt;

    public constructor(uri?: string, context?: Context) {
        this._dataset = rdf.dataset();
    }
    at(index: number): ThingBase | undefined {
        throw new Error('Method not implemented.');
    }
    add(thing: ThingBase): DocumentBase<ThingBase, SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    addAll(document: DocumentBase<ThingBase, SelfDescribingThing>): DocumentBase<ThingBase, SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    contains(other: DocumentBase<ThingBase, SelfDescribingThing>): boolean {
        throw new Error('Method not implemented.');
    }
    count(callbackfn?: ((thing: ThingBase, document: DocumentBase<ThingBase, SelfDescribingThing>) => boolean) | undefined): number {
        throw new Error('Method not implemented.');
    }
    createLocalCopy(): DocumentBase<ThingBase, SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    createThingToSelfDescribe(): SelfDescribingThing {
        throw new Error('Method not implemented.');
    }
    createThingWithUri(nameHintOrUri?: string | undefined): ThingBase {
        throw new Error('Method not implemented.');
    }
    createThingWithoutUri(nameHint?: string | undefined): ThingBase {
        throw new Error('Method not implemented.');
    }
    delete(thingOrUri: string | ThingBase): DocumentBase<ThingBase, SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    deleteContext(): void {
        throw new Error('Method not implemented.');
    }
    deleteMatches(uri?: string | Resource | undefined, property?: string | undefined, value?: string | undefined): DocumentBase<ThingBase, SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    difference(other: DocumentBase<ThingBase, SelfDescribingThing>): DocumentBase<ThingBase, SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    equals(other: DocumentBase<ThingBase, SelfDescribingThing>): boolean {
        throw new Error('Method not implemented.');
    }
    every(predicate: (value: ThingBase, index?: number | undefined, array?: ThingBase[] | undefined) => boolean, thisArg?: any): boolean {
        throw new Error('Method not implemented.');
    }
    filter(predicate: (value: ThingBase, index?: number | undefined, array?: ThingBase[] | undefined) => boolean): ThingBase[] {
        throw new Error('Method not implemented.');
    }
    find(predicate: (value: ThingBase, index?: number | undefined, obj?: ThingBase[] | undefined) => value is ThingBase, thisArg?: any): ThingBase | undefined {
        throw new Error('Method not implemented.');
    }
    findIndex(predicate: (value: ThingBase, index?: number | undefined, obj?: ThingBase[] | undefined) => unknown, thisArg?: any): number {
        throw new Error('Method not implemented.');
    }
    forEach(callbackfn: (value: ThingBase, index?: number | undefined, array?: ThingBase[] | undefined) => void, thisArg?: any): void {
        throw new Error('Method not implemented.');
    }
    get(uri: string | Resource): ThingBase | undefined {
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
    includes(searchElement: ThingBase, fromIndex?: number | undefined): boolean {
        throw new Error('Method not implemented.');
    }
    indexOf(searchElement: ThingBase, fromIndex?: number | undefined): number {
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
    map(callbackfn: (value: ThingBase, index: number, array: ThingBase[]) => unknown, thisArg?: any): unknown[] {
        throw new Error('Method not implemented.');
    }
    pop(): ThingBase | undefined {
        throw new Error('Method not implemented.');
    }
    reduce(callbackfn: (previousValue: ThingBase, currentValue: ThingBase, currentIndex: number, array: ThingBase[]) => ThingBase): ThingBase {
        throw new Error('Method not implemented.');
    }
    reverse(): void {
        throw new Error('Method not implemented.');
    }
    setContext(context: Context): void {
        throw new Error('Method not implemented.');
    }
    shift(): ThingBase | undefined {
        throw new Error('Method not implemented.');
    }
    slice(start?: number | undefined, end?: number | undefined): DocumentBase<ThingBase, SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    some(predicate: (value: ThingBase, index: number, array: ThingBase[]) => unknown, thisArg?: any): boolean {
        throw new Error('Method not implemented.');
    }
    sort(compareFn?: ((a: ThingBase, b: ThingBase) => number) | undefined): DocumentBase<ThingBase, SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    splice(start: number, deleteCount?: number | undefined, ...items: ThingBase[]): DocumentBase<ThingBase, SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    toCanonical(): string {
        throw new Error('Method not implemented.');
    }
    toGenericDocument(): DocumentBase<ThingBase, SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    toStream(): string {
        throw new Error('Method not implemented.');
    }
    union(other: DocumentBase<ThingBase, SelfDescribingThing>): DocumentBase<ThingBase, SelfDescribingThing> {
        throw new Error('Method not implemented.');
    }
    getUri(): string {
        throw new Error('Method not implemented.');
    }
    setUri(uri: string): void {
        throw new Error('Method not implemented.');
    }
    [Symbol.iterator](): Iterator<ThingBase, any, undefined> {
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