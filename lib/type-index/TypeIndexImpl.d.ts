import { Constructor, Document, DocumentBase } from "../core/Document";
import DocumentDecorated from "../core/DocumentDecorated.js";
import { TypeIndexRegistrationThing, TypeIndexRegistrationThingReadonly, TypeIndexSelfDescribingThing, TypeIndexSelfDescribingThingReadonly, WithReadOperations, WithWriteOperations } from "./TypeIndex";
export declare class TypeIndexImplReadOrWrite extends DocumentDecorated<Document<TypeIndexRegistrationThing, TypeIndexSelfDescribingThing, TypeIndexRegistrationThingReadonly, TypeIndexSelfDescribingThingReadonly>> implements WithReadOperations<TypeIndexRegistrationThing> {
    forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistrationThing, index?: number, array?: TypeIndexRegistrationThing[]) => void, thisArg?: any): void;
}
export declare class TypeIndexImpl extends TypeIndexImplReadOrWrite implements WithWriteOperations<TypeIndexRegistrationThing> {
    createRegistration(forClass?: string, nameHintOrUri?: string | undefined): TypeIndexRegistrationThing;
}
export declare function TypeIndexMixin<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase): typeof TypeIndexImpl;
export declare function TypeIndexMixinReadonly<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase): typeof TypeIndexImplReadOrWrite;
//# sourceMappingURL=TypeIndexImpl.d.ts.map