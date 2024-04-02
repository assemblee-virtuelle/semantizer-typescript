import { DocumentWithReadOperations } from "../core/Document.js";
import Thing from "../core/Thing.js";
import DecoratedDocumentWithReadOperationsDefaultImpl from "../decorator/DecoratedDocumentWithReadOperationsDefaultImpl.js";
import { DistantDocument, LocalDocument } from "./SynchronizedDocument.js";

// states: Local | Distant
// states: Created | Modified | Loaded
export class DistantDocumentDefaultImpl<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> extends DecoratedDocumentWithReadOperationsDefaultImpl<ContainedThing, SelfDescribingThing> implements DocumentWithReadOperations<ContainedThing, SelfDescribingThing>, DistantDocument<DecoratedDocumentWithReadOperationsDefaultImpl<ContainedThing, SelfDescribingThing>> {
    
    public execute(): void {
        throw new Error("Not implemented.");
    }
    
    public isLocal(): boolean {
        return true;
    }

    public isDistant(): boolean {
        return false;
    }

    public toLocalCopy(): LocalDocument & DecoratedDocumentWithReadOperationsDefaultImpl<ContainedThing, SelfDescribingThing>{
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