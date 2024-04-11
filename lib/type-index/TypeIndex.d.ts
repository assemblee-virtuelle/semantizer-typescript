import { Document } from "../core/Document";
import { Statement } from "../core/Statement";
import { ThingBase } from "../core/Thing";
import { TypeIndexRegistration, TypeIndexSelfDescribing } from "./TypeIndexRegistration";
export interface WithReadOperations<ContainedThing extends ThingBase<any>> {
    forEachOfClass(forClass: string, callbackfn: (value: ContainedThing, index?: number, array?: ContainedThing[]) => void, thisArg?: any): void;
}
export interface WithWriteOperations<ContainedThing extends ThingBase<any>> {
    createRegistration(forClass?: string, nameHintOrUri?: string): ContainedThing;
}
export type TypeIndex<ContainedThing extends ThingBase<Statement<any>>, SelfDescribingThing extends ThingBase<Statement<any>>> = Document<ContainedThing, SelfDescribingThing> & WithReadOperations<ContainedThing> & WithWriteOperations<ContainedThing>;
export type TypeIndexRegistrationThing = TypeIndexRegistration<TypeIndexDocument>;
export type TypeIndexSelfDescribingThing = TypeIndexSelfDescribing<TypeIndexDocument>;
export type TypeIndexDocument = TypeIndex<TypeIndexRegistrationThing, TypeIndexSelfDescribingThing>;
//# sourceMappingURL=TypeIndex.d.ts.map