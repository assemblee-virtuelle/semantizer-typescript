import { DocumentImpl } from "./DocumentImpl.js";
import StatementImpl from "./StatementImpl.js";
import ThingImpl from "./ThingImpl.js";
export class FactoryImpl {
    createDocument(uri, context) {
        return new DocumentImpl(this);
    }
    createThingToDescribeDocument(document) {
        return new ThingImpl(document);
    }
    createThing(document, uri) {
        return new ThingImpl(document);
    }
    createThingWithoutUri(document, nameHint) {
        return new ThingImpl(document);
    }
    createStatement(thing, about, value, datatype, language) {
        return new StatementImpl(thing, about, value, datatype, language);
    }
}
export class FactoryImplReadonly {
    constructor() {
        this._factory = new FactoryImpl();
    }
    createDocument(uri, context) {
        const document = this._factory.createDocument();
        return Object.freeze(document);
    }
    createThingToDescribeDocument(document) {
        const thing = this._factory.createThingToDescribeDocument(document);
        return Object.freeze(thing);
    }
    createThing(document, uri) {
        const thing = this._factory.createThing(document, uri);
        return Object.freeze(thing);
    }
    createThingWithoutUri(document, nameHint) {
        const thing = this._factory.createThingWithoutUri(document);
        return Object.freeze(thing);
    }
    createStatement(thing, about, value, datatype, language) {
        throw new Error("Not implemented.");
    }
}
// const factory = new FactoryImpl();
// const document = factory.createDocument();
// document.deleteContext();
// document.createThingToSelfDescribe().createStatement("ex:prop", "");
// const factoryReadonly = new FactoryImplReadonly();
// const documentReadonly = factoryReadonly.createDocument();
// // @ts-expect-error
// documentReadonly.deleteContext();
// const getted = documentReadonly.get("");
// const copied = getted?.toCopy()
//# sourceMappingURL=FactoryImpl.js.map