import DocumentBase from "../core/Document";
import ThingBase from "../core/Thing";
import ThingFactory from "../core/ThingFactory";
export declare class ThingFactoryDefaultImpl<ContainedThing extends ThingBase = ThingBase, SelfDescribingThing extends ThingBase = ThingBase> implements ThingFactory<ContainedThing, SelfDescribingThing> {
    createThingToDescribeDocument(document: DocumentBase<ContainedThing, SelfDescribingThing>): SelfDescribingThing;
    createThing(document: DocumentBase<ContainedThing, SelfDescribingThing>, uri: string): ContainedThing;
    createThingWithoutUri(document: DocumentBase<ContainedThing, SelfDescribingThing>, nameHint?: string | undefined): ContainedThing;
}
export default ThingFactoryDefaultImpl;
//# sourceMappingURL=ThingFactoryDefaultImpl.d.ts.map