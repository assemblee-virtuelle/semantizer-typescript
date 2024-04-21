import DocumentDecoratedImpl from "../core/Decorated.js";
import { DocumentWritable, DocumentWritableConstructor, Statement } from "../core/Document";
import { Changelog, WithChangelog } from "./Changelog";
export declare class DocumentWithChangelogImpl<ContainedStatement extends Statement = Statement, SelfDescribingStatement extends Statement = Statement> extends DocumentDecoratedImpl<ContainedStatement, SelfDescribingStatement> implements WithChangelog {
    private _changelog;
    constructor(wrapped: DocumentWritable<ContainedStatement, SelfDescribingStatement>);
    createStatement(about: string, value: string): ThisType<this>;
    getChangelog(): Changelog;
}
export declare function DocumentWithChangelogMixin<TBase extends DocumentWritableConstructor<any, any>>(Base: TBase): typeof DocumentWithChangelogImpl;
//# sourceMappingURL=DocumentWithChangelogImpl.d.ts.map