import DocumentBase from "./Document";
import ThingBase from "./Thing";

export interface ThingFactory<ContainedThing extends ThingBase = ThingBase, SelfDescribingThing extends ThingBase = ThingBase> {
    createThingToDescribeDocument(document: DocumentBase<ContainedThing, SelfDescribingThing>): SelfDescribingThing;
    createThing(document: DocumentBase<ContainedThing, SelfDescribingThing>, uri: string): ContainedThing;
    createThingWithoutUri(document: DocumentBase<ContainedThing, SelfDescribingThing>, nameHint?: string): ContainedThing;
}

export default ThingFactory;