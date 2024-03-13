export default interface ChangeKeeper<Key, Value> {
    getChanges(): IterableIterator<Value>;
    getLastChange(key: Key): Value | undefined;
    registerChange(key: Key, change: Value): void;
    unregisterChange(key: Key): void;
    clone(): ChangeKeeper<Key, Value>;
}
//# sourceMappingURL=ChangeKeeper.d.ts.map