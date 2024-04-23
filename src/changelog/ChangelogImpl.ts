import { Statement } from "../core/Statement";
import { Changelog, ChangelogWritable } from "./Changelog";

export class ChangelogImpl<
    StatementType extends Statement = Statement,
> implements ChangelogWritable<StatementType> {

    private _added: StatementType[];
    private _updated: StatementType[];
    private _deleted: StatementType[];

    constructor() {
        this._added = [];
        this._updated = [];
        this._deleted = [];
    }

    getAdded(): StatementType[] {
        return this._added;
    }

    getUpdated(): StatementType[] {
        return this._updated;
    }

    getDeleted(): StatementType[] {
        return this._deleted;
    }

    registerAdded(statement: StatementType): Changelog<StatementType> {
        this._added.push(statement);
        return this;
    }

    registerUpdated(statement: StatementType): Changelog<StatementType> {
        this._updated.push(statement);
        return this;
    }

    registerDeleted(statement: StatementType): Changelog<StatementType> {
        this._deleted.push(statement);
        return this;
    }

}