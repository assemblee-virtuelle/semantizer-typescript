import Document, { DocumentBase, ReadonlyDocument } from "../core/Document";
import Thing, { ReadonlyThing } from "../core/Thing";
import { DistantDocument, LocalDocument } from "./SynchronizedDocument";
type Constructor<T = {}> = new (...args: any[]) => T;
type MixinFunction<Type extends DocumentBase<any, any>> = <TSuper extends Document<any, any>>(base: Constructor<TSuper>) => Constructor<TSuper & Type>;
type MixinFunctionReadonly<ContainedThingReadonly extends ReadonlyThing, SelfDescribingThingReadonly extends ReadonlyThing, Type extends ReadonlyDocument<ContainedThingReadonly, SelfDescribingThingReadonly>> = <TSuper extends ReadonlyDocument<ContainedThingReadonly, SelfDescribingThingReadonly>>(base: Constructor<TSuper>) => Constructor<TSuper & Type>;
export declare class SynchronizedDocumentFactoryDefaultImpl {
    createWithMixin<Type extends Document<any, any> = Document>(Mixin: MixinFunction<Type>): LocalDocument & Type;
    create<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing>(): LocalDocument & Document<ContainedThing, SelfDescribingThing>;
    load<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing, ContainedThingReadonly extends ReadonlyThing = ReadonlyThing, SelfDescribingThingReadonly extends ReadonlyThing = ReadonlyThing>(): DistantDocument<Document<ContainedThing, SelfDescribingThing>> & ReadonlyDocument<ContainedThingReadonly, SelfDescribingThingReadonly>;
    loadWithMixin<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing, ContainedThingReadonly extends ReadonlyThing = ReadonlyThing, SelfDescribingThingReadonly extends ReadonlyThing = ReadonlyThing, Type extends Document<ContainedThing, SelfDescribingThing> = Document<ContainedThing, SelfDescribingThing>, ReadonlyType extends ReadonlyDocument<ContainedThingReadonly, SelfDescribingThingReadonly> = ReadonlyDocument<ContainedThingReadonly, SelfDescribingThingReadonly>>(Mixin: MixinFunctionReadonly<ContainedThingReadonly, SelfDescribingThingReadonly, ReadonlyType>): DistantDocument<Type> & ReadonlyType;
}
export {};
//# sourceMappingURL=SynchronizedDocumentFactoryDefaultImpl.d.ts.map