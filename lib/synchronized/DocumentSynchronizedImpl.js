var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function DocumentLocalMixin(Base) {
    return class DocumentLocalImpl extends Base {
        saveUpdate() {
            return __awaiter(this, void 0, void 0, function* () {
                this.getChangelog().getAdded();
                console.log("saveUpdate in DocumentLocalImpl");
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
export function DocumentDistantMixin(Base) {
    return class DocumentDistantImpl extends Base {
        isLocal() {
            return false;
        }
        isDistant() {
            return true;
        }
        toLocalCopy() {
            throw new Error("Method not implemented.");
        }
        getDistantUri() {
            return undefined;
        }
        getDistantUriAll() {
            return [];
        }
    };
}
//# sourceMappingURL=DocumentSynchronizedImpl.js.map