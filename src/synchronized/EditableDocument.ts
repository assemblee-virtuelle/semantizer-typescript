
import Resource from "../contracts/Resource";
import Thing from "../contracts/Thing";
import Context from "../contracts/Context";
import SynchronizedDocument from "./SynchronizedDocument";

export interface EditableDocument<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> extends SynchronizedDocument<ContainedThing, SelfDescribingThing> {
    add(thing: ContainedThing): SynchronizedDocument<ContainedThing, SelfDescribingThing>;
    // TODO: add meta description
    addAll(documentOrThings: SynchronizedDocument<ContainedThing, SelfDescribingThing> | ContainedThing[]): SynchronizedDocument<ContainedThing, SelfDescribingThing>;
    createThingToSelfDescribe(): SelfDescribingThing;
    createThingWithUri(nameHintOrUri?: string): ContainedThing;
    createThingWithoutUri(nameHint?: string): ContainedThing;
    delete(thingOrUri: string | ContainedThing): SynchronizedDocument<ContainedThing, SelfDescribingThing>;
    deleteContext(): void;
    deleteMatches(uri?: string | Resource, property?: string, value?: string): SynchronizedDocument<ContainedThing, SelfDescribingThing>;
    map(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): unknown[];
    pop(): ContainedThing | undefined;
    reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => ContainedThing): ContainedThing; 
    reverse(): void;
    setContext(context: Context): void;
    shift(): ContainedThing | undefined;
    sort(compareFn?: (a: ContainedThing, b: ContainedThing) => number): SynchronizedDocument<ContainedThing, SelfDescribingThing>;
    splice(start: number, deleteCount?: number, ...items: ContainedThing[]): SynchronizedDocument<ContainedThing, SelfDescribingThing>;
    // TODO: add meta description
    union(other: SynchronizedDocument<ContainedThing, SelfDescribingThing>): SynchronizedDocument<ContainedThing, SelfDescribingThing>; // or join()?
}

export default EditableDocument;