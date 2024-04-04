export class ThingFactoryDefaultImpl {
    createThingToDescribeDocument(document) {
        throw new Error("Not implemented.");
        //return new ThingDefaultImpl(document, ThingType.ForDescribing);
    }
    createThing(document, uri) {
        throw new Error("Not implemented.");
        // return new ThingDefaultImpl(document, ThingType.Regular, uri);
    }
    createThingWithoutUri(document, nameHint) {
        throw new Error("Not implemented.");
        // return new ThingDefaultImpl(document, ThingType.Anonymous, nameHint);
    }
}
export default ThingFactoryDefaultImpl;
//# sourceMappingURL=ThingFactoryDefaultImpl.js.map