import Context from "./Context";
import Document from "./Document";
import DocumentFactory from "./DocumentFactory";
import Thing from "./Thing";
import ThingFactory from "./ThingFactory";
export declare class DocumentFactoryDefaultImpl implements DocumentFactory<Thing, Thing> {
    private _thingFactory;
    constructor();
    getThingFactory(): ThingFactory;
    createDocument(uri?: string | undefined, context?: Context | undefined): Document<Thing, Thing>;
    loadDocument(uriOrData: string): Document<Thing, Thing>;
}
export default DocumentFactoryDefaultImpl;
//# sourceMappingURL=DocumentFactoryDefaultImpl.d.ts.map