import { Document, DocumentReadonly } from "../core/Document";
import { Statement, StatementReadonly } from "../core/Statement";
import { Thing, ThingBase, ThingReadonly } from "../core/Thing";
import { TypeIndexRegistration, TypeIndexRegistrationReadonly } from "./TypeIndexRegistration";

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

// Don't know if the template arguments might be useful in some cases, 
// so I let them for now.
export type TypeIndex<
    ContainedThing extends Thing<Statement<any>, any>,
    SelfDescribingThing extends Thing<Statement<any>, any>,
    ContainedThingReadonly extends ThingReadonly<any, any>,
    SelfDescribingThingReadonly extends ThingReadonly<any, any>,
> = Document<ContainedThing, SelfDescribingThing, ContainedThingReadonly, SelfDescribingThingReadonly> & 
    WithReadOperations<ContainedThing> & 
    WithWriteOperations<ContainedThing>;

// Don't know if the template arguments might be useful in some cases, 
// so I let them for now.
export type TypeIndexReadonly<
    ContainedThing extends ThingReadonly<any, any>, 
    SelfDescribingThing extends ThingReadonly<any, any>, 
    ContainedThingWritable extends Thing<Statement<any>, any>,
    SelfDescribingThingWritable extends Thing<Statement<any>, any>,
> = DocumentReadonly<ContainedThing, SelfDescribingThing, ContainedThingWritable, SelfDescribingThingWritable> & 
    WithReadOperations<ContainedThing>;

export type TypeIndexDocument = TypeIndex<TypeIndexRegistration, TypeIndexSelfDescribingThing, TypeIndexRegistrationReadonly, TypeIndexSelfDescribingThingReadonly>;
export type TypeIndexDocumentReadonly = TypeIndexReadonly<TypeIndexRegistrationReadonly, TypeIndexSelfDescribingThingReadonly, TypeIndexRegistration, TypeIndexSelfDescribingThing>;
export interface TypeIndexSelfDescribingThing extends Thing<Statement<TypeIndexSelfDescribingThing>, TypeIndexDocument> {}
export interface TypeIndexSelfDescribingThingReadonly extends ThingReadonly<StatementReadonly<TypeIndexSelfDescribingThingReadonly>, TypeIndexDocumentReadonly> {}