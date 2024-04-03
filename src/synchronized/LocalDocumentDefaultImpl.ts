import DecoratedDocument from "../core/DecoratedDocument.js";
import { Document } from "../core/Document.js";
import Thing from "../core/Thing.js";
import { LocalDocument } from "./SynchronizedDocument.js";

// states: Local | Distant
// states: Created | Modified | Loaded
export class LocalDocumentDefaultImpl<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> extends DecoratedDocument<ContainedThing, SelfDescribingThing> implements Document<ContainedThing, SelfDescribingThing>, LocalDocument {
    
    public isLocal(): boolean {
        return true;
    }

    public isDistant(): boolean {
        return false;
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

export default LocalDocumentDefaultImpl;