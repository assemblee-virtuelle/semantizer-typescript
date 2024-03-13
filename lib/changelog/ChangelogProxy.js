export default class ChangelogProxy {
    constructor(changelog) {
        this._changelog = changelog;
    }
    getChanges() {
        return this._changelog.getChanges();
    }
    clone() {
        return this._changelog.clone();
    }
    getLastChange(key) {
        return this._changelog.getLastChange(key);
    }
    registerChange(key, change) {
        this._changelog.registerChange(key, change);
    }
    unregisterChange(key) {
        this._changelog.unregisterChange(key);
    }
}
//# sourceMappingURL=ChangelogProxy.js.map