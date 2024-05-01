import { DocumentWithChangelogMixin } from "./DocumentWithChangelogImpl";
export class DocumentWithChangelogFactory {
    static createDocumentWithChangelog(DocumentImpl, ContainedThingImpl, SelfDescribingThingImpl) {
        const DocumentWithChangelog = DocumentWithChangelogMixin(DocumentImpl);
        return new DocumentWithChangelog(ContainedThingImpl, SelfDescribingThingImpl); // as T & WithChangelog;
    }
}
//# sourceMappingURL=DocumentWithChangelogFactory.js.map