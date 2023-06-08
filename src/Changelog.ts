import Changelogable from "./Changelogable";

export default class Changelog<Key, Value> implements Changelogable<Key, Value> {

    private _changes: Map<Key, Value>;

    constructor() {
        this._changes = new Map<Key, Value>();
    }

    public getLastChange(key: Key): Value | undefined {
        return this._changes.get(key);
    }

    public registerChange(command: Value): void {
        throw new Error("Method not implemented.");
    }

    public unregisterChange(command: Value): void {
        throw new Error("Method not implemented.");
    }
    
}