import ChangeKeeper from "./ChangeKeeper";

export default class ChangelogProxy<Key, Value> implements ChangeKeeper<Key, Value> {

    private _changelog: ChangeKeeper<Key, Value>;

    constructor(changelog: ChangeKeeper<Key, Value>) {
        this._changelog = changelog;
    }

    getChanges(): IterableIterator<Value> {
        return this._changelog.getChanges();
    }

    clone(): ChangeKeeper<Key, Value> {
        return this._changelog.clone();
    }

    getLastChange(key: Key): Value | undefined {
        return this._changelog.getLastChange(key);
    }

    registerChange(key: Key, change: Value): void {
        this._changelog.registerChange(key, change);
    }

    unregisterChange(key: Key): void {
        this._changelog.unregisterChange(key);
    }

}