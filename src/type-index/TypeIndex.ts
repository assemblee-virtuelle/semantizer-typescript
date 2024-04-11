import { Document, DocumentReadonly } from "../core/Document";
import { Statement } from "../core/Statement";
import { Thing, ThingBase, ThingReadonly } from "../core/Thing";
import { TypeIndexRegistration, TypeIndexRegistrationReadonly, TypeIndexSelfDescribing, TypeIndexSelfDescribingReadonly } from "./TypeIndexRegistration";

export interface WithReadOperations<
    ContainedThing extends ThingBase<any>
> {
    forEachOfClass(forClass: string, callbackfn: (value: ContainedThing, index?: number, array?: ContainedThing[]) => void, thisArg?: any): void;
}

export interface WithWriteOperations<
    ContainedThing extends ThingBase<any>
> {
    createRegistration(forClass?: string, nameHintOrUri?: string): ContainedThing;
}

export type TypeIndex<
    ContainedThing extends Thing<Statement<any>, any>,
    SelfDescribingThing extends Thing<Statement<any>, any>,
    ContainedThingReadonly extends ThingReadonly<any, any>,
    SelfDescribingThingReadonly extends ThingReadonly<any, any>,
> = Document<ContainedThing, SelfDescribingThing, ContainedThingReadonly, SelfDescribingThingReadonly> & 
    WithReadOperations<ContainedThing> & 
    WithWriteOperations<ContainedThing>;

export type TypeIndexReadonly<
    ContainedThing extends ThingReadonly<any, any>, 
    SelfDescribingThing extends ThingReadonly<any, any>, 
    ContainedThingWritable extends Thing<Statement<any>, any>,
    SelfDescribingThingWritable extends Thing<Statement<any>, any>,
> = DocumentReadonly<ContainedThing, SelfDescribingThing, ContainedThingWritable, SelfDescribingThingWritable> & 
    WithReadOperations<ContainedThing>;

export type TypeIndexRegistrationThing = TypeIndexRegistration<TypeIndexDocument>;
export type TypeIndexSelfDescribingThing = TypeIndexSelfDescribing<TypeIndexDocument>;
export type TypeIndexRegistrationThingReadonly = TypeIndexRegistrationReadonly<TypeIndexDocumentReadonly>;
export type TypeIndexSelfDescribingThingReadonly = TypeIndexSelfDescribingReadonly<TypeIndexDocumentReadonly>;
export type TypeIndexDocument = TypeIndex<TypeIndexRegistrationThing, TypeIndexSelfDescribingThing, TypeIndexRegistrationThingReadonly, TypeIndexSelfDescribingThingReadonly>;
export type TypeIndexDocumentReadonly = TypeIndexReadonly<TypeIndexRegistrationThingReadonly, TypeIndexSelfDescribingThingReadonly, TypeIndexRegistrationThing, TypeIndexSelfDescribingThing>;