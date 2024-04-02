import { DistantDocument, LocalDocument } from "../synchronized/SynchronizedDocument";
import { TypeIndexWithReadAndWriteOperations, TypeIndexWithReadOperations } from "../type-index/TypeIndex";

export type DistantTypeIndex = TypeIndexWithReadOperations & DistantDocument<TypeIndexWithReadAndWriteOperations>;
export type LocalTypeIndex = TypeIndexWithReadAndWriteOperations & LocalDocument;