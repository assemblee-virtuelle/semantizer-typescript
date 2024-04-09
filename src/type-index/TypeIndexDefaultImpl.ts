import { DocumentDefaultImpl } from "../core-default/DocumentDefaultImpl";
import { Constructor, DocumentBase } from "../core/Document";
import DocumentDecorated from "../core/DocumentDecorated";
import { Statement, StatementReadonly } from "../core/Statement";
import { Thing, ThingBase, ThingReadonly } from "../core/Thing";
import { TypeIndexReadonly, WithReadOperations, WithWriteOperations } from "./TypeIndex";
import { TypeIndexRegistration, TypeIndexRegistrationReadonly } from "./TypeIndexRegistration";

export class TypeIndexDefaultImplReadOrWrite<
    ContainedThing extends TypeIndexRegistration<any> | TypeIndexRegistrationReadonly<any>,
    SelfDescribingThing extends ThingBase<any> | ThingReadonly<any>
>
extends DocumentDecorated<ContainedThing, SelfDescribingThing> 
implements WithReadOperations<ContainedThing> {
    
    public forEachOfClass(forClass: string, callbackfn: (value: ContainedThing, index?: number, array?: ContainedThing[]) => void, thisArg?: any): void {
        this.forEach((r, i, a) => r.isForClass(forClass)? callbackfn(r, i, a): null, thisArg);
    }

}

export class TypeIndexDefaultImpl<
    ContainedThing extends TypeIndexRegistration<any> = TypeIndexRegistration<Statement>, 
    SelfDescribingThing extends ThingBase<any> = Thing<Statement>
>
extends TypeIndexDefaultImplReadOrWrite<ContainedThing, SelfDescribingThing> 
implements WithWriteOperations {
    
    public createRegistration(forClass?: string, nameHintOrUri?: string | undefined): ContainedThing {
        const registration = this.createThingWithUri(nameHintOrUri);
        if (forClass)
            registration.addForClass(forClass);
        return registration;
    }

}

export function TypeIndexDefaultMixin<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase) {
    return TypeIndexDefaultImpl<TypeIndexRegistration<Statement>, Thing<Statement>>;
}

export function TypeIndexDefaultMixinReadonly<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase) {
    return TypeIndexDefaultImplReadOrWrite<TypeIndexRegistrationReadonly<StatementReadonly>, ThingReadonly<StatementReadonly>>;
}


const typeIndexDefaultInstance = new TypeIndexDefaultImpl(new DocumentDefaultImpl<TypeIndexRegistration, Thing>());
typeIndexDefaultInstance.forEachOfClass("", (t => {}));

const typeIndexDefaultInstanceReadonly = new TypeIndexDefaultImplReadOrWrite(new DocumentDefaultImpl<TypeIndexRegistrationReadonly, ThingReadonly>());
typeIndexDefaultInstance.deleteContext();
typeIndexDefaultInstanceReadonly.forEachOfClass("", (t => {}));

const got = typeIndexDefaultInstance.get("")
got?.removeForClass("");

const gotReadonly = typeIndexDefaultInstanceReadonly.get("");
gotReadonly?.getForClass();

const WithRead = TypeIndexDefaultMixin(DocumentDefaultImpl<TypeIndexRegistration, Thing>);
const mixWithRead = new WithRead(new DocumentDefaultImpl<TypeIndexRegistration, Thing>());
mixWithRead.deleteContext();

const ReadOnly = TypeIndexDefaultMixinReadonly(DocumentDefaultImpl<TypeIndexRegistrationReadonly, ThingReadonly>);

// TODO: a contraindre dans la factory
const mixReadOnly = new ReadOnly(new DocumentDefaultImpl<TypeIndexRegistrationReadonly, Thing>()) as TypeIndexReadonly;
// @ts-expect-error
mixReadOnly.deleteContext();
