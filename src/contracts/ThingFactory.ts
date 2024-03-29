import Document from "./Document";
import Thing from "./Thing";

export interface ThingFactory<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> {
    createThingToDescribeDocument(document: Document<ContainedThing, SelfDescribingThing>): SelfDescribingThing;
    createThing(document: Document<ContainedThing, SelfDescribingThing>, uri: string): ContainedThing;
    createThingWithoutUri(document: Document<ContainedThing, SelfDescribingThing>, nameHint?: string): ContainedThing;
}

export default ThingFactory;