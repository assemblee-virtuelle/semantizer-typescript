import { DocumentBase, DocumentBaseReadonly, Document, DocumentReadonly } from "../core/Document";
import ThingBase, { ThingReadonly, Thing } from "../core/Thing";
import TypeIndexRegistration, { TypeIndexRegistrationReadonly } from "./TypeIndexRegistration";

export interface TypeIndexBase extends DocumentBase<TypeIndexRegistration, Thing> {}

export interface TypeIndexBaseReadonly extends DocumentBaseReadonly<TypeIndexRegistrationReadonly, ThingReadonly> {}

export interface WithReadOperations {
    forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index: number, array: TypeIndexRegistration[]) => void, thisArg?: any): void;
}

export interface WithWriteOperations {
    createRegistration(forClass?: string, nameHintOrUri?: string): TypeIndexRegistration;
}

export type TypeIndexReadonly = TypeIndexBaseReadonly & DocumentReadonly<TypeIndexReadonly> & WithReadOperations;
export type TypeIndex = TypeIndexBase & Document<TypeIndex> & WithReadOperations & WithWriteOperations;
export default TypeIndex;