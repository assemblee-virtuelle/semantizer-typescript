import DocumentDefaultImpl, { ReadonlyDocumentDefaultImpl } from "../core-default/DocumentDefaultImpl";
import TypeIndexMixin, { ReadonlyTypeIndexMixin } from "../type-index/TypeIndexMixin";
import { LocalDocumentDefaultImpl, DistantDocumentDefaultImpl } from "./SynchronizedDocumentDefaultImpl";
export class SynchronizedDocumentFactoryDefaultImpl {
    createWithMixin(Mixin) {
        const MixedInLocalDocument = Mixin(LocalDocumentDefaultImpl);
        return new MixedInLocalDocument(new DocumentDefaultImpl());
    }
    create() {
        return new LocalDocumentDefaultImpl(new DocumentDefaultImpl());
    }
    load() {
        return new DistantDocumentDefaultImpl(new ReadonlyDocumentDefaultImpl());
    }
    loadWithMixin(Mixin) {
        const MixedInDistantDocument = Mixin((DistantDocumentDefaultImpl));
        return new MixedInDistantDocument(new ReadonlyDocumentDefaultImpl());
    }
}
const syncFactory = new SynchronizedDocumentFactoryDefaultImpl();
const localDocument = syncFactory.create();
const distantDocument = syncFactory.load();
const localTypeIndex = syncFactory.createWithMixin(TypeIndexMixin);
const distantTypeIndex = syncFactory.loadWithMixin(ReadonlyTypeIndexMixin);
distantTypeIndex.toLocalCopy();
localTypeIndex.createRegistration("forClass");
//# sourceMappingURL=SynchronizedDocumentFactoryDefaultImpl.js.map