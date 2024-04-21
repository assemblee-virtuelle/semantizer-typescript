var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import DocumentDecoratedImpl from "../core/Decorated.js";
export class TypeIndexImpl extends DocumentDecoratedImpl {
    getStatementForClass(forClass) {
        throw new Error("Method not implemented.");
    }
    getStatementForInstance(instance) {
        throw new Error("Method not implemented.");
    }
    getStatementForInstanceContainer(instanceContainer) {
        throw new Error("Method not implemented.");
    }
    addForClass(forClass) {
        throw new Error("Method not implemented.");
    }
    addInstance(instance) {
        throw new Error("Method not implemented.");
    }
    addInstanceContainer(instanceContainer) {
        throw new Error("Method not implemented.");
    }
    setForClass(forClass) {
        throw new Error("Method not implemented.");
    }
    removeForClass(forClass) {
        throw new Error("Method not implemented.");
    }
    removeInstance(instance) {
        throw new Error("Method not implemented.");
    }
    removeInstanceContainer(instanceContainer) {
        throw new Error("Method not implemented.");
    }
    removeForClassAll() {
        throw new Error("Method not implemented.");
    }
    removeInstanceAll() {
        throw new Error("Method not implemented.");
    }
    removeInstanceContainerAll() {
        throw new Error("Method not implemented.");
    }
    forEachOfClass(forClass, callbackfn, thisArg) {
        this.forEach((s, i, a) => s.isForClass(forClass) ? callbackfn(s, i, a) : null, thisArg);
    }
    createRegistration(forClass, nameHintOrUri) {
        // const registration = this.createThingWithUri(nameHintOrUri);
        // if (forClass)
        //     registration.addForClass(forClass);
        // return registration;
        return this;
    }
}
export function SyncrhonizedMixin(Base) {
    return TypeIndexImpl;
}
export class TypeIndexLocalImpl extends TypeIndexImpl {
    constructor(wrapped) {
        super(wrapped);
        this._localDocument = wrapped;
    }
    getChangelog() {
        throw new Error("Method not implemented.");
    }
    saveUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("saveUpdate in TypeIndexLocalImpl");
            this._localDocument.saveUpdate();
        });
    }
    saveNew(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    saveOverwrite() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    isLocal() {
        throw new Error("Method not implemented.");
    }
    isDistant() {
        throw new Error("Method not implemented.");
    }
    getDistantUri() {
        throw new Error("Method not implemented.");
    }
    getDistantUriAll() {
        throw new Error("Method not implemented.");
    }
}
export function TypeIndexMixin(Base) {
    return TypeIndexImpl;
}
export function TypeIndexLocalMixin(Base) {
    return TypeIndexLocalImpl;
}
// export function TypeIndexMixin<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase) {
//     return TypeIndexImpl;
// }
// export function TypeIndexMixinReadonly<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase) {
//     return TypeIndexImplReadOrWrite;
// }
//# sourceMappingURL=TypeIndexImpl.js.map