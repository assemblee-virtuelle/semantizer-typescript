export function DocumentWithChangelogN3Mixin(Base) {
    return class DocumentWithChangelogN3Impl extends Base {
        toN3() {
            // Use a dedicated module with a vocabulary?
            this.getChangelog().getAdded();
            throw new Error("Method not implemented.");
        }
    };
}
// Ideally if it would take as an input the original resource 
// (ideally in JSON-LD format, but any other format would work too) and the N3 Patch request, 
// and return the patched resource. And throw errors if there is something wrong with the 
// N3 Patch request.
//# sourceMappingURL=ChangelogN3Impl.js.map