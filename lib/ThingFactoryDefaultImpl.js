import { ThingDefaultImpl, ThingType } from "./ThingDefaultImpl";
export class ThingFactoryDefaultImpl {
    createThingToDescribeDocument(document) {
        return new ThingDefaultImpl(document, ThingType.ForDescribing);
    }
    createThing(document, uri) {
        return new ThingDefaultImpl(document, ThingType.Regular, uri);
    }
    createThingWithoutUri(document, nameHint) {
        return new ThingDefaultImpl(document, ThingType.Anonymous, nameHint);
    }
}
export default ThingFactoryDefaultImpl;
//# sourceMappingURL=ThingFactoryDefaultImpl.js.map