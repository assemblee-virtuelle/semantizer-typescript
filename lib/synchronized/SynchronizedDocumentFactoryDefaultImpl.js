import DocumentImpl, { DocumentReadonlyDefaultImpl } from "../core-default/DocumentImpl";
import TypeIndexMixin, { ReadonlyTypeIndexMixin } from "../type-index/impl";
import { LocalDocumentDefaultImpl, DistantDocumentDefaultImpl } from "./DocumentSynchronizedImpl";
export class SynchronizedDocumentFactoryDefaultImpl {
    createWithMixin(Mixin) {
        const MixedInLocalDocument = Mixin(LocalDocumentDefaultImpl);
        return new MixedInLocalDocument(new DocumentImpl());
    }
    create() {
        return new LocalDocumentDefaultImpl(new DocumentImpl());
    }
    load() {
        return new DistantDocumentDefaultImpl(new DocumentReadonlyDefaultImpl());
    }
    loadWithMixin(Mixin) {
        const MixedInDistantDocument = Mixin((DistantDocumentDefaultImpl));
        return new MixedInDistantDocument(new DocumentReadonlyDefaultImpl());
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