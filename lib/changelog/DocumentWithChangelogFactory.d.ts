import { Document, DocumentWithDestructiveOperationsConstructor } from "../core/Document";
import { ThingConstructor } from "../core/Thing";
import { WithChangelog } from "./Changelog";
export declare class DocumentWithChangelogFactory {
    static createDocumentWithChangelog<T extends Document<any, any>>(DocumentImpl: DocumentWithDestructiveOperationsConstructor<any, any>, ContainedThingImpl: ThingConstructor<any>, SelfDescribingThingImpl: ThingConstructor<any>): T & WithChangelog;
}
//# sourceMappingURL=DocumentWithChangelogFactory.d.ts.map