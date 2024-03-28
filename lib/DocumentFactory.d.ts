import Context from "./Context";
import Document from "./Document";
import Thing from "./Thing";
export interface DocumentFactory<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> {
    createDocument(uri?: string, context?: Context): Document<ContainedThing, SelfDescribingThing>;
    loadDocument(uriOrData: string): Document<ContainedThing, SelfDescribingThing>;
}
export default DocumentFactory;
//# sourceMappingURL=DocumentFactory.d.ts.map