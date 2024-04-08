import { Document, DocumentReadonly } from "../core/Document";
import { Statement, StatementBase, StatementReadonly } from "../core/Statement";
import { Thing, ThingBase, ThingReadonly } from "../core/Thing";
import { TypeIndexRegistration, TypeIndexRegistrationReadonly } from "./TypeIndexRegistration";

// export interface TypeIndexBase extends DocumentBase<TypeIndexRegistration, Thing> {}

// export interface TypeIndexBaseReadonly extends DocumentBaseReadonly<TypeIndexRegistrationReadonly, ThingReadonly> {}

export interface WithReadOperations<
    ContainedRegistration extends ThingBase<any> = ThingBase
> {
    forEachOfClass(forClass: string, callbackfn: (value: ContainedRegistration, index: number, array: ContainedRegistration[]) => void, thisArg?: any): void;
}

export interface WithWriteOperations {
    createRegistration(forClass?: string, nameHintOrUri?: string): TypeIndexRegistration;
}

export type TypeIndex<
    ContainedStatement extends StatementBase = StatementBase
> = Document<TypeIndexRegistration<ContainedStatement>, Thing<ContainedStatement>> & 
    WithReadOperations<TypeIndexRegistration<Statement>> & 
    WithWriteOperations;

export type TypeIndexReadonly = DocumentReadonly<TypeIndexRegistrationReadonly, ThingReadonly> & 
    WithReadOperations<TypeIndexRegistrationReadonly<StatementReadonly>>;