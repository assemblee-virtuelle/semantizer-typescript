import Document from "./Document";
import Thing from "./Thing";
import { ThingDefaultImpl, ThingType } from "./ThingDefaultImpl";
import ThingFactory from "./ThingFactory";

export class ThingFactoryDefaultImpl implements ThingFactory<Thing, Thing> {

    public createThingToDescribeDocument(document: Document<Thing, Thing>): Thing {
        return new ThingDefaultImpl(document, ThingType.ForDescribing);
    }

    public createThing(document: Document<Thing, Thing>, uri: string): Thing {
        return new ThingDefaultImpl(document, ThingType.Regular, uri);
    }

    public createThingWithoutUri(document: Document<Thing, Thing>, nameHint?: string | undefined): Thing {
        return new ThingDefaultImpl(document, ThingType.Anonymous, nameHint);
    }
    
}

export default ThingFactoryDefaultImpl;