import Thing from "./Thing";
import Resource from "./Resource";
import Context from "./Context";

export interface Document<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> extends Resource, Iterable<ContainedThing> {
    getContext(): Context | undefined;
    setContext(context: Context): void;
    expand(uri: string): string;
    shorten(uri: string): string;

    isEmpty(): boolean;
    count(): number;
    equals(other: Document): boolean;

    add(thing: ContainedThing): Document;
    addDocument(document: Document): Document;

    get(uri: string): ContainedThing | null;
    getThingThatSelfDescribes(): SelfDescribingThing | null;
    
    createThingToSelfDescribe(): SelfDescribingThing;
    createThing(nameHintOrUri?: string): ContainedThing;
    createThingWithoutUri(nameHint?: string): ContainedThing;
    
    delete(thingOrUri: string | Thing): void;
    //countStatementsAbout(subject: string | Resource, property?: string): number;
    hasStatementsAbout(subject: string | Resource, property?: string, ...hasValues: string[]): boolean;
    
    forEach(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => void, thisArg?: any): void;
    map(callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => unknown, thisArg?: any): unknown[];
    filter(predicate: (value: ContainedThing, index: number, array: ContainedThing[]) => boolean): ContainedThing[];

    // TODO: add sort algorithms
}

export default Document;