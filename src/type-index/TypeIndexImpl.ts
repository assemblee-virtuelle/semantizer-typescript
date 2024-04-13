import DocumentDecoratedImpl from "../core/Decorated.js";
import { Constructor, DocumentBase } from "../core/Document";
import { TypeIndex, TypeIndexReadonly, WithReadOperations, WithWriteOperations } from "./TypeIndex";
import { TypeIndexRegistration } from "./TypeIndexRegistration";

export class TypeIndexImplReadOrWrite 
extends DocumentDecoratedImpl<TypeIndex, TypeIndexReadonly> 
implements WithReadOperations<TypeIndexRegistration> {

    public forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index?: number, array?: TypeIndexRegistration[]) => void, thisArg?: any): void {
        this.forEach((r, i, a) => r.isForClass(forClass)? callbackfn(r, i, a): null, thisArg);
    }

}

export class TypeIndexImpl 
extends TypeIndexImplReadOrWrite 
implements WithWriteOperations<TypeIndexRegistration> {
    
    public createRegistration(forClass?: string, nameHintOrUri?: string | undefined): TypeIndexRegistration {
        const registration = this.createThingWithUri(nameHintOrUri);
        //console.log(registration instanceof TypeIndexRegistrationImpl);
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