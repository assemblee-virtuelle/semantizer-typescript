import { Document } from "../core/Document";
import { DistantDocument, LocalDocument } from "../synchronized/SynchronizedDocument";
import { ReadonlyTypeIndex, TypeIndex } from "./TypeIndex";
export declare class TypeIndexFactoryDefaultImpl {
    create(document?: Document): TypeIndex & LocalDocument;
    load(document?: Document): ReadonlyTypeIndex & DistantDocument<TypeIndex>;
}
export default TypeIndexFactoryDefaultImpl;
//# sourceMappingURL=TypeIndexFactoryDefaultImpl.d.ts.map