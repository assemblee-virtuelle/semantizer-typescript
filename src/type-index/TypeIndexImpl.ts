import { DocumentImpl } from "../core-default/DocumentImpl";
import { Constructor, DocumentBase } from "../core/Document";
import DocumentDecorated from "../core/DocumentDecorated";
import { Statement, StatementReadonly } from "../core/Statement";
import { Thing, ThingBase, ThingReadonly } from "../core/Thing";
import { TypeIndexReadonly, WithReadOperations, WithWriteOperations } from "./TypeIndex";
import { TypeIndexRegistration, TypeIndexRegistrationReadonly } from "./TypeIndexRegistration";

export class TypeIndexImplReadOrWrite<
    ContainedThing extends TypeIndexRegistration<any> | TypeIndexRegistrationReadonly<any>,
    SelfDescribingThing extends ThingBase<any> | ThingReadonly<any>
>
extends DocumentDecorated<ContainedThing, SelfDescribingThing> 
implements WithReadOperations<ContainedThing> {
    
    public forEachOfClass(forClass: string, callbackfn: (value: ContainedThing, index?: number, array?: ContainedThing[]) => void, thisArg?: any): void {
        this.forEach((r, i, a) => r.isForClass(forClass)? callbackfn(r, i, a): null, thisArg);
    }

}

export class TypeIndexImpl<
    ContainedThing extends TypeIndexRegistration<any> = TypeIndexRegistration<Statement>, 
    SelfDescribingThing extends ThingBase<any> = Thing<Statement>
>
extends TypeIndexImplReadOrWrite<ContainedThing, SelfDescribingThing> 
implements WithWriteOperations {
    
    public createRegistration(forClass?: string, nameHintOrUri?: string | undefined): ContainedThing {
        const registration = this.createThingWithUri(nameHintOrUri);
        if (forClass)
            registration.addForClass(forClass);
        return registration;
    }

}

export function TypeIndexMixin<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase) {
    return TypeIndexImpl<TypeIndexRegistration<Statement>, Thing<Statement>>;
}

export function TypeIndexMixinReadonly<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase) {
    return TypeIndexImplReadOrWrite<TypeIndexRegistrationReadonly<StatementReadonly>, ThingReadonly<StatementReadonly>>;
}


const typeIndexDefaultInstance = new TypeIndexImpl(new DocumentImpl<TypeIndexRegistration, Thing>());
typeIndexDefaultInstance.forEachOfClass("", (t => {}));

const typeIndexDefaultInstanceReadonly = new TypeIndexImplReadOrWrite(new DocumentImpl<TypeIndexRegistrationReadonly, ThingReadonly>());
typeIndexDefaultInstance.deleteContext();
typeIndexDefaultInstanceReadonly.forEachOfClass("", (t => {}));

const got = typeIndexDefaultInstance.get("")
got?.removeForClass("");

const gotReadonly = typeIndexDefaultInstanceReadonly.get("");
gotReadonly?.getForClass();

const WithRead = TypeIndexMixin(DocumentImpl<TypeIndexRegistration, Thing>);
const mixWithRead = new WithRead(new DocumentImpl<TypeIndexRegistration, Thing>());
mixWithRead.deleteContext();

const ReadOnly = TypeIndexMixinReadonly(DocumentImpl<TypeIndexRegistrationReadonly, ThingReadonly>);

// TODO: a contraindre dans la factory
const mixReadOnly = new ReadOnly(new DocumentImpl<TypeIndexRegistrationReadonly, Thing>()) as TypeIndexReadonly;
// @ts-expect-error
mixReadOnly.deleteContext();
