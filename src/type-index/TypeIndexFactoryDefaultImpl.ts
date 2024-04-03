import DocumentDefaultImpl from "../core-default/DocumentDefaultImpl";
import { Document } from "../core/Document";
import ThingBase from "../core/Thing";
import DistantDocumentDefaultImpl from "../synchronized/DistantDocumentDefaultImpl";
import LocalDocumentDefaultImpl from "../synchronized/LocalDocumentDefaultImpl";
import { DistantDocument, LocalDocument } from "../synchronized/SynchronizedDocument";
import { TypeIndex, ReadonlyTypeIndex } from "./TypeIndex";
import TypeIndexDefaultImpl, { TypeIndexMixin } from "./TypeIndexMixin";
import TypeIndexRegistration from "./TypeIndexRegistration";

export class TypeIndexFactoryDefaultImpl {

    public create(document?: Document): TypeIndex & LocalDocument {
        const LocalTypeIndex = TypeIndexMixin(LocalDocumentDefaultImpl);
        return new LocalTypeIndex(document!);
    }

    public load(document?: Document): ReadonlyTypeIndex & DistantDocument<TypeIndex> {
        const DistantTypeIndex = TypeIndexMixin(DistantDocumentDefaultImpl<TypeIndexRegistration, ThingBase, TypeIndex>);
        return new DistantTypeIndex(new DocumentDefaultImpl());
    }
}

export default TypeIndexFactoryDefaultImpl;