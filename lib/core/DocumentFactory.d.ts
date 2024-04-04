import Context from "./Context";
import { Document, ReadonlyDocument } from "./Document";
import { Thing } from "./Thing";
export interface DocumentFactory<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> {
    createDocument(uri?: string, context?: Context): Document<ContainedThing, SelfDescribingThing>;
    createReadonlyDocument(uri?: string, context?: Context): ReadonlyDocument<ContainedThing, SelfDescribingThing>;
}
export default DocumentFactory;
//# sourceMappingURL=DocumentFactory.d.ts.map