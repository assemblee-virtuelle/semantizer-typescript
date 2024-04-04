import Context from "../core/Context";
import Document, { ReadonlyDocument } from "../core/Document";
import DocumentFactory from "../core/DocumentFactory";
import { Thing } from "../core/Thing";
import DocumentDefaultImpl from "./DocumentDefaultImpl";

export class DocumentFactoryDefaultImpl<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> implements DocumentFactory<ContainedThing, SelfDescribingThing> {

    public createDocument(uri?: string, context?: Context): Document<ContainedThing, SelfDescribingThing> {
        return new DocumentDefaultImpl<ContainedThing, SelfDescribingThing>();
    }

    public createReadonlyDocument(uri?: string, context?: Context): ReadonlyDocument<ContainedThing, SelfDescribingThing> {
        return new DocumentDefaultImpl<ContainedThing, SelfDescribingThing>();
    }

}

export default DocumentFactoryDefaultImpl;