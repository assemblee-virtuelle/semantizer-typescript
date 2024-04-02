import Document from "../core/Document";
import Thing from "../core/Thing";
import { ThingDefaultImpl, ThingType } from "./ThingDefaultImpl";
import ThingFactory from "../core/ThingFactory";

export class ThingFactoryDefaultImpl<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> implements ThingFactory<ContainedThing, SelfDescribingThing> {

    public createThingToDescribeDocument(document: Document<ContainedThing, SelfDescribingThing>): SelfDescribingThing {
        return new ThingDefaultImpl(document, ThingType.ForDescribing);
    }

    public createThing(document: Document<ContainedThing, SelfDescribingThing>, uri: string): ContainedThing {
        return new ThingDefaultImpl(document, ThingType.Regular, uri);
    }

    public createThingWithoutUri(document: Document<ContainedThing, SelfDescribingThing>, nameHint?: string | undefined): ContainedThing {
        return new ThingDefaultImpl(document, ThingType.Anonymous, nameHint);
    }
    
}

export default ThingFactoryDefaultImpl;