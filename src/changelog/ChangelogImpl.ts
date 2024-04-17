import DocumentDecoratedImpl from "../core/Decorated";
import { ContainedThingOf, Document, DocumentBase } from "../core/Document";
import { StatementReadonly } from "../core/Statement";
import { ThingReadonly } from "../core/Thing";

// TODO: encapsulates collections in Document, expose only readonly.
export class ChangelogImpl<
    DocumentType extends Document<any, any>,
    DocumentTypeReadonly extends DocumentBase<ThingReadonly<StatementReadonly<any>, any>, ThingReadonly<StatementReadonly<any>, any>>,
    // ChangelogImpl
> extends DocumentDecoratedImpl<DocumentType, DocumentTypeReadonly> {

    // private changelog: ChangelogImpl;

    public add(thing: ContainedThingOf<DocumentType>): this {
        const added = super.add(thing);
        // this.changelog.add(thing);
        return added as this;
    }

}