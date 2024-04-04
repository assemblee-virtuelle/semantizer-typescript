import { ReadonlyDocumentDefaultImpl } from "../core-default/DocumentDefaultImpl";
import DistantDocumentDefaultImpl from "../synchronized/DistantDocumentDefaultImpl";
import LocalDocumentDefaultImpl from "../synchronized/LocalDocumentDefaultImpl";
import { ReadonlyTypeIndexMixin, TypeIndexMixin } from "./TypeIndexMixin";
export class TypeIndexFactoryDefaultImpl {
    create(document) {
        const LocalTypeIndex = TypeIndexMixin(LocalDocumentDefaultImpl);
        return new LocalTypeIndex(document);
    }
    load(document) {
        const DistantTypeIndex = ReadonlyTypeIndexMixin((DistantDocumentDefaultImpl));
        return new DistantTypeIndex(new ReadonlyDocumentDefaultImpl());
    }
}
export default TypeIndexFactoryDefaultImpl;
//# sourceMappingURL=TypeIndexFactoryDefaultImpl.js.map