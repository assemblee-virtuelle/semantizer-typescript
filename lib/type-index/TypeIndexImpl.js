import { DocumentImpl } from "../core-default/DocumentImpl";
import DocumentDecorated from "../core/DocumentDecorated";
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
const typeIndexDefaultInstance = new TypeIndexImpl(new DocumentImpl());
typeIndexDefaultInstance.forEachOfClass("", (t => { }));
const typeIndexDefaultInstanceReadonly = new TypeIndexImplReadOrWrite(new DocumentImpl());
typeIndexDefaultInstance.deleteContext();
typeIndexDefaultInstanceReadonly.forEachOfClass("", (t => { }));
const got = typeIndexDefaultInstance.get("");
got === null || got === void 0 ? void 0 : got.removeForClass("");
const gotReadonly = typeIndexDefaultInstanceReadonly.get("");
gotReadonly === null || gotReadonly === void 0 ? void 0 : gotReadonly.getForClass();
const WithRead = TypeIndexMixin((DocumentImpl));
const mixWithRead = new WithRead(new DocumentImpl());
mixWithRead.deleteContext();
mixWithRead.createRegistration("").addInstance("");
const ReadOnly = TypeIndexMixinReadonly((DocumentImpl));
// TODO: a contraindre dans la factory
const mixReadOnly = new ReadOnly(new DocumentImpl());
// @ts-expect-error
mixReadOnly.deleteContext();
//# sourceMappingURL=TypeIndexImpl.js.map