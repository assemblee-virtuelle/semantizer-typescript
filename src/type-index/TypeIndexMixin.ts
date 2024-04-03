import ThingBase from "../core/Thing";
import DecoratedDocument from "../core/DecoratedDocument";
import DecoratedDocumentWithReadAndWriteOperationsDefaultImpl from "../core/DecoratedDocumentSave";
import TypeIndexBase, { ReadonlyTypeIndex, TypeIndex } from "./TypeIndex";
import TypeIndexFactoryDefaultImpl from "./TypeIndexFactoryDefaultImpl";
import TypeIndexRegistration from "./TypeIndexRegistration";
import Document from "../core/Document";
import DistantDocumentDefaultImpl from "../synchronized/DistantDocumentDefaultImpl";
import DocumentDefaultImpl from "../core-default/DocumentDefaultImpl";
import LocalDocumentDefaultImpl from "../synchronized/LocalDocumentDefaultImpl";
import { DistantDocument } from "../synchronized/SynchronizedDocument";

type Constructor<T = {}> = new (...args: any[]) => T;

export function TypeIndexMixin<TBase extends Constructor<Document<TypeIndexRegistration, ThingBase>>>(Base: TBase) {
    return class TypeIndex extends Base {

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
}

export default TypeIndexMixin;

const factory = new TypeIndexFactoryDefaultImpl();
const distant = factory.load();
const local = factory.create();
local.createRegistration("dfc-b:Catalog");
local.save();

//const doc = factory.createLocalObj(TypeIndexDefault);

const LocalTypeIndex = TypeIndexMixin(LocalDocumentDefaultImpl);
const DistantTypeIndex = TypeIndexMixin(DistantDocumentDefaultImpl<TypeIndexRegistration, ThingBase, TypeIndex>)

const t = new DistantTypeIndex(new DocumentDefaultImpl());
const d: DistantDocument<TypeIndex> & ReadonlyTypeIndex = t;
const c = d.toLocalCopy();

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