import { DocumentWithNonDestructiveOperations } from "../core/Document";
import { Statement } from "../core/Statement";
import { Changelog } from "./Changelog";
export declare class ChangelogImpl<StatementType extends Statement = Statement> implements Changelog<StatementType> {
    private _added;
    private _updated;
    private _deleted;
    constructor();
    applyTo<DocumentType extends DocumentWithNonDestructiveOperations<any, any>>(document: DocumentType): DocumentType;
    getAdded(): StatementType[];
    getUpdated(): StatementType[];
    getDeleted(): StatementType[];
    registerAdded(statement: StatementType): Changelog<StatementType>;
    registerUpdated(statement: StatementType): Changelog<StatementType>;
    registerDeleted(statement: StatementType): Changelog<StatementType>;
}
//# sourceMappingURL=ChangelogImpl.d.ts.map