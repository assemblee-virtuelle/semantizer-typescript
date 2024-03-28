import Document from "./Document";
import Thing from "./Thing";
import ThingFactory from "./ThingFactory";
export declare class ThingFactoryDefaultImpl implements ThingFactory<Thing, Thing> {
    createThingToDescribeDocument(document: Document<Thing, Thing>): Thing;
    createThing(document: Document<Thing, Thing>, uri: string): Thing;
    createThingWithoutUri(document: Document<Thing, Thing>, nameHint?: string | undefined): Thing;
}
export default ThingFactoryDefaultImpl;
//# sourceMappingURL=ThingFactoryDefaultImpl.d.ts.map