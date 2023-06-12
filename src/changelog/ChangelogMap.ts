import Changelogable from "./Changelogable";

export default class ChangelogMap<Key, Value> implements Changelogable<Key, Value> {

    private _changes: Map<Key, Value>;

    constructor() {
        this._changes = new Map<Key, Value>();
    }

    public getChanges(): IterableIterator<Value> {
        return this._changes.values();
    }

    public clone(): Changelogable<Key, Value> {
        return structuredClone(this);
    }

    // TODO: get the last change without regarding its type
    public getLastChange(key: Key): Value | undefined {
        console.log(key);
        if (!this._changes.has(key))
            throw new Error(`There is no change corresponding to the provided key: ${key}.`);
            
        return this._changes.get(key);
    }

    public registerChange(key: Key, change: Value): void {
        this._changes.set(key, change);
    }

    public unregisterChange(key: Key): void {
        this._changes.delete(key);
    }
    
}