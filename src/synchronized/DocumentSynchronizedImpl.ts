import { WithChangelog } from "../changelog/Changelog.js";
import { DocumentWritable } from "../core/Document.js";
import { Thing } from "../core/Thing.js";
import { DistantDocument, LocalDocument } from "./DocumentSynchronized.js";

export type DocumentLocalConstructor<
    ContainedThing extends Thing = Thing, 
    SelfDescribingThing extends Thing = Thing,
> = new (...args: any[]) => DocumentWritable<ContainedThing, SelfDescribingThing> & WithChangelog;

export function DocumentLocalMixin<
    TBase extends DocumentLocalConstructor<any, any>
>(Base: TBase) {
    return class DocumentLocalImpl extends Base implements LocalDocument {
        
        async saveUpdate(): Promise<void> {
            this.getChangelog().getAdded();
            console.log("saveUpdate in DocumentLocalImpl")
        }
        async saveNew(uri: string): Promise<void> {
            throw new Error("Method not implemented.");
        }
        async saveOverwrite(): Promise<void> {
            throw new Error("Method not implemented.");
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

    }
}

export function DocumentDistantMixin<
    TBase extends DocumentLocalConstructor<any, any>
>(Base: TBase) {
    return class DocumentDistantImpl extends Base implements DistantDocument {
      
        public isLocal(): boolean {
            return false;
        }
    
        public isDistant(): boolean {
            return true;
        }
    
        public toLocalCopy(): LocalDocument {
            throw new Error("Method not implemented.");
        }
    
        public getDistantUri(): string | undefined {
            return undefined;
        }
    
        public getDistantUriAll(): string[] {
            return [];
        }

    }
}