export class ChangelogImpl {
    constructor() {
        this._added = [];
        this._updated = [];
        this._deleted = [];
    }
    getAdded() {
        return this._added;
    }
    getUpdated() {
        return this._updated;
    }
    getDeleted() {
        return this._deleted;
    }
    registerAdded(statement) {
        this._added.push(statement);
        return this;
    }
    registerUpdated(statement) {
        this._updated.push(statement);
        return this;
    }
    registerDeleted(statement) {
        this._deleted.push(statement);
        return this;
    }
}
//# sourceMappingURL=ChangelogImpl.js.map