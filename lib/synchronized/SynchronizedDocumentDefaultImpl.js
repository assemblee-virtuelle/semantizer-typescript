import DecoratedDocument, { DecoratedReadonlyDocument } from "../core/DecoratedDocument.js";
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
//# sourceMappingURL=SynchronizedDocumentDefaultImpl.js.map