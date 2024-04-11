import { Document } from "../core/Document";
import { Statement } from "../core/Statement";
import { ThingBase } from "../core/Thing";
import { TypeIndexRegistration, TypeIndexSelfDescribing } from "./TypeIndexRegistration";

export interface WithReadOperations<
    ContainedThing extends ThingBase<any>
> {
    forEachOfClass(forClass: string, callbackfn: (value: ContainedThing, index?: number, array?: ContainedThing[]) => void, thisArg?: any): void;
}

export interface WithWriteOperations<
    ContainedThing extends ThingBase<any>
> {
    createRegistration(forClass?: string, nameHintOrUri?: string): ContainedThing; //<ContainedStatement>;
}

export type TypeIndex<
    ContainedThing extends ThingBase<Statement>,
    SelfDescribingThing extends ThingBase<Statement>
> = Document<ContainedThing, SelfDescribingThing> & 
    WithReadOperations<ContainedThing> & 
    WithWriteOperations<ContainedThing>;

export type TypeIndexRegistrationThing = TypeIndexRegistration<TypeIndexDocument>;
export type TypeIndexSelfDescribingThing = TypeIndexSelfDescribing<TypeIndexDocument>;
export type TypeIndexDocument = TypeIndex<TypeIndexRegistrationThing, TypeIndexSelfDescribingThing>;

//  & 
//     WithFactory<Document<ContainedThing, SelfDescribingThing>> & // Should be this
//     WithReadOperations<Document<ContainedThing, SelfDescribingThing>> &
//     WithWriteOperations<Document<ContainedThing, SelfDescribingThing>> &
//     WithCreateOperations<Document<ContainedThing, SelfDescribingThing>> &
//     WithCopyOperations & 
//     WithCopyWritableOperations;

/*export type TypeIndexReadonly<
    ContainedThing extends ThingReadonly<any> = ThingReadonly<any>,
    SelfDescribingThing extends ThingReadonly<any> = ThingReadonly<any>
> = DocumentReadonly<ContainedThing, SelfDescribingThing> & 
    WithReadOperations<ContainedThing>;*/

/*
= DocumentReadonly<TypeIndexRegistrationReadonly, ThingReadonly> & 
    WithReadOperations<TypeIndexRegistrationReadonly<StatementReadonly>>;
    */