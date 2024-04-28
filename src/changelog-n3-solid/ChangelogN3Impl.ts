import { DocumentWithChangelogConstructor } from "../changelog/Changelog";
import { N3Serializable } from "../n3/N3";

export function DocumentWithChangelogN3Mixin<
    TBase extends DocumentWithChangelogConstructor<any, any>
>(Base: TBase) {
    return class DocumentWithChangelogN3Impl extends Base implements N3Serializable {

        public toN3(): string {
            // Use a dedicated module with a vocabulary?
            this.getChangelog().getAdded();
            throw new Error("Method not implemented.");
        }

    }
}

// Ideally if it would take as an input the original resource 
// (ideally in JSON-LD format, but any other format would work too) and the N3 Patch request, 
// and return the patched resource. And throw errors if there is something wrong with the 
// N3 Patch request.