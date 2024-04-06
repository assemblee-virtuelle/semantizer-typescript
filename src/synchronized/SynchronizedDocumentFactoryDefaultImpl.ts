import DocumentDefaultImpl, { ReadonlyDocumentDefaultImpl } from "../core-default/DocumentDefaultImpl";
import Document, { DocumentBase, ReadonlyDocument } from "../core/Document";
import Thing, { ReadonlyThing } from "../core/Thing";
import TypeIndex, { ReadonlyTypeIndex } from "../type-index/TypeIndex";
import TypeIndexMixin, { ReadonlyTypeIndexMixin } from "../type-index/TypeIndexMixin";
import TypeIndexRegistration, { ReadonlyTypeIndexRegistration } from "../type-index/TypeIndexRegistration";
import { LocalDocumentDefaultImpl, DistantDocumentDefaultImpl } from "./SynchronizedDocumentDefaultImpl";
import { DistantDocument, LocalDocument } from "./SynchronizedDocument";

type Constructor<T = {}> = new (...args: any[]) => T;
type MixinFunction<Type extends DocumentBase<any, any>> = <TSuper extends Document<any, any>>(base: Constructor<TSuper>) => Constructor<TSuper & Type>;
type MixinFunctionReadonly<ContainedThingReadonly extends ReadonlyThing, SelfDescribingThingReadonly extends ReadonlyThing, Type extends ReadonlyDocument<ContainedThingReadonly, SelfDescribingThingReadonly>> = <TSuper extends ReadonlyDocument<ContainedThingReadonly, SelfDescribingThingReadonly>>(base: Constructor<TSuper>) => Constructor<TSuper & Type>;

export class SynchronizedDocumentFactoryDefaultImpl {
    
    public createWithMixin<Type extends Document<any, any> = Document>(Mixin: MixinFunction<Type>): LocalDocument & Type {
        const MixedInLocalDocument = Mixin<LocalDocument & Document<any, any>>(LocalDocumentDefaultImpl);
        return new MixedInLocalDocument(new DocumentDefaultImpl());
    }

    public create<
        ContainedThing extends Thing = Thing, 
        SelfDescribingThing extends Thing = Thing
    >(): LocalDocument & Document<ContainedThing, SelfDescribingThing> {
        return new LocalDocumentDefaultImpl(new DocumentDefaultImpl<ContainedThing, SelfDescribingThing>());
    }

    public load<
        ContainedThing extends Thing = Thing, 
        SelfDescribingThing extends Thing = Thing, 
        ContainedThingReadonly extends ReadonlyThing = ReadonlyThing, 
        SelfDescribingThingReadonly extends ReadonlyThing = ReadonlyThing
    >(): DistantDocument<Document<ContainedThing, SelfDescribingThing>> & ReadonlyDocument<ContainedThingReadonly, SelfDescribingThingReadonly> {
        return new DistantDocumentDefaultImpl<ContainedThing, SelfDescribingThing, ContainedThingReadonly, SelfDescribingThingReadonly>(new ReadonlyDocumentDefaultImpl<ContainedThingReadonly, SelfDescribingThingReadonly>());
    }

    public loadWithMixin<
        ContainedThing extends Thing = Thing, 
        SelfDescribingThing extends Thing = Thing, 
        ContainedThingReadonly extends ReadonlyThing = ReadonlyThing, 
        SelfDescribingThingReadonly extends ReadonlyThing = ReadonlyThing, 
        Type extends Document<ContainedThing, SelfDescribingThing> = Document<ContainedThing, SelfDescribingThing>, 
        ReadonlyType extends ReadonlyDocument<ContainedThingReadonly, SelfDescribingThingReadonly> = ReadonlyDocument<ContainedThingReadonly, SelfDescribingThingReadonly>
    >(Mixin: MixinFunctionReadonly<ContainedThingReadonly, SelfDescribingThingReadonly, ReadonlyType>): DistantDocument<Type> & ReadonlyType {
        const MixedInDistantDocument = Mixin<DistantDocument<Type> & ReadonlyDocument<ContainedThingReadonly, SelfDescribingThingReadonly>>(DistantDocumentDefaultImpl<ContainedThing, SelfDescribingThing, ContainedThingReadonly, SelfDescribingThingReadonly, Type>);
        return new MixedInDistantDocument(new ReadonlyDocumentDefaultImpl());
    }

}

const syncFactory = new SynchronizedDocumentFactoryDefaultImpl();
const localDocument = syncFactory.create();
const distantDocument = syncFactory.load();

const localTypeIndex = syncFactory.createWithMixin<TypeIndex>(TypeIndexMixin);
const distantTypeIndex = syncFactory.loadWithMixin<TypeIndexRegistration, Thing, ReadonlyTypeIndexRegistration, ReadonlyThing, TypeIndex, ReadonlyTypeIndex>(ReadonlyTypeIndexMixin);
distantTypeIndex.toLocalCopy();
localTypeIndex.createRegistration("forClass");