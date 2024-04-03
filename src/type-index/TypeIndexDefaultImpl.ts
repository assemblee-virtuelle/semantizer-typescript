import Thing from "../core/Thing";
import DecoratedDocument from "../core/DecoratedDocument";
import DecoratedDocumentWithReadAndWriteOperationsDefaultImpl from "../core/DecoratedDocumentSave";
import TypeIndexBase, { TypeIndex } from "./TypeIndex";
import TypeIndexFactoryDefaultImpl from "./TypeIndexFactoryDefaultImpl";
import TypeIndexRegistration from "./TypeIndexRegistration";

export class TypeIndexDefaultImpl extends DecoratedDocument<TypeIndexRegistration, Thing> implements TypeIndex {

    public createRegistration(forClass?: string, nameHintOrUri?: string | undefined): TypeIndexRegistration {
        const registration = this.createThingWithUri(nameHintOrUri);
        if (forClass)
            registration.addForClass(forClass);
        return registration;
    }

    public forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index: number, array: TypeIndexRegistration[]) => void, thisArg?: any): void {
        //this.forEach((r, i, a) => r.isForClass(forClass)? callbackfn(r, i, a): null, thisArg);
    }

}

/*
type Constructor<T = {}> = new (...args: any[]) => T;
//type C<ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> = new (document: DocumentWithReadOperations<ContainedThing, SelfDescribingThing>) => any;
type GDocument<ContainedThing extends Thing, SelfDescribingThing extends Thing> = Constructor<{ getWrappedDocument: () => Document<ContainedThing, SelfDescribingThing> }>

export function SynchronizedDocumentMixin<TBase extends GDocument<ContainedThing, SelfDescribingThing>, ContainedThing extends Thing, SelfDescribingThing extends Thing>(Base: TBase) {
    return class Scaling extends Base {
        public get(uri: string | Resource): ContainedThing | undefined {
            // PB: this.getWrappedDocument().contains... ERROR NOT DEFINED
            return this.getWrappedDocument().get(uri);
        }
    }
}
*/

export default TypeIndexDefaultImpl;

//const factory = new DocumentFactoryDefaultImpl<TypeIndexBase>();
//const doc = factory.createLocalObj(TypeIndexDefault);

const typeIndexFactory = new TypeIndexFactoryDefaultImpl();
const typeIndex = typeIndexFactory.create();
const distantTypeIndex = typeIndexFactory.load();

typeIndex.createRegistration("dfc-b:Catalog").addInstance("http://localhost/catalog");

typeIndex.forEach(tir => {
    tir.getForClass()
});

typeIndex.forEachOfClass("dfc-b:Catalog", r => console.log(f));

const f = typeIndex.filter(tir => tir.getForClass() === "dfc-b:Address");

const r = typeIndex.get("")

typeIndex.createRegistration().addForClass("");