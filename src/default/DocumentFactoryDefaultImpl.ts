import Context from "../contracts/Context";
import Document from "../contracts/Document";
import DocumentDefaultImpl from "./DocumentDefaultImpl";
import DocumentFactory from "../contracts/DocumentFactory";
import Thing from "../contracts/Thing";
import ThingFactory from "../contracts/ThingFactory";
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