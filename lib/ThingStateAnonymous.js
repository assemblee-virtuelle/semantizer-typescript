export default class ThingStateAnonymous {
    constructor(thing, nameHint) {
    }
    toRdfDatasetExt() {
        throw new Error("Method not implemented.");
    }
    getThing() {
        throw new Error("Method not implemented.");
    }
    getAllValuesAboutStatement(property) {
        throw new Error("Method not implemented.");
    }
    addStatement(about, value, datatype, language) {
        throw new Error("Method not implemented.");
    }
    getUri() {
        return '';
    }
    isAnonymous() {
        return true;
    }
}
//# sourceMappingURL=ThingStateAnonymous.js.map