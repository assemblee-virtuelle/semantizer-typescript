import DecoratedDocument from "../core/DecoratedDocument.js";
// states: Local | Distant
// states: Created | Modified | Loaded
export class LocalDocumentDefaultImpl extends DecoratedDocument {
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
    save() {
    }
}
export default LocalDocumentDefaultImpl;
//# sourceMappingURL=LocalDocumentDefaultImpl.js.map