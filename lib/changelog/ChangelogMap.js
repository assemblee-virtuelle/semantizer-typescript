export default class ChangelogMap {
    constructor() {
        this._changes = new Map();
    }
    getChanges() {
        return this._changes.values();
    }
    clone() {
        return structuredClone(this);
    }
    // TODO: get the last change without regarding its type
    getLastChange(key) {
        if (!this._changes.has(key))
            throw new Error(`There is no change corresponding to the provided key: ${key}.`);
        return this._changes.get(key);
    }
    registerChange(key, change) {
        this._changes.set(key, change);
    }
    unregisterChange(key) {
        this._changes.delete(key);
    }
}
//# sourceMappingURL=ChangelogMap.js.map