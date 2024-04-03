import DecoratedDocument from "../core/DecoratedDocument.js";
import { ReadonlyDocument } from "../core/Document.js";
import ThingBase from "../core/Thing.js";
import { DistantDocument, LocalDocument } from "./SynchronizedDocument.js";

// states: Local | Distant
// states: Created | Modified | Loaded
export class DistantDocumentDefaultImpl<ContainedThing extends ThingBase = ThingBase, SelfDescribingThing extends ThingBase = ThingBase, Local = DecoratedDocument<ContainedThing, SelfDescribingThing>> extends DecoratedDocument<ContainedThing, SelfDescribingThing> implements ReadonlyDocument<ContainedThing, SelfDescribingThing>, DistantDocument<Local> {
      
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