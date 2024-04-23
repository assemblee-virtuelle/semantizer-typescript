import { Statement } from "../core/Statement";
import { Changelog, ChangelogWritable } from "./Changelog";
export declare class ChangelogImpl<StatementType extends Statement = Statement> implements ChangelogWritable<StatementType> {
    private _added;
    private _updated;
    private _deleted;
    constructor();
    getAdded(): StatementType[];
    getUpdated(): StatementType[];
    getDeleted(): StatementType[];
    registerAdded(statement: StatementType): Changelog<StatementType>;
    registerUpdated(statement: StatementType): Changelog<StatementType>;
    registerDeleted(statement: StatementType): Changelog<StatementType>;
}
//# sourceMappingURL=ChangelogImpl.d.ts.map