import { Document } from "../core/Document";
import { ThingBase } from "../core/Thing";
import { TypeIndexRegistration } from "./TypeIndexRegistration";
export interface WithReadOperations<ContainedThing extends ThingBase<any>> {
    forEachOfClass(forClass: string, callbackfn: (value: ContainedThing, index?: number, array?: ContainedThing[]) => void, thisArg?: any): void;
}
export interface WithWriteOperations<ContainedThing extends ThingBase<any>> {
    createRegistration(forClass?: string, nameHintOrUri?: string): ContainedThing;
}
export type TypeIndex<ContainedThing extends ThingBase<any>, SelfDescribingThing extends ThingBase<any>> = Document<ContainedThing, SelfDescribingThing> & WithReadOperations<ContainedThing> & WithWriteOperations<ContainedThing>;
export type TypeIndexRegistrationThing = TypeIndexRegistration<TypeIndexDocument>;
export type TypeIndexDocument = TypeIndex<TypeIndexRegistrationThing, TypeIndexRegistrationThing>;
//# sourceMappingURL=TypeIndex.d.ts.map