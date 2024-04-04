import { DecoratedReadonlyDocument } from "../core/DecoratedDocument.js";
import { Document, ReadonlyDocument } from "../core/Document.js";
import { ReadonlyThing, Thing } from "../core/Thing.js";
import { DistantDocument, LocalDocument } from "./SynchronizedDocument.js";
export declare class DistantDocumentDefaultImpl<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing, ContainedThingReadonly extends ReadonlyThing = ReadonlyThing, SelfDescribingThingReadonly extends ReadonlyThing = ReadonlyThing, Local extends Document<ContainedThing, SelfDescribingThing> = Document<ContainedThing, SelfDescribingThing>> extends DecoratedReadonlyDocument<ContainedThingReadonly, SelfDescribingThingReadonly> implements ReadonlyDocument<ContainedThingReadonly, SelfDescribingThingReadonly>, DistantDocument<Local> {
    isLocal(): boolean;
    isDistant(): boolean;
    toLocalCopy(): LocalDocument & Local;
    getDistantUri(): string | undefined;
    getDistantUriAll(): string[];
    save(): void;
}
export default DistantDocumentDefaultImpl;
//# sourceMappingURL=DistantDocumentDefaultImpl.d.ts.map