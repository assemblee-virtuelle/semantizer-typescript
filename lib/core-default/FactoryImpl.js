import { DocumentImpl } from "./DocumentImpl.js";
import StatementImpl from "./StatementImpl.js";
import ThingImpl from "./ThingImpl.js";
export class FactoryImpl {
    createDocument(uri, context) {
        return new DocumentImpl(this); // as Factory<DocumentType>);
    }
    createDocumentReadonly(document) {
        throw new Error("Method not implemented.");
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
export class FactoryImplForCopying {
    createDocument(document) {
        throw new Error("Method not implemented.");
        //return Object.freeze(new DocumentImplReadonly<ThingTypeReadonly, ThingTypeReadonly, ThingType, ThingType>(document));
    }
    createThingToDescribeDocument(thing) {
        throw new Error("Method not implemented.");
    }
    createThing(thing) {
        throw new Error("Method not implemented.");
    }
    createThingWithoutUri(thing) {
        throw new Error("Method not implemented.");
    }
    createStatement(statement) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=FactoryImpl.js.map