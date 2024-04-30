var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function LocalSolidDocumentMixin(Base) {
    return class LocalSolidDocumentImpl extends Base {
        saveUpdate() {
            return __awaiter(this, void 0, void 0, function* () {
                const n3Patch = this.getChangelogN3().toN3();
                const request = yield fetch(this.getUri(), { method: 'PATCH', body: n3Patch });
                // TODO: handle response
                // return Document?
            });
        }
        saveNew(uri) {
            return __awaiter(this, void 0, void 0, function* () {
                // const documentAsTurtle = serialize the document to turtle;
                // const request = await fetch(uri, { method: 'POST', body: documentAsTurtle });
                throw new Error("Method not implemented.");
            });
        }
        saveOverwrite() {
            return __awaiter(this, void 0, void 0, function* () {
                throw new Error("Method not implemented.");
            });
        }
        // Below methods should be implemented in Base class, change the constructor 
        // constraint to take a LocalDocument in addition?
        isLocal() {
            return true;
        }
        isDistant() {
            return false;
        }
        getDistantUri() {
            return undefined;
        }
        getDistantUriAll() {
            return [];
        }
    };
}
//# sourceMappingURL=SynchronizedSolidImpl.js.map