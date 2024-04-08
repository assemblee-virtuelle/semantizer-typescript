import { DocumentBase, ContainedThingOf, SelfDescribingThingOf } from "../core/Document";

export class ThingFactoryDefaultImpl<Wrapped extends DocumentBase<any, any>> {

    public createThingToDescribeDocument(document: Wrapped): SelfDescribingThingOf<Wrapped> {
        throw new Error("Not implemented.");
        //return new ThingDefaultImpl(document, ThingType.ForDescribing);
    }

    public createThing(document: Wrapped, uri: string): ContainedThingOf<Wrapped> {
        throw new Error("Not implemented.");
        // return new ThingDefaultImpl(document, ThingType.Regular, uri);
    }

    public createThingWithoutUri(document: Wrapped, nameHint?: string | undefined): ContainedThingOf<Wrapped> {
        throw new Error("Not implemented.");
        // return new ThingDefaultImpl(document, ThingType.Anonymous, nameHint);
    }
    
}

export default ThingFactoryDefaultImpl;