import { Document, DocumentBase, DocumentReadonly } from "../core/Document";
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

type TypeIndexBase = DocumentBase<TypeIndexRegistration, TypeIndexSelfDescribingThing> &
    WithReadOperations<TypeIndexRegistration> & 
    WithWriteOperations<TypeIndexRegistration>;

type TypeIndexBaseReadonly = DocumentBase<TypeIndexRegistrationReadonly, TypeIndexSelfDescribingThingReadonly> &
    WithReadOperations<TypeIndexRegistrationReadonly>;

export type TypeIndex = Document<TypeIndexBase, TypeIndexReadonly>;

export type TypeIndexReadonly = DocumentReadonly<TypeIndexBaseReadonly, TypeIndexBase>

//export type TypeIndexDocument = TypeIndex<TypeIndexRegistration, TypeIndexSelfDescribingThing, TypeIndexRegistrationReadonly, TypeIndexSelfDescribingThingReadonly>;
//export type TypeIndexDocumentReadonly = TypeIndexReadonly<TypeIndexRegistrationReadonly, TypeIndexSelfDescribingThingReadonly, TypeIndexRegistration, TypeIndexSelfDescribingThing>;
export interface TypeIndexSelfDescribingThing extends Thing<Statement<TypeIndexSelfDescribingThing>, TypeIndex> {}
export interface TypeIndexSelfDescribingThingReadonly extends ThingReadonly<StatementReadonly<TypeIndexSelfDescribingThingReadonly>, TypeIndexReadonly> {}