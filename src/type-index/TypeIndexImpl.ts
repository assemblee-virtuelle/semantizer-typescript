import { Constructor, Document, DocumentBase } from "../core/Document";
import DocumentDecorated from "../core/DocumentDecorated.js";
import { TypeIndexRegistrationThing, TypeIndexRegistrationThingReadonly, TypeIndexSelfDescribingThing, TypeIndexSelfDescribingThingReadonly, WithReadOperations, WithWriteOperations } from "./TypeIndex";

export class TypeIndexImplReadOrWrite 
extends DocumentDecorated<Document<TypeIndexRegistrationThing, TypeIndexSelfDescribingThing, TypeIndexRegistrationThingReadonly, TypeIndexSelfDescribingThingReadonly>> 
implements WithReadOperations<TypeIndexRegistrationThing> {
    
    public forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistrationThing, index?: number, array?: TypeIndexRegistrationThing[]) => void, thisArg?: any): void {
        this.forEach((r, i, a) => r.isForClass(forClass)? callbackfn(r, i, a): null, thisArg);
    }

}

export class TypeIndexImpl 
extends TypeIndexImplReadOrWrite 
implements WithWriteOperations<TypeIndexRegistrationThing> {
    
    public createRegistration(forClass?: string, nameHintOrUri?: string | undefined): TypeIndexRegistrationThing {
        const registration = this.createThingWithUri(nameHintOrUri);
        if (forClass)
            registration.addForClass(forClass);
        return registration;
    }

}

export function TypeIndexMixin<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase) {
    return TypeIndexImpl;
}

export function TypeIndexMixinReadonly<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase) {
    return TypeIndexImplReadOrWrite;
}