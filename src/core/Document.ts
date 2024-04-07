import Context from "./Context";
import Resource from "./Resource";
import { Thing, ThingBase, ThingReadonly } from "./Thing";
import ThingFactory from "./ThingFactory";

export interface DocumentType<
    ContainedThing extends ThingBase = ThingBase, 
    SelfDescribingThing extends ThingBase = ThingBase,
> {}

export interface DocumentBase<
    ContainedThing extends ThingBase = ThingBase, 
    SelfDescribingThing extends ThingBase = ThingBase,
> extends Resource, Iterable<ContainedThing> {
        //constructor(): DocumentBase<ContainedThing, SelfDescribingThing>;
    get(uri: string | Resource): ContainedThing | undefined;
    getContext(): Context | undefined;
    getThingThatSelfDescribes(): SelfDescribingThing | undefined;
    has(thing: string | Resource): boolean;
    hasThingThatSelfDescribes(): boolean;
    isEmpty(): boolean;
    toCanonical(): string; // DOMString? See https://github.com/digitalbazaar/rdf-canonize
    toStream(): string; // Stream
    [Symbol.iterator](): Iterator<ContainedThing>;
    
    // TODO: add meta data (acl, last time modified, headers...)
}

type ContainedThingOf<T extends DocumentBase> = T extends DocumentBase<infer TypeArg, any> ? TypeArg : never;
type SelfDescribingThingOf<T extends DocumentBase> = T extends DocumentBase<any, infer TypeArg> ? TypeArg : never;

export interface WithReadOperations<Wrapped extends DocumentBase<any, any>> {
    at(index: number): ContainedThingOf<Wrapped> | undefined;
    contains(other: Wrapped): boolean;
    count(callbackfn?: (thing: ContainedThingOf<Wrapped>, document?: Wrapped) => boolean): number;
    difference(other: Wrapped): Wrapped;
    equals(other: Wrapped): boolean;
    every(predicate: (value: ContainedThingOf<Wrapped>, index?: number, array?: ContainedThingOf<Wrapped>[]) => boolean, thisArg?: any): boolean;
    filter(predicate: (value: ContainedThingOf<Wrapped>, index?: number, array?: ContainedThingOf<Wrapped>[]) => boolean): ContainedThingOf<Wrapped>[];
    find(predicate: (value: ContainedThingOf<Wrapped>, index?: number, obj?: ContainedThingOf<Wrapped>[]) => boolean, thisArg?: any): ContainedThingOf<Wrapped> | undefined;
    findIndex(predicate: (value: ContainedThingOf<Wrapped>, index?: number, obj?: ContainedThingOf<Wrapped>[]) => unknown, thisArg?: any): number
    forEach(callbackfn: (value: ContainedThingOf<Wrapped>, index?: number, array?: ContainedThingOf<Wrapped>[]) => void, thisArg?: any): void;
    includes(searchElement: ContainedThingOf<Wrapped>, fromIndex?: number | undefined): boolean;
    indexOf(searchElement: ContainedThingOf<Wrapped>, fromIndex?: number | undefined): number;
    keys(): IterableIterator<number>; // to check
    map(callbackfn: (value: ContainedThingOf<Wrapped>, index: number, array: ContainedThingOf<Wrapped>[]) => unknown, thisArg?: any): unknown[];
    reduce(callbackfn: (previousValue: ContainedThingOf<Wrapped>, currentValue: ContainedThingOf<Wrapped>, currentIndex: number, array: ContainedThingOf<Wrapped>[]) => ContainedThingOf<Wrapped>): ContainedThingOf<Wrapped>; 
    slice(start?: number, end?: number): Wrapped;
    some(predicate: (value: ContainedThingOf<Wrapped>, index: number, array: ContainedThingOf<Wrapped>[]) => unknown, thisArg?: any): boolean;
}

export interface WithWriteOperations<Wrapped extends DocumentBase<any, any>> {
    add(thing: ContainedThingOf<Wrapped>): Wrapped;
    // TODO: add meta description
    addAll(documentOrThings: Wrapped | ContainedThingOf<Wrapped>[]): Wrapped;
    delete(thingOrUri: string | ContainedThingOf<Wrapped>): Wrapped;
    deleteContext(): void;
    deleteMatches(uri?: string | Resource, property?: string, value?: string): Wrapped;
    pop(): ContainedThingOf<Wrapped> | undefined;
    reverse(): void;
    setContext(context: Context): void;
    shift(): ContainedThingOf<Wrapped> | undefined;
    sort(compareFn?: (a: ContainedThingOf<Wrapped>, b: ContainedThingOf<Wrapped>) => number): Wrapped;
    splice(start: number, deleteCount?: number, ...items: ContainedThingOf<Wrapped>[]): Wrapped;
    // TODO: add meta description
    union(other: Wrapped): Wrapped;
}

// IDEA: IMPLEMENT DECORATOR WITH GENERICS? 
export interface DocumentWrapped<T extends DocumentBase<any, any>> 
extends DocumentBase<ContainedThingOf<T>, SelfDescribingThingOf<T>>,
WithReadOperations<T> {
    //getWrapped(): T;
}


// type MixinFunction<Type extends DocumentBase<any, any>> = <TSuper extends Document<any, any>>(base: Constructor<TSuper>) => Constructor<TSuper & Type>;
type test = <TBase>(Base: TBase) => DocumentBase;

/*type Wrapper<
    ContainedThing extends ThingBase = ThingBase, 
    SelfDescribingThing extends ThingBase = ThingBase
> = DocumentBase<ContainedThing, SelfDescribingThing>;

type DocumentWrapped<
    WrappedType extends DocumentBase<ContainedThing, SelfDescribingThing>
> = WrappedType<DocumentBase<ContainedThing, SelfDescribingThing>>
*/

export interface DocumentReadonly<Wrapped extends DocumentReadonly<any>> 
extends DocumentWrapped<Wrapped> {
    toCopy(): Wrapped;
    toCopyWritable<ContainedWritableThing extends Thing = Thing, SelfDescribingWritableThing extends Thing = Thing>(): Document<ContainedWritableThing, SelfDescribingWritableThing>;
}

export interface Document<
    ContainedThing extends Thing = Thing, 
    SelfDescribingThing extends Thing = Thing
> extends DocumentBase<ContainedThing, SelfDescribingThing>, WithWriteOperations<Document<ContainedThing, SelfDescribingThing>> {
    createThingToSelfDescribe(): SelfDescribingThing;
    createThingWithUri(nameHintOrUri?: string): ContainedThing;
    createThingWithoutUri(nameHint?: string): ContainedThing;
    getContainedThingFactory(): ThingFactory<ContainedThing, SelfDescribingThing>;
    toCopy(): Document<ContainedThing, SelfDescribingThing>;
    toCopyReadonly<ReturnedDocumentReadonly extends DocumentReadonly<any>>(): DocumentReadonly<ReturnedDocumentReadonly>;
}

export default Document;