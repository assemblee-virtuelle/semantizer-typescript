import Document, { DocumentBase, DocumentReadonly } from "../core/Document";
import Thing, { ThingReadonly } from "../core/Thing";
import { DistantDocument, LocalDocument } from "./DocumentSynchronized";
type Constructor<T = {}> = new (...args: any[]) => T;
type MixinFunction<Type extends DocumentBase<any, any>> = <TSuper extends Document<any, any>>(base: Constructor<TSuper>) => Constructor<TSuper & Type>;
type MixinFunctionReadonly<ContainedThingReadonly extends ThingReadonly, SelfDescribingThingReadonly extends ThingReadonly, Type extends DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly>> = <TSuper extends DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly>>(base: Constructor<TSuper>) => Constructor<TSuper & Type>;
export declare class SynchronizedDocumentFactoryDefaultImpl {
    createWithMixin<Type extends Document<any, any> = Document>(Mixin: MixinFunction<Type>): LocalDocument & Type;
    create<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing>(): LocalDocument & Document<ContainedThing, SelfDescribingThing>;
    load<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing, ContainedThingReadonly extends ThingReadonly = ThingReadonly, SelfDescribingThingReadonly extends ThingReadonly = ThingReadonly>(): DistantDocument<Document<ContainedThing, SelfDescribingThing>> & DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly>;
    loadWithMixin<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing, ContainedThingReadonly extends ThingReadonly = ThingReadonly, SelfDescribingThingReadonly extends ThingReadonly = ThingReadonly, Type extends Document<ContainedThing, SelfDescribingThing> = Document<ContainedThing, SelfDescribingThing>, ReadonlyType extends DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly> = DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly>>(Mixin: MixinFunctionReadonly<ContainedThingReadonly, SelfDescribingThingReadonly, ReadonlyType>): DistantDocument<Type> & ReadonlyType;
}
export {};
//# sourceMappingURL=SynchronizedDocumentFactoryDefaultImpl.d.ts.map