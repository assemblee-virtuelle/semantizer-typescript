import { DocumentWithChangelogConstructor } from "../changelog/Changelog.js";
import { DistantDocument, LocalDocument } from "./DocumentSynchronized.js";

export function DocumentLocalMixin<
    TBase extends DocumentWithChangelogConstructor<any, any>
>(Base: TBase) {
    return class DocumentLocalImpl extends Base implements LocalDocument {
        
        public async saveUpdate(): Promise<void> {
            this.getChangelog().getAdded();
            // convert the changelog in N3 + serialisation
            // make a PATCH fetch request with authent
            // -> Faire un mixin pour la gestion de la sauvegarde / IO
            // ou synchronized-solid
            console.log("saveUpdate in DocumentLocalImpl")
        }
        
        public async saveNew(uri: string): Promise<void> {
            throw new Error("Method not implemented.");
        }
        
        public async saveOverwrite(): Promise<void> {
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
    TBase extends DocumentWithChangelogConstructor<any, any>
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