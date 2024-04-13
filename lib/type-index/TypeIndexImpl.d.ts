import { Constructor, DocumentBase } from "../core/Document";
import DocumentDecoratedImpl from "../core/DocumentDecoratedImpl.js";
import { TypeIndex, TypeIndexReadonly, WithReadOperations, WithWriteOperations } from "./TypeIndex";
import { TypeIndexRegistration } from "./TypeIndexRegistration";
export declare class TypeIndexImplReadOrWrite extends DocumentDecoratedImpl<TypeIndex, TypeIndexReadonly> implements WithReadOperations<TypeIndexRegistration> {
    forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index?: number, array?: TypeIndexRegistration[]) => void, thisArg?: any): void;
}
export declare class TypeIndexImpl extends TypeIndexImplReadOrWrite implements WithWriteOperations<TypeIndexRegistration> {
    createRegistration(forClass?: string, nameHintOrUri?: string | undefined): TypeIndexRegistration;
}
export declare function TypeIndexMixin<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase): typeof TypeIndexImpl;
export declare function TypeIndexMixinReadonly<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase): typeof TypeIndexImplReadOrWrite;
//# sourceMappingURL=TypeIndexImpl.d.ts.map