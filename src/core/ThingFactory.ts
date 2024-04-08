import { DocumentBase, ContainedThingOf, SelfDescribingThingOf } from "./Document";

export interface ThingFactory<Wrapped extends DocumentBase<any, any>> {
    createThingToDescribeDocument(document: Wrapped): SelfDescribingThingOf<Wrapped>;
    createThing(document: Wrapped, uri: string): ContainedThingOf<Wrapped>;
    createThingWithoutUri(document: Wrapped, nameHint?: string): ContainedThingOf<Wrapped>;
}

export default ThingFactory;