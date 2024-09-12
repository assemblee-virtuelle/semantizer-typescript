import { Document, DocumentWithDestructiveOperationsConstructor } from "../core/Document";
import { StatementConstructor } from "../core/Statement";
import { ThingConstructor } from "../core/Thing";
import { WithChangelog } from "./Changelog";
import { DocumentWithChangelogMixin } from "./DocumentWithChangelogImpl";

export class DocumentWithChangelogFactory {

    public static createDocumentWithChangelog<T extends Document<any, any>>(DocumentImpl: DocumentWithDestructiveOperationsConstructor<any, any>, ContainedThingImpl: ThingConstructor<any>, SelfDescribingThingImpl: ThingConstructor<any>): T & WithChangelog {
        const DocumentWithChangelog = DocumentWithChangelogMixin(DocumentImpl);
        return new DocumentWithChangelog(ContainedThingImpl, SelfDescribingThingImpl);// as T & WithChangelog;
    }

}