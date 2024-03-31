import Context from "./Context";
import Document from "./Document";
import Resource from "./Resource";
import Thing from "./Thing";
import WithReadOperations from "./WithReadOperations";

type DocumentWithReadOperations<ContainedThing extends Thing, SelfDescribingThing  extends Thing> = Document<ContainedThing, SelfDescribingThing> & WithReadOperations<ContainedThing, SelfDescribingThing>;
type DocumentWithWriteOperations<ContainedThing extends Thing, SelfDescribingThing  extends Thing> = Document<ContainedThing, SelfDescribingThing> & WithWriteOperations<ContainedThing, SelfDescribingThing>;

export interface WithWriteOperations<ContainedThing extends Thing, SelfDescribingThing extends Thing> {
    add(thing: ContainedThing): DocumentWithWriteOperations<ContainedThing, SelfDescribingThing>;
    // TODO: add meta description
    addAll(documentOrThings: DocumentWithReadOperations<ContainedThing, SelfDescribingThing> | ContainedThing[]): DocumentWithWriteOperations<ContainedThing, SelfDescribingThing>;
    createThingToSelfDescribe(): SelfDescribingThing;
    createThingWithUri(nameHintOrUri?: string): ContainedThing;
    createThingWithoutUri(nameHint?: string): ContainedThing;
    delete(thingOrUri: string | ContainedThing): DocumentWithWriteOperations<ContainedThing, SelfDescribingThing>;
    deleteContext(): void;
    deleteMatches(uri?: string | Resource, property?: string, value?: string): DocumentWithWriteOperations<ContainedThing, SelfDescribingThing>;
    pop(): ContainedThing | undefined;
    reverse(): void;
    setContext(context: Context): void;
    shift(): ContainedThing | undefined;
    sort(compareFn?: (a: ContainedThing, b: ContainedThing) => number): DocumentWithWriteOperations<ContainedThing, SelfDescribingThing>;
    splice(start: number, deleteCount?: number, ...items: ContainedThing[]): DocumentWithWriteOperations<ContainedThing, SelfDescribingThing>;
    // TODO: add meta description
    union(other: DocumentWithReadOperations<ContainedThing, SelfDescribingThing>): DocumentWithWriteOperations<ContainedThing, SelfDescribingThing>;
}

export default WithWriteOperations;