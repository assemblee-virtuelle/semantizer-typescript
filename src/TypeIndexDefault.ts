import Context from "./Context";
import DocumentAbstractDefaultImpl from "./DocumentDefaultImpl";
import Thing from "./Thing";
import TypeIndex from "./TypeIndex";
import { TypeIndexFactoryDefaultImpl } from "./TypeIndexFactoryDefaultImpl";
import TypeIndexRegistration from "./TypeIndexRegistration";

export default class TypeIndexDefault extends DocumentAbstractDefaultImpl<TypeIndexRegistration, Thing> implements TypeIndex {

    public constructor(uri?: string, context?: Context) {
        super(new TypeIndexFactoryDefaultImpl(), uri, context);
    }

    public createRegistration(forClass?: string, nameHintOrUri?: string | undefined): TypeIndexRegistration {
        const registration = this.createThing(nameHintOrUri);
        if (forClass)
            registration.addForClass(forClass);
        return registration;
    }

    public forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index: number, array: TypeIndexRegistration[]) => void, thisArg?: any): void {
        this.forEach((r, i, a) => r.isForClass(forClass)? callbackfn(r, i, a): null, thisArg);
    }

}

const typeIndex = new TypeIndexDefault();
typeIndex.createRegistration("dfc-b:Catalog").addInstance("http://localhost/catalog");

typeIndex.forEach(tir => {
    tir.getForClass()
});

typeIndex.forEachOfClass("dfc-b:Catalog", r => console.log(f));

const f = typeIndex.filter(tir => tir.getForClass() === "dfc-b:Address");

const r = typeIndex.get("")

typeIndex.createRegistration().addForClass("");