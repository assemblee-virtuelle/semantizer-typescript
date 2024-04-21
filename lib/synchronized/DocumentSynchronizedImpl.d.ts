import { Changelog, WithChangelog } from "../changelog/Changelog.js";
import DocumentDecoratedImpl from "../core/Decorated.js";
import { DocumentWritable, Statement } from "../core/Document.js";
import { DistantDocument, LocalDocument } from "./DocumentSynchronized.js";
export declare class DocumentLocalImpl<ContainedStatement extends Statement = Statement, SelfDescribingStatement extends Statement = Statement> extends DocumentDecoratedImpl<ContainedStatement, SelfDescribingStatement> implements LocalDocument, WithChangelog {
    private _documentWithChangelog;
    constructor(documentWithChangelog: DocumentWritable<ContainedStatement, SelfDescribingStatement> & WithChangelog);
    getChangelog(): Changelog<Statement>;
    saveUpdate(): Promise<void>;
    saveNew(uri: string): Promise<void>;
    saveOverwrite(): Promise<void>;
    isLocal(): boolean;
    isDistant(): boolean;
    getDistantUri(): string | undefined;
    getDistantUriAll(): string[];
}
export declare class DocumentDistantImpl<ContainedStatement extends Statement = Statement, SelfDescribingStatement extends Statement = Statement> extends DocumentDecoratedImpl<ContainedStatement, SelfDescribingStatement> implements DistantDocument {
    isLocal(): boolean;
    isDistant(): boolean;
    toLocalCopy(): LocalDocument;
    getDistantUri(): string | undefined;
    getDistantUriAll(): string[];
    save(): void;
}
export type DocumentLocalConstructor<ContainedStatement extends Statement = Statement, SelfDescribingStatement extends Statement = Statement> = new (documentWithChangelog: DocumentWritable<ContainedStatement, SelfDescribingStatement> & WithChangelog) => DocumentWritable<ContainedStatement, SelfDescribingStatement>;
export declare function DocumentLocalMixin<TBase extends DocumentLocalConstructor<any, any>>(Base: TBase): typeof DocumentLocalImpl;
//# sourceMappingURL=DocumentSynchronizedImpl.d.ts.map