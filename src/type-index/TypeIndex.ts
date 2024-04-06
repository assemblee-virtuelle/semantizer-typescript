import { Document, DocumentReadonly } from "../core/Document";
import ThingBase, { ThingReadonly, Thing } from "../core/Thing";
import TypeIndexRegistration, { ReadonlyTypeIndexRegistration } from "./TypeIndexRegistration";

export interface TypeIndexBase {}

export interface WithReadOperations {
    forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index: number, array: TypeIndexRegistration[]) => void, thisArg?: any): void;
}

export interface WithWriteOperations {
    createRegistration(forClass?: string, nameHintOrUri?: string): TypeIndexRegistration;
}

export type ReadonlyTypeIndex = TypeIndexBase & DocumentReadonly<ReadonlyTypeIndexRegistration, ThingReadonly> & WithReadOperations;
export type TypeIndex = TypeIndexBase & Document<TypeIndexRegistration, Thing> & WithReadOperations & WithWriteOperations;
export default TypeIndex;