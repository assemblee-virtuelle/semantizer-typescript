import { Constructor, Document, DocumentBase } from "../core/Document";
import DocumentDecorated from "../core/DocumentDecorated.js";
import { TypeIndexSelfDescribingThing, TypeIndexSelfDescribingThingReadonly, WithReadOperations, WithWriteOperations } from "./TypeIndex";
import { TypeIndexRegistration, TypeIndexRegistrationReadonly } from "./TypeIndexRegistration";
export declare class TypeIndexImplReadOrWrite extends DocumentDecorated<Document<TypeIndexRegistration, TypeIndexSelfDescribingThing, TypeIndexRegistrationReadonly, TypeIndexSelfDescribingThingReadonly>> implements WithReadOperations<TypeIndexRegistration> {
    forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index?: number, array?: TypeIndexRegistration[]) => void, thisArg?: any): void;
}
export declare class TypeIndexImpl extends TypeIndexImplReadOrWrite implements WithWriteOperations<TypeIndexRegistration> {
    createRegistration(forClass?: string, nameHintOrUri?: string | undefined): TypeIndexRegistration;
}
export declare function TypeIndexMixin<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase): typeof TypeIndexImpl;
export declare function TypeIndexMixinReadonly<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase): typeof TypeIndexImplReadOrWrite;
//# sourceMappingURL=TypeIndexImpl.d.ts.map