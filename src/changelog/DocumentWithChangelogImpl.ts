import DocumentDecoratedImpl from "../core/Decorated.js";
import { DocumentWritable, DocumentWritableConstructor, DocumentWritableDecoratedConstructor, Statement } from "../core/Document";
import { Changelog, WithChangelog } from "./Changelog";
import { ChangelogImpl } from "./ChangelogImpl.js";

export class DocumentWithChangelogImpl<
    ContainedStatement extends Statement = Statement,
    SelfDescribingStatement extends Statement = Statement
> extends DocumentDecoratedImpl<ContainedStatement, SelfDescribingStatement> 
implements WithChangelog {

    private _changelog: ChangelogImpl;

    public constructor(wrapped: DocumentWritable<ContainedStatement, SelfDescribingStatement>) { 
        super(wrapped);
        this._changelog = new ChangelogImpl();
    }

    public createStatement(about: string, value: string): ThisType<this> {
        super.createStatement(about, value);
        //this._changelog.registerAdded()
        return this;
    }

    public getChangelog(): Changelog {
        return this._changelog;
    }

}

export function DocumentWithChangelogMixin<TBase extends DocumentWritableConstructor<any, any>>(Base: TBase) {
    return DocumentWithChangelogImpl;
}