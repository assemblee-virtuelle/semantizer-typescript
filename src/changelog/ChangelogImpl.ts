import DocumentDecoratedImpl from "../core/Decorated";
import { ContainedThingOf, DocumentWritable } from "../core/Document";

// TODO: encapsulates collections in Document, expose only readonly.
export class ChangelogImpl<
    DocumentType extends DocumentWritable<any, any>,
    //DocumentTypeReadonly extends DocumentBase<ThingReadonly<StatementReadonly<any>, any>, ThingReadonly<StatementReadonly<any>, any>>,
    // ChangelogImpl
> extends DocumentDecoratedImpl<DocumentType> {

    // private changelog: ChangelogImpl;

    public add(thing: ContainedThingOf<DocumentType>): this {
        const added = super.add(thing);
        // this.changelog.add(thing);
        return added as this;
    }

}