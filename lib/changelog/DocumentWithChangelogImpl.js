import { ChangelogImpl } from "./ChangelogImpl.js";
export function DocumentWithChangelogMixin(Base) {
    return class DocumentWithChangelogImpl extends Base {
        constructor(...args) {
            super(...args);
            this._changelog = new ChangelogImpl();
        }
        createStatement(about, property, value, datatype, language) {
            const statement = super.createStatement(about, property, value, datatype, language);
            if (statement) {
                this._changelog.registerAdded(statement);
                return statement;
            }
            return undefined;
        }
        getChangelog() {
            return this._changelog;
        }
    };
}
//# sourceMappingURL=DocumentWithChangelogImpl.js.map