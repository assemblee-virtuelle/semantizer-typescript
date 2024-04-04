import { DecoratedReadonlyDocument } from "../core/DecoratedDocument.js";
// states: Local | Distant
// states: Created | Modified | Loaded
export class DistantDocumentDefaultImpl extends DecoratedReadonlyDocument {
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
    save() {
    }
}
export default DistantDocumentDefaultImpl;
//# sourceMappingURL=DistantDocumentDefaultImpl.js.map