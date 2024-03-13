var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class StoreMap {
    constructor(idGenerator) {
        this.storeObject = new Map();
        this.idGenerator = idGenerator;
    }
    add(value) {
        const id = this.idGenerator.generate();
        this.set(id, value);
        return id;
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storeObject.get(key);
        });
    }
    has(key) {
        return this.storeObject.has(key);
    }
    set(key, value) {
        this.storeObject.set(key, value);
    }
    unset(key) {
        return this.storeObject.delete(key);
    }
}
//# sourceMappingURL=StoreMap.js.map