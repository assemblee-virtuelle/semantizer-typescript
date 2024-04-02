import { DocumentWithReadAndWriteOperations } from "../core/Document.js";
import Thing from "../core/Thing.js";
import DecoratedDocumentWithReadAndWriteOperationsDefaultImpl from "../decorator/DecoratedDocumentWithReadAndWriteOperationsDefaultImpl.js";
import { LocalDocument } from "./SynchronizedDocument.js";

// states: Local | Distant
// states: Created | Modified | Loaded
export class LocalDocumentDefaultImpl<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> extends DecoratedDocumentWithReadAndWriteOperationsDefaultImpl<ContainedThing, SelfDescribingThing> implements DocumentWithReadAndWriteOperations<ContainedThing, SelfDescribingThing>, LocalDocument {
    
    public execute(): void {
        throw new Error("Not implemented.");
    }
    
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