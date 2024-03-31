import Resource from "./Resource";
import Context from "./Context";
import Thing from "./Thing";
import Document from "./Document";

export interface EditableDocument<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> extends Document<ContainedThing, SelfDescribingThing> {
    add(thing: ContainedThing): Document<ContainedThing, SelfDescribingThing>;
    // TODO: add meta description
    addAll(documentOrThings: Document<ContainedThing, SelfDescribingThing> | ContainedThing[]): Document<ContainedThing, SelfDescribingThing>;
    createThingToSelfDescribe(): SelfDescribingThing;
    createThingWithUri(nameHintOrUri?: string): ContainedThing;
    createThingWithoutUri(nameHint?: string): ContainedThing;
    delete(thingOrUri: string | ContainedThing): Document<ContainedThing, SelfDescribingThing>;
    deleteContext(): void;
    deleteMatches(uri?: string | Resource, property?: string, value?: string): Document<ContainedThing, SelfDescribingThing>;
    map(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): unknown[];
    pop(): ContainedThing | undefined;
    reduce(callbackfn: (previousValue: ContainedThing, currentValue: ContainedThing, currentIndex: number, array: ContainedThing[]) => ContainedThing): ContainedThing; 
    reverse(): void;
    setContext(context: Context): void;
    shift(): ContainedThing | undefined;
    slice(start?: number, end?: number): Document<ContainedThing, SelfDescribingThing>;
    sort(compareFn?: (a: ContainedThing, b: ContainedThing) => number): Document<ContainedThing, SelfDescribingThing>;
    splice(start: number, deleteCount?: number, ...items: ContainedThing[]): Document<ContainedThing, SelfDescribingThing>;
    // TODO: add meta description
    union(other: Document<ContainedThing, SelfDescribingThing>): Document<ContainedThing, SelfDescribingThing>; // or join()?
}

export default EditableDocument;