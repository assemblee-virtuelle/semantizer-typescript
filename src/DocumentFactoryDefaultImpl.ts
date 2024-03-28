import Context from "./Context";
import Document from "./Document";
import DocumentDefaultImpl from "./DocumentDefaultImpl";
import DocumentFactory from "./DocumentFactory";
import Thing from "./Thing";
import ThingFactory from "./ThingFactory";
import ThingFactoryDefaultImpl from "./ThingFactoryDefaultImpl";

export class DocumentFactoryDefaultImpl implements DocumentFactory<Thing, Thing> {

    private _thingFactory: ThingFactory;

    public constructor() {
        this._thingFactory = new ThingFactoryDefaultImpl();
    }

    public getThingFactory(): ThingFactory {
        return this._thingFactory;
    }

    public createDocument(uri?: string | undefined, context?: Context | undefined): Document<Thing, Thing> {
        return new DocumentDefaultImpl(this.getThingFactory(), uri, context);
    }

    public loadDocument(uriOrData: string): Document<Thing, Thing> {
        throw new Error("Method not implemented.");
    }

}

export default DocumentFactoryDefaultImpl;