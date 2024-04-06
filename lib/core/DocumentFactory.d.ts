import Context from "./Context";
import { Document, ReadonlyDocument } from "./Document";
import { ReadonlyThing, Thing } from "./Thing";
export interface DocumentFactory {
    createDocument<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing>(uri?: string, context?: Context): Document<ContainedThing, SelfDescribingThing>;
    createReadonlyDocument<ContainedThing extends ReadonlyThing = ReadonlyThing, SelfDescribingThing extends ReadonlyThing = ReadonlyThing>(uri?: string, context?: Context): ReadonlyDocument<ContainedThing, SelfDescribingThing>;
}
export default DocumentFactory;
//# sourceMappingURL=DocumentFactory.d.ts.map