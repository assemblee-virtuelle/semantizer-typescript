import { ReadonlyDocumentDefaultImpl } from "../core-default/DocumentDefaultImpl";
import { Document } from "../core/Document";
import Thing, { ReadonlyThing } from "../core/Thing";
import DistantDocumentDefaultImpl from "../synchronized/DistantDocumentDefaultImpl";
import LocalDocumentDefaultImpl from "../synchronized/LocalDocumentDefaultImpl";
import { DistantDocument, LocalDocument } from "../synchronized/SynchronizedDocument";
import { ReadonlyTypeIndex, TypeIndex } from "./TypeIndex";
import { ReadonlyTypeIndexMixin, TypeIndexMixin } from "./TypeIndexMixin";
import TypeIndexRegistration, { ReadonlyTypeIndexRegistration } from "./TypeIndexRegistration";

export class TypeIndexFactoryDefaultImpl {

    public create(document?: Document): TypeIndex & LocalDocument {
        const LocalTypeIndex = TypeIndexMixin(LocalDocumentDefaultImpl);
        return new LocalTypeIndex(document!);
    }

    public load(document?: Document): ReadonlyTypeIndex & DistantDocument<TypeIndex> {
        const DistantTypeIndex = ReadonlyTypeIndexMixin(DistantDocumentDefaultImpl<TypeIndexRegistration, Thing, ReadonlyTypeIndexRegistration, ReadonlyThing, TypeIndex>);
        return new DistantTypeIndex(new ReadonlyDocumentDefaultImpl());
    }
}

export default TypeIndexFactoryDefaultImpl;