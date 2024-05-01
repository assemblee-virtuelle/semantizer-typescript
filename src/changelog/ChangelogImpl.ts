import { DocumentWithNonDestructiveOperations } from "../core/Document";
import { Statement } from "../core/Statement";
import { Changelog } from "./Changelog";

export class ChangelogImpl<
    StatementType extends Statement = Statement,
> implements Changelog<StatementType> {

    private _added: StatementType[];
    private _updated: StatementType[];
    private _deleted: StatementType[];

    constructor() {
        this._added = [];
        this._updated = [];
        this._deleted = [];
    }

    public applyTo<DocumentType extends DocumentWithNonDestructiveOperations<any, any>>(document: DocumentType): DocumentType {
        throw new Error("Method not implemented.");
    }

    public getAdded(): StatementType[] {
        return this._added;
    }

    public getUpdated(): StatementType[] {
        return this._updated;
    }

    public getDeleted(): StatementType[] {
        return this._deleted;
    }

    public registerAdded(statement: StatementType): Changelog<StatementType> {
        this._added.push(statement);
        return this;
    }

    public registerUpdated(statement: StatementType): Changelog<StatementType> {
        this._updated.push(statement);
        return this;
    }

    public registerDeleted(statement: StatementType): Changelog<StatementType> {
        this._deleted.push(statement);
        return this;
    }

}