import { Document, DocumentBase, DocumentReadonly } from "../core/Document";
import { StatementBase } from "../core/Statement";
import { ThingBase, ThingReadonly } from "../core/Thing";
import { TypeIndexRegistration } from "./TypeIndexRegistration";

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
    ContainedThing extends ThingBase<any>,
    SelfDescribingThing extends ThingBase<any>
> = Document<ContainedThing, SelfDescribingThing> & 
    WithReadOperations<ContainedThing> & 
    WithWriteOperations<ContainedThing>;

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