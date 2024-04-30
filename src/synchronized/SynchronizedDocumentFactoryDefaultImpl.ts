import DocumentImpl, { DocumentReadonlyDefaultImpl } from "../core-default/DocumentImpl";
import Document, { DocumentBase, DocumentReadonly } from "../core/Document";
import Thing, { ThingReadonly } from "../core/Thing";
import TypeIndex, { TypeIndexReadonly } from "../type-index/types";
import TypeIndexMixin, { ReadonlyTypeIndexMixin } from "../type-index/impl";
import TypeIndexRegistration, { TypeIndexRegistrationWithNonDestructiveOperations } from "../type-index/TypeIndexRegistration";
import { LocalDocumentDefaultImpl, DistantDocumentDefaultImpl } from "./DocumentSynchronizedImpl";
import { DistantDocument, LocalDocument } from "./DocumentSynchronized";

type Constructor<T = {}> = new (...args: any[]) => T;
type MixinFunction<Type extends DocumentBase<any, any>> = <TSuper extends Document<any, any>>(base: Constructor<TSuper>) => Constructor<TSuper & Type>;
type MixinFunctionReadonly<ContainedThingReadonly extends ThingReadonly, SelfDescribingThingReadonly extends ThingReadonly, Type extends DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly>> = <TSuper extends DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly>>(base: Constructor<TSuper>) => Constructor<TSuper & Type>;

export class SynchronizedDocumentFactoryDefaultImpl {
    
    public createWithMixin<Type extends Document<any, any> = Document>(Mixin: MixinFunction<Type>): LocalDocument & Type {
        const MixedInLocalDocument = Mixin<LocalDocument & Document<any, any>>(LocalDocumentDefaultImpl);
        return new MixedInLocalDocument(new DocumentImpl());
    }

    public create<
        ContainedThing extends Thing = Thing, 
        SelfDescribingThing extends Thing = Thing
    >(): LocalDocument & Document<ContainedThing, SelfDescribingThing> {
        return new LocalDocumentDefaultImpl(new DocumentImpl<ContainedThing, SelfDescribingThing>());
    }

    public load<
        ContainedThing extends Thing = Thing, 
        SelfDescribingThing extends Thing = Thing, 
        ContainedThingReadonly extends ThingReadonly = ThingReadonly, 
        SelfDescribingThingReadonly extends ThingReadonly = ThingReadonly
    >(): DistantDocument<Document<ContainedThing, SelfDescribingThing>> & DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly> {
        return new DistantDocumentDefaultImpl<ContainedThing, SelfDescribingThing, ContainedThingReadonly, SelfDescribingThingReadonly>(new DocumentReadonlyDefaultImpl<ContainedThingReadonly, SelfDescribingThingReadonly>());
    }

    public loadWithMixin<
        ContainedThing extends Thing = Thing, 
        SelfDescribingThing extends Thing = Thing, 
        ContainedThingReadonly extends ThingReadonly = ThingReadonly, 
        SelfDescribingThingReadonly extends ThingReadonly = ThingReadonly, 
        Type extends Document<ContainedThing, SelfDescribingThing> = Document<ContainedThing, SelfDescribingThing>, 
        ReadonlyType extends DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly> = DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly>
    >(Mixin: MixinFunctionReadonly<ContainedThingReadonly, SelfDescribingThingReadonly, ReadonlyType>): DistantDocument<Type> & ReadonlyType {
        const MixedInDistantDocument = Mixin<DistantDocument<Type> & DocumentReadonly<ContainedThingReadonly, SelfDescribingThingReadonly>>(DistantDocumentDefaultImpl<ContainedThing, SelfDescribingThing, ContainedThingReadonly, SelfDescribingThingReadonly, Type>);
        return new MixedInDistantDocument(new DocumentReadonlyDefaultImpl());
    }

}

const syncFactory = new SynchronizedDocumentFactoryDefaultImpl();
const localDocument = syncFactory.create();
const distantDocument = syncFactory.load();

const localTypeIndex = syncFactory.createWithMixin<TypeIndex>(TypeIndexMixin);
const distantTypeIndex = syncFactory.loadWithMixin<TypeIndexRegistration, Thing, TypeIndexRegistrationWithNonDestructiveOperations, ThingReadonly, TypeIndex, TypeIndexReadonly>(ReadonlyTypeIndexMixin);
distantTypeIndex.toLocalCopy();
localTypeIndex.createRegistration("forClass");