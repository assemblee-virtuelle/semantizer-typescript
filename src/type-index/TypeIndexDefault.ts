import Thing from "../contracts/Thing";
import DecoratedDocumentWithReadAndWriteOperationsDefaultImpl from "../decorator/DecoratedDocumentWithReadAndWriteOperationsDefaultImpl";
import { DocumentFactoryDefaultImpl } from "../synchronized/DocumentFactory";
import TypeIndex, { TypeIndexWithReadAndWriteOperations } from "./TypeIndex";
import TypeIndexFactoryDefaultImpl from "./TypeIndexFactoryDefaultImpl";
import TypeIndexRegistration from "./TypeIndexRegistration";

export class TypeIndexDefault extends DecoratedDocumentWithReadAndWriteOperationsDefaultImpl<TypeIndexRegistration, Thing> implements TypeIndexWithReadAndWriteOperations {

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

export default TypeIndexDefault;

const factory = new DocumentFactoryDefaultImpl<TypeIndex>();
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