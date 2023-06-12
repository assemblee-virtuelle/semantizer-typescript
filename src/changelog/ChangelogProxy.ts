import Changelogable from "./Changelogable";

export default class ChangelogProxy<Key, Value> implements Changelogable<Key, Value> {

    private _changelog: Changelogable<Key, Value>;

    constructor(changelog: Changelogable<Key, Value>) {
        this._changelog = changelog;
    }

    getChanges(): IterableIterator<Value> {
        return this._changelog.getChanges();
    }

    clone(): Changelogable<Key, Value> {
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