import { Constructor, DocumentBase } from "../core/Document";
import DocumentDecorated from "../core/DocumentDecorated";
import { Statement } from "../core/Statement";
import { Thing, ThingBase, ThingReadonly } from "../core/Thing";
import { WithReadOperations, WithWriteOperations } from "./TypeIndex";
import { TypeIndexRegistration, TypeIndexRegistrationReadonly } from "./TypeIndexRegistration";
export declare class TypeIndexImplReadOrWrite<ContainedThing extends TypeIndexRegistration<any> | TypeIndexRegistrationReadonly<any>, SelfDescribingThing extends ThingBase<any> | ThingReadonly<any>> extends DocumentDecorated<ContainedThing, SelfDescribingThing> implements WithReadOperations<ContainedThing> {
    forEachOfClass(forClass: string, callbackfn: (value: ContainedThing, index?: number, array?: ContainedThing[]) => void, thisArg?: any): void;
}
export declare class TypeIndexImpl<ContainedThing extends TypeIndexRegistration<any> = TypeIndexRegistration<Statement>, SelfDescribingThing extends ThingBase<any> = Thing<Statement>> extends TypeIndexImplReadOrWrite<ContainedThing, SelfDescribingThing> implements WithWriteOperations {
    createRegistration(forClass?: string, nameHintOrUri?: string | undefined): ContainedThing;
}
export declare function TypeIndexMixin<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase): {
    new (): TypeIndexImpl<TypeIndexRegistration<any>, Thing<any>>;
};
export declare function TypeIndexMixinReadonly<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase): typeof TypeIndexImplReadOrWrite;
//# sourceMappingURL=TypeIndexImpl.d.ts.map