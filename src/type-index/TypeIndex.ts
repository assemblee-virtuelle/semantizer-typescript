import { Document, DocumentBase, DocumentDecorated, DocumentReadonly } from "../core/Document";
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

export type TypeIndexBase = DocumentBase<TypeIndexRegistration, TypeIndexSelfDescribingThing>;

export type TypeIndexBaseReadonly = DocumentBase<TypeIndexRegistrationReadonly, TypeIndexSelfDescribingThingReadonly>;


export type TypeIndex = DocumentDecorated<TypeIndex2, TypeIndexReadonly> &
    WithReadOperations<TypeIndexRegistration> & 
    WithWriteOperations<TypeIndexRegistration>;

export type TypeIndex2 = Document<TypeIndexBase, TypeIndexBaseReadonly> &
    WithReadOperations<TypeIndexRegistration> & 
    WithWriteOperations<TypeIndexRegistration>;

export type TypeIndexReadonly = DocumentReadonly<TypeIndexBaseReadonly, TypeIndexBase> & 
    WithReadOperations<TypeIndexRegistrationReadonly>;

export interface TypeIndexSelfDescribingThing extends Thing<Statement<TypeIndexSelfDescribingThing>, TypeIndex> {}
export interface TypeIndexSelfDescribingThingReadonly extends ThingReadonly<StatementReadonly<TypeIndexSelfDescribingThingReadonly>, TypeIndexReadonly> {}