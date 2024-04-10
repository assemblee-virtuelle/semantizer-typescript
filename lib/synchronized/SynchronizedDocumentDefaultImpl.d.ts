import DecoratedDocument, { DecoratedReadonlyDocument } from "../core/DecoratedDocument.js";
import { Document, DocumentReadonly } from "../core/Document.js";
import { ThingBase, ThingReadonly, Thing } from "../core/Thing.js";
import { DistantDocument, LocalDocument } from "./SynchronizedDocument.js";
export declare class LocalDocumentDefaultImpl<ContainedThing extends ThingBase = ThingBase, SelfDescribingThing extends ThingBase = ThingBase> extends DecoratedDocument<ContainedThing, SelfDescribingThing> implements Document<ContainedThing, SelfDescribingThing>, LocalDocument {
    isLocal(): boolean;
    isDistant(): boolean;
    getDistantUri(): string | undefined;
    getDistantUriAll(): string[];
    save(): void;
}
export declare class DistantDocumentDefaultImpl<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing, ContainedThingReadonly extends ThingReadonly = ThingReadonly, SelfDescribingThingReadonly extends ThingReadonly = ThingReadonly, Local extends Document<ContainedThing, SelfDescribingThing> = Document<ContainedThing, SelfDescribingThing>> extends DecoratedReadonlyDocument<ContainedThingReadonly, SelfDescribingThingReadonly> implements DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly>, DistantDocument<Local> {
    isLocal(): boolean;
    isDistant(): boolean;
    toLocalCopy(): LocalDocument & Local;
    getDistantUri(): string | undefined;
    getDistantUriAll(): string[];
    save(): void;
}
//# sourceMappingURL=SynchronizedDocumentDefaultImpl.d.ts.map