import DocumentAbstractDefaultImpl from "./DocumentDefaultImpl";
import { TypeIndexFactoryDefaultImpl } from "./TypeIndexFactoryDefaultImpl";
export default class TypeIndexDefault extends DocumentAbstractDefaultImpl {
    createRegistration(forClass, nameHintOrUri) {
        const registration = this.createThing(nameHintOrUri);
        if (forClass)
            registration.addForClass(forClass);
        return registration;
    }
    forEachOfClass(forClass, callbackfn, thisArg) {
        this.forEach((r, i, a) => r.isForClass(forClass) ? callbackfn(r, i, a) : null, thisArg);
    }
}
const factory = new TypeIndexFactoryDefaultImpl();
const typeIndex = new TypeIndexDefault(factory);
typeIndex.createRegistration("dfc-b:Catalog").addInstance("http://localhost/catalog");
typeIndex.forEach(tir => {
    tir.getForClass();
});
typeIndex.forEachOfClass("dfc-b:Catalog", r => console.log(f));
const f = typeIndex.filter(tir => tir.getForClass() === "dfc-b:Address");
const r = typeIndex.get("");
typeIndex.createRegistration().addForClass("");
//# sourceMappingURL=TypeIndexDefault.js.map