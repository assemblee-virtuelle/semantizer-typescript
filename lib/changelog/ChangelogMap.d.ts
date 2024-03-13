import ChangeKeeper from "./ChangeKeeper";
export default class ChangelogMap<Key, Value> implements ChangeKeeper<Key, Value> {
    private _changes;
    constructor();
    getChanges(): IterableIterator<Value>;
    clone(): ChangeKeeper<Key, Value>;
    getLastChange(key: Key): Value | undefined;
    registerChange(key: Key, change: Value): void;
    unregisterChange(key: Key): void;
}
//# sourceMappingURL=ChangelogMap.d.ts.map