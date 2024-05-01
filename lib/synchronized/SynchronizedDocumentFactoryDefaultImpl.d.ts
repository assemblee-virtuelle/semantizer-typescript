import { WithChangelog } from "../changelog/Changelog";
import { Constructed, DocumentWithDestructiveOperationsConstructor } from "../core/Document";
import { DistantDocument } from "./DocumentSynchronized";
type FetchFunction = (uri: string) => Promise<Response>;
export declare class SynchronizedDocumentFactoryDefaultImpl {
    static load<Constructor extends DocumentWithDestructiveOperationsConstructor<any, any>>(uri: string, DocumentConstructor: Constructor, fetchFn?: FetchFunction): Promise<Constructed<Constructor> & WithChangelog & DistantDocument>;
}
export {};
//# sourceMappingURL=SynchronizedDocumentFactoryDefaultImpl.d.ts.map