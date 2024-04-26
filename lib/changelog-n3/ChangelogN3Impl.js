export function DocumentWithChangelogN3Mixin(Base) {
    return class DocumentWithChangelogN3Impl extends Base {
        toN3() {
            this.getChangelog().getAdded();
            throw new Error("Method not implemented.");
        }
    };
}
//# sourceMappingURL=ChangelogN3Impl.js.map