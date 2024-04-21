import { Statement } from "../core/Document";
import { Changelog, ChangelogWritable } from "./Changelog";
export declare class ChangelogImpl implements ChangelogWritable {
    private _added;
    private _updated;
    private _deleted;
    constructor();
    getAdded(): Statement[];
    getUpdated(): Statement[];
    getDeleted(): Statement[];
    registerAdded(statement: Statement): Changelog<Statement>;
    registerUpdated(statement: Statement): Changelog<Statement>;
    registerDeleted(statement: Statement): Changelog<Statement>;
}
//# sourceMappingURL=ChangelogImpl.d.ts.map