import { Constructor, Document, DocumentBase } from "../core/Document";
import DocumentDecorated from "../core/DocumentDecorated";
import { TypeIndex, WithReadOperations, WithWriteOperations } from "./TypeIndex";
import { TypeIndexRegistration } from "./TypeIndexRegistration";
type TypeIndexRegistrationThing = TypeIndexRegistration<TypeIndexDocument>;
type TypeIndexDocument = TypeIndex<TypeIndexRegistrationThing, TypeIndexRegistrationThing>;
export declare class TypeIndexImplReadOrWrite//<
 extends DocumentDecorated<Document<TypeIndexRegistrationThing, TypeIndexRegistrationThing>>//TypeIndex<ContainedThing, SelfDescribingThing>> 
 implements WithReadOperations<TypeIndexRegistrationThing> {
    forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistrationThing, index?: number, array?: TypeIndexRegistrationThing[]) => void, thisArg?: any): void;
}
export declare class TypeIndexImpl//<
 extends TypeIndexImplReadOrWrite implements WithWriteOperations<TypeIndexRegistrationThing> {
    createRegistration(forClass?: string, nameHintOrUri?: string | undefined): TypeIndexRegistrationThing;
}
export declare function TypeIndexMixin<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase): typeof TypeIndexImpl;
export declare function TypeIndexMixinReadonly<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase): typeof TypeIndexImplReadOrWrite;
export {};
//# sourceMappingURL=TypeIndexImpl.d.ts.map