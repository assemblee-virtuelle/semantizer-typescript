import Context from "./Context";
import Document from "./Document";
import Resource from "./Resource";
import Thing from "./Thing";

type DocumentWithReadOperations<ContainedThing extends Thing, SelfDescribingThing  extends Thing> = Document<ContainedThing, SelfDescribingThing> & WithReadOperations<ContainedThing, SelfDescribingThing>;

export interface WithReadOperations<ContainedThing extends Thing, SelfDescribingThing extends Thing> {
    at(index: number): ContainedThing | undefined;
    contains(other: DocumentWithReadOperations<ContainedThing, SelfDescribingThing>): boolean;
    count(callbackfn?: (thing: ContainedThing, document?: DocumentWithReadOperations<ContainedThing, SelfDescribingThing>) => boolean): number;
    difference(other: DocumentWithReadOperations<ContainedThing, SelfDescribingThing>): DocumentWithReadOperations<ContainedThing, SelfDescribingThing>;
    equals(other: DocumentWithReadOperations<ContainedThing, SelfDescribingThing>): boolean;
    every(predicate: (value: ContainedThing, index?: number, array?: ContainedThing[]) => boolean, thisArg?: any): boolean;
    filter(predicate: (value: ContainedThing, index?: number, array?: ContainedThing[]) => boolean): ContainedThing[];
    find(predicate: (value: ContainedThing, index?: number, obj?: ContainedThing[]) => value is ContainedThing, thisArg?: any): ContainedThing | undefined;
    findIndex(predicate: (value: ContainedThing, index?: number, obj?: ContainedThing[]) => unknown, thisArg?: any): number
    forEach(callbackfn: (value: ContainedThing, index?: number, array?: ContainedThing[]) => void, thisArg?: any): void;
    includes(searchElement: ContainedThing, fromIndex?: number | undefined): boolean;
    indexOf(searchElement: ContainedThing, fromIndex?: number | undefined): number;
    keys(): IterableIterator<number>; // to check
    map(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): unknown[];
    reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => ContainedThing): ContainedThing; 
    slice(start?: number, end?: number): DocumentWithReadOperations<ContainedThing, SelfDescribingThing>;
    some(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): boolean;
}

export default WithReadOperations;