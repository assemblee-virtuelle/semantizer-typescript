import { DistantDocument, LocalDocument } from "../synchronized/SynchronizedDocument";
import { TypeIndex, ReadonlyTypeIndex } from "../type-index/TypeIndex";

export type DistantTypeIndex = ReadonlyTypeIndex & DistantDocument<TypeIndex>;
export type LocalTypeIndex = TypeIndex & LocalDocument;