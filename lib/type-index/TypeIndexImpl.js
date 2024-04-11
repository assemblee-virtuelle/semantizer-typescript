import DocumentDecorated from "../core/DocumentDecorated.js";
export class TypeIndexImplReadOrWrite extends DocumentDecorated {
    forEachOfClass(forClass, callbackfn, thisArg) {
        this.forEach((r, i, a) => r.isForClass(forClass) ? callbackfn(r, i, a) : null, thisArg);
    }
}
export class TypeIndexImpl extends TypeIndexImplReadOrWrite {
    createRegistration(forClass, nameHintOrUri) {
        const registration = this.createThingWithUri(nameHintOrUri);
        if (forClass)
            registration.addForClass(forClass);
        return registration;
    }
}
export function TypeIndexMixin(Base) {
    return TypeIndexImpl;
}
export function TypeIndexMixinReadonly(Base) {
    return TypeIndexImplReadOrWrite;
}
//# sourceMappingURL=TypeIndexImpl.js.map