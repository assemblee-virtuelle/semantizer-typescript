import DocumentDecoratedImpl from "../core/Decorated.js";
import { ChangelogImpl } from "./ChangelogImpl.js";
export class DocumentWithChangelogImpl extends DocumentDecoratedImpl {
    constructor(wrapped) {
        super(wrapped);
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
}
export function DocumentWithChangelogMixin(Base) {
    return DocumentWithChangelogImpl;
}
//# sourceMappingURL=DocumentWithChangelogImpl.js.map