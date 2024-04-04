export function ReadonlyTypeIndexMixin(Base) {
    return class TypeIndexDefaultImpl extends Base {
        forEachOfClass(forClass, callbackfn, thisArg) {
            //this.forEach((r, i, a) => r.isForClass(forClass)? callbackfn(r, i, a): null, thisArg);
        }
    };
}
export function TypeIndexMixin(Base) {
    return class TypeIndexDefaultImpl extends Base {
        createRegistration(forClass, nameHintOrUri) {
            const registration = this.createThingWithUri(nameHintOrUri);
            if (forClass)
                registration.addForClass(forClass);
            return registration;
        }
        forEachOfClass(forClass, callbackfn, thisArg) {
            //this.forEach((r, i, a) => r.isForClass(forClass)? callbackfn(r, i, a): null, thisArg);
        }
    };
}
export default TypeIndexMixin;
//# sourceMappingURL=TypeIndexMixin.js.map