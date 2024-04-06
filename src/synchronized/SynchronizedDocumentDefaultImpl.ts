import DecoratedDocument, { DecoratedReadonlyDocument } from "../core/DecoratedDocument.js";
import { Document, DocumentReadonly } from "../core/Document.js";
import ThingBase, { ThingReadonly, Thing } from "../core/Thing.js";
import { DistantDocument, LocalDocument } from "./SynchronizedDocument.js";

export class LocalDocumentDefaultImpl<
    ContainedThing extends ThingBase = ThingBase, 
    SelfDescribingThing extends ThingBase = ThingBase
> extends DecoratedDocument<ContainedThing, SelfDescribingThing> 
implements Document<ContainedThing, SelfDescribingThing>, LocalDocument {
    
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

export class DistantDocumentDefaultImpl<
    ContainedThing extends Thing = Thing, 
    SelfDescribingThing extends Thing = Thing, 
    ContainedThingReadonly extends ThingReadonly = ThingReadonly, 
    SelfDescribingThingReadonly extends ThingReadonly = ThingReadonly, 
    Local extends Document<ContainedThing, SelfDescribingThing> = Document<ContainedThing, SelfDescribingThing>
> extends DecoratedReadonlyDocument<ContainedThingReadonly, SelfDescribingThingReadonly> 
implements DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly>, DistantDocument<Local> {
      
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