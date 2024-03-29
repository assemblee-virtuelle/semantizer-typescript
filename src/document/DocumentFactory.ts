import Context from "../common/Context";
import Document from "./Document";
import Thing from "../thing/Thing";

export interface DocumentFactory<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> {
    createDocument(uri?: string, context?: Context): Document<ContainedThing, SelfDescribingThing>;
    loadDocument(uriOrData: string): Document<ContainedThing, SelfDescribingThing>;
}

export default DocumentFactory;