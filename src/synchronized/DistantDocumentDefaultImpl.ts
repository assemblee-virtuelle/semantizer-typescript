import DecoratedDocument, { DecoratedReadonlyDocument } from "../core/DecoratedDocument.js";
import { Document, ReadonlyDocument } from "../core/Document.js";
import ThingBase, { ReadonlyThing, Thing } from "../core/Thing.js";
import { DistantDocument, LocalDocument } from "./SynchronizedDocument.js";

// states: Local | Distant
// states: Created | Modified | Loaded
export class DistantDocumentDefaultImpl<
    ContainedThing extends Thing = Thing, 
    SelfDescribingThing extends Thing = Thing, 
    ContainedThingReadonly extends ReadonlyThing = ReadonlyThing, 
    SelfDescribingThingReadonly extends ReadonlyThing = ReadonlyThing, 
    Local extends Document<ContainedThing, SelfDescribingThing> = Document<ContainedThing, SelfDescribingThing>
> extends DecoratedReadonlyDocument<ContainedThingReadonly, SelfDescribingThingReadonly> 
implements ReadonlyDocument<ContainedThingReadonly, SelfDescribingThingReadonly>, DistantDocument<Local> {
      
    public isLocal(): boolean {
        return false;
    }

    public isDistant(): boolean {
        return true;
    }

    public toLocalCopy(): LocalDocument & Local {
        throw new Error("Method not implemented.");
    }

    public getDistantUri(): string | undefined {
        return undefined;
    }

    public getDistantUriAll(): string[] {
        return [];
    }

    public save(): void {
        
    }

}

export default DistantDocumentDefaultImpl;