import { DocumentDecoratedDefaultImpl, DocumentDefaultImpl } from "../core-default/DocumentDefaultImpl";
import { DocumentBase } from "../core/Document";
import { Thing, ThingBase, ThingReadonly } from "../core/Thing";
import { WithReadOperations, WithWriteOperations } from "./TypeIndex";
import { TypeIndexRegistration, TypeIndexRegistrationReadonly } from "./TypeIndexRegistration";

class TypeIndexDefaultImpl<
    ContainedThing extends TypeIndexRegistration, // | TypeIndexRegistrationReadonly = TypeIndexRegistration,
    SelfDescribingThing extends ThingBase<any> = Thing
>
extends DocumentDecoratedDefaultImpl<ContainedThing, SelfDescribingThing> 
implements WithReadOperations<ContainedThing>, WithWriteOperations {
    
    public createRegistration(forClass?: string, nameHintOrUri?: string | undefined): ContainedThing {
        const registration = this.createThingWithUri(nameHintOrUri);
        if (forClass)
            registration.addForClass(forClass);
        return registration;
    }
    
    public forEachOfClass(forClass: string, callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => void, thisArg?: any): void {
        //this.forEach((r, i, a) => r.isForClass(forClass)? callbackfn(r, i, a): null, thisArg);
    }

}

class TypeIndexDefaultImplReadonly<
    ContainedThing extends TypeIndexRegistrationReadonly = TypeIndexRegistrationReadonly,
    SelfDescribingThing extends ThingReadonly<any> = ThingReadonly
>
extends DocumentDecoratedDefaultImpl<ContainedThing, SelfDescribingThing> 
implements WithReadOperations<ContainedThing> {
    
    public forEachOfClass(forClass: string, callbackfn: (value: ContainedThing, index: number, array: ContainedThing[]) => void, thisArg?: any): void {
        //this.forEach((r, i, a) => r.isForClass(forClass)? callbackfn(r, i, a): null, thisArg);
    }

}

//class TypeIndexDefaultImplReadonly extends TypeIndexDefaultImpl<TypeIndexRegistrationReadonly, ThingReadonly> {}

type Constructor<T = {}> = new (...args: any[]) => T;

export function TypeIndexMixin<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase) {
    return TypeIndexDefaultImpl;
}

export function TypeIndexMixinReadonly<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase) {
    return TypeIndexDefaultImplReadonly;
}


const typeIndexDefaultInstance = new TypeIndexDefaultImpl(new DocumentDefaultImpl<TypeIndexRegistration, Thing>());
typeIndexDefaultInstance.forEachOfClass("", (t => {}));

const typeIndexDefaultInstanceReadonly = new TypeIndexDefaultImplReadonly(new DocumentDefaultImpl<TypeIndexRegistrationReadonly, ThingReadonly>());
typeIndexDefaultInstance.deleteContext();
typeIndexDefaultInstanceReadonly.forEachOfClass("", (t => {}));

const got = typeIndexDefaultInstance.get("")
got?.removeForClass("");

const gotReadonly = typeIndexDefaultInstanceReadonly.get("");
gotReadonly?.getForClass();