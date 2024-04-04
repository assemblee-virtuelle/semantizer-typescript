import DocumentDefaultImpl from "../core-default/DocumentDefaultImpl";
import { ReadonlyDocumentDefaultImpl } from "../core-default/DocumentDefaultImpl";
import TypeIndexMixin, { ReadonlyTypeIndexMixin } from "../type-index/TypeIndexMixin";
import DistantDocumentDefaultImpl from "./DistantDocumentDefaultImpl";
import LocalDocumentDefaultImpl from "./LocalDocumentDefaultImpl";
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
    /*
    public load(document?: Document): ReadonlyTypeIndex & DistantDocument<TypeIndex> {
        const DistantTypeIndex = ReadonlyTypeIndexMixin(DistantDocumentDefaultImpl<ReadonlyTypeIndexRegistration, ReadonlyThing, TypeIndex>);
        return new DistantTypeIndex(new ReadonlyDocumentDefaultImpl());
    }
    */
    loadWithMixin(Mixin) {
        const MixedInDistantDocument = Mixin((DistantDocumentDefaultImpl));
        return new MixedInDistantDocument(new ReadonlyDocumentDefaultImpl()); // DistantDocument<Type> & ReadonlyType
    }
}
const syncFactory = new SynchronizedDocumentFactoryDefaultImpl();
const localDocument = syncFactory.create();
const distantDocument = syncFactory.load();
const localTypeIndex = syncFactory.createWithMixin(TypeIndexMixin);
const distantTypeIndex = syncFactory.loadWithMixin(ReadonlyTypeIndexMixin);
distantTypeIndex.toLocalCopy();
//# sourceMappingURL=SynchronizedDocumentFactoryDefaultImpl.js.map