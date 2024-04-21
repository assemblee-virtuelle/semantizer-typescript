import { ChangelogImpl } from "./ChangelogImpl.js";
export function DocumentWithChangelogMixin(Base) {
    return class DocumentWithChangelogImpl extends Base {
        constructor(...args) {
            super();
            this._changelog = new ChangelogImpl();
        }
        createStatement(about, value) {
            super.createStatement(about, value);
            //this._changelog.registerAdded()
            return this;
        }
        getChangelog() {
            return this._changelog;
        }
    };
}
//# sourceMappingURL=DocumentWithChangelogImpl.js.map