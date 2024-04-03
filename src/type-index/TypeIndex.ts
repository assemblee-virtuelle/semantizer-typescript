import { Document, ReadonlyDocument } from "../core/Document";
import ThingBase from "../core/Thing";
import TypeIndexRegistration from "./TypeIndexRegistration";

export interface TypeIndexBase {}

export interface WithReadOperations {
    forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index: number, array: TypeIndexRegistration[]) => void, thisArg?: any): void;
}

export interface WithWriteOperations {
    createRegistration(forClass?: string, nameHintOrUri?: string): TypeIndexRegistration;
}

export type ReadonlyTypeIndex = TypeIndexBase & ReadonlyDocument<TypeIndexRegistration, ThingBase> & WithReadOperations;

export type TypeIndex = TypeIndexBase & Document<TypeIndexRegistration, ThingBase> & WithReadOperations & WithWriteOperations;

export default TypeIndex;