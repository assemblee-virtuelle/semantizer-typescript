import DocumentBase from "../core/Document";
import ThingBase from "../core/Thing";
import { ThingDefaultImpl, ThingType } from "./ThingDefaultImpl";
import ThingFactory from "../core/ThingFactory";

export class ThingFactoryDefaultImpl<ContainedThing extends ThingBase = ThingBase, SelfDescribingThing extends ThingBase = ThingBase> implements ThingFactory<ContainedThing, SelfDescribingThing> {

    public createThingToDescribeDocument(document: DocumentBase<ContainedThing, SelfDescribingThing>): SelfDescribingThing {
        return new ThingDefaultImpl<ContainedThing, SelfDescribingThing>(document, ThingType.ForDescribing);
    }

    public createThing(document: DocumentBase<ContainedThing, SelfDescribingThing>, uri: string): ContainedThing {
        return new ThingDefaultImpl<ContainedThing, SelfDescribingThing>(document, ThingType.Regular, uri);
    }

    public createThingWithoutUri(document: DocumentBase<ContainedThing, SelfDescribingThing>, nameHint?: string | undefined): ContainedThing {
        return new ThingDefaultImpl<ContainedThing, SelfDescribingThing>(document, ThingType.Anonymous, nameHint);
    }
    
}

export default ThingFactoryDefaultImpl;