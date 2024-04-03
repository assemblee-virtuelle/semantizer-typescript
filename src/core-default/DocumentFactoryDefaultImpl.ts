import Context from "../core/Context";
import { WritableDocument } from "../core/Document";
import ThingBase from "../core/Thing";
import ThingFactory from "../core/ThingFactory";
import DocumentDefaultImpl from "./DocumentDefaultImpl";
import ThingFactoryDefaultImpl from "./ThingFactoryDefaultImpl";

export class DocumentFactoryDefaultImpl<ContainedThing extends ThingBase = ThingBase, SelfDescribingThing extends ThingBase = ThingBase> {

    private _thingFactory: ThingFactory<ContainedThing, SelfDescribingThing>;

    public constructor() {
        this._thingFactory = new ThingFactoryDefaultImpl();
    }

    public getThingFactory(): ThingFactory<ContainedThing, SelfDescribingThing> {
        return this._thingFactory;
    }

    public createDocument(uri?: string | undefined, context?: Context | undefined): WritableDocument<ContainedThing, SelfDescribingThing> {
        return new DocumentDefaultImpl<ContainedThing, SelfDescribingThing>(uri, context, this.getThingFactory());
    }

    public loadDocument(uriOrData: string): WritableDocument<ContainedThing, SelfDescribingThing> {
        throw new Error("Method not implemented.");
    }

}

export default DocumentFactoryDefaultImpl;