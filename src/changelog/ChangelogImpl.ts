import { Statement } from "../core/Document";
import { Changelog, ChangelogWritable } from "./Changelog";

export class ChangelogImpl implements ChangelogWritable {

    private _added: Statement[];
    private _updated: Statement[];
    private _deleted: Statement[];

    constructor() {
        this._added = [];
        this._updated = [];
        this._deleted = [];
    }

    getAdded(): Statement[] {
        return this._added;
    }

    getUpdated(): Statement[] {
        return this._updated;
    }

    getDeleted(): Statement[] {
        return this._deleted;
    }

    registerAdded(statement: Statement): Changelog<Statement> {
        this._added.push(statement);
        return this;
    }

    registerUpdated(statement: Statement): Changelog<Statement> {
        this._updated.push(statement);
        return this;
    }

    registerDeleted(statement: Statement): Changelog<Statement> {
        this._deleted.push(statement);
        return this;
    }

}