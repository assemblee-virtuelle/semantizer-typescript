import Context from "../core/Context";
import Document, { ReadonlyDocument } from "../core/Document";
import DocumentFactory from "../core/DocumentFactory";
import { ReadonlyThing, Thing } from "../core/Thing";
export declare class DocumentFactoryDefaultImpl implements DocumentFactory {
    createDocument<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing>(uri?: string, context?: Context): Document<ContainedThing, SelfDescribingThing>;
    createReadonlyDocument<ContainedThing extends ReadonlyThing = ReadonlyThing, SelfDescribingThing extends ReadonlyThing = ReadonlyThing>(uri?: string, context?: Context): ReadonlyDocument<ContainedThing, SelfDescribingThing>;
}
export default DocumentFactoryDefaultImpl;
//# sourceMappingURL=DocumentFactoryDefaultImpl.d.ts.map