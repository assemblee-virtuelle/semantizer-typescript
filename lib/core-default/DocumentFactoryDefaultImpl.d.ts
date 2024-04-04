import Context from "../core/Context";
import Document, { ReadonlyDocument } from "../core/Document";
import DocumentFactory from "../core/DocumentFactory";
import { Thing } from "../core/Thing";
export declare class DocumentFactoryDefaultImpl<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> implements DocumentFactory<ContainedThing, SelfDescribingThing> {
    createDocument(uri?: string, context?: Context): Document<ContainedThing, SelfDescribingThing>;
    createReadonlyDocument(uri?: string, context?: Context): ReadonlyDocument<ContainedThing, SelfDescribingThing>;
}
export default DocumentFactoryDefaultImpl;
//# sourceMappingURL=DocumentFactoryDefaultImpl.d.ts.map