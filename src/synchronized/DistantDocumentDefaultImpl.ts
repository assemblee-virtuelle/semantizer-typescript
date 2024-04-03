import DecoratedDocument from "../core/DecoratedDocument.js";
import { ReadonlyDocument } from "../core/Document.js";
import Thing from "../core/Thing.js";
import { DistantDocument, LocalDocument } from "./SynchronizedDocument.js";

// states: Local | Distant
// states: Created | Modified | Loaded
export class DistantDocumentDefaultImpl<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> extends DecoratedDocument<ContainedThing, SelfDescribingThing> implements ReadonlyDocument<ContainedThing, SelfDescribingThing>, DistantDocument<DecoratedDocument<ContainedThing, SelfDescribingThing>> {
      
    public isLocal(): boolean {
        return true;
    }

    public isDistant(): boolean {
        return false;
    }

    public toLocalCopy(): LocalDocument & DecoratedDocument<ContainedThing, SelfDescribingThing>{
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