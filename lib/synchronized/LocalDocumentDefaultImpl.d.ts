import DecoratedDocument from "../core/DecoratedDocument.js";
import { Document } from "../core/Document.js";
import ThingBase from "../core/Thing.js";
import { LocalDocument } from "./SynchronizedDocument.js";
export declare class LocalDocumentDefaultImpl<ContainedThing extends ThingBase = ThingBase, SelfDescribingThing extends ThingBase = ThingBase> extends DecoratedDocument<ContainedThing, SelfDescribingThing> implements Document<ContainedThing, SelfDescribingThing>, LocalDocument {
    isLocal(): boolean;
    isDistant(): boolean;
    getDistantUri(): string | undefined;
    getDistantUriAll(): string[];
    save(): void;
}
export default LocalDocumentDefaultImpl;
//# sourceMappingURL=LocalDocumentDefaultImpl.d.ts.map