import DocumentBase from "./Document";
import Thing from "./Thing";

export interface ThingFactory<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> {
    createThingToDescribeDocument(document: DocumentBase<ContainedThing, SelfDescribingThing>): SelfDescribingThing;
    createThing(document: DocumentBase<ContainedThing, SelfDescribingThing>, uri: string): ContainedThing;
    createThingWithoutUri(document: DocumentBase<ContainedThing, SelfDescribingThing>, nameHint?: string): ContainedThing;
}

export default ThingFactory;