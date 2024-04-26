import { DocumentWithChangelogN3Constructor } from "../changelog-n3/ChangelogN3";
import { LocalDocument } from "../synchronized/DocumentSynchronized";

export function LocalSolidDocumentMixin<
    TBase extends DocumentWithChangelogN3Constructor<any, any>
>(Base: TBase) {
    return class LocalSolidDocumentImpl extends Base implements LocalDocument {
        
        public async saveUpdate(): Promise<void> {
            const n3Patch = this.getChangelogN3().toN3();
            const request = await fetch(this.getUri(), { method: 'PATCH', body: n3Patch });
            // TODO: handle response
            // return Document?
        }
        
        public async saveNew(uri: string): Promise<void> {
            throw new Error("Method not implemented.");
        }
        
        public async saveOverwrite(): Promise<void> {
            throw new Error("Method not implemented.");
        }
        
        // Below methods should be implemented in Base class, change the constructor 
        // constraint to take a LocalDocument in addition?
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