import DocumentDefaultImpl from "./DocumentDefaultImpl";
import ThingFactoryDefaultImpl from "./ThingFactoryDefaultImpl";
export class DocumentFactoryDefaultImpl {
    constructor() {
        this._thingFactory = new ThingFactoryDefaultImpl();
    }
    getThingFactory() {
        return this._thingFactory;
    }
    createDocument(uri, context) {
        return new DocumentDefaultImpl(this.getThingFactory(), uri, context);
    }
    loadDocument(uriOrData) {
        throw new Error("Method not implemented.");
    }
}
export default DocumentFactoryDefaultImpl;
//# sourceMappingURL=DocumentFactoryDefaultImpl.js.map