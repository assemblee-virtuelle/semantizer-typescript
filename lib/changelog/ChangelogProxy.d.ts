import ChangeKeeper from "./ChangeKeeper";
export default class ChangelogProxy<Key, Value> implements ChangeKeeper<Key, Value> {
    private _changelog;
    constructor(changelog: ChangeKeeper<Key, Value>);
    getChanges(): IterableIterator<Value>;
    clone(): ChangeKeeper<Key, Value>;
    getLastChange(key: Key): Value | undefined;
    registerChange(key: Key, change: Value): void;
    unregisterChange(key: Key): void;
}
//# sourceMappingURL=ChangelogProxy.d.ts.map