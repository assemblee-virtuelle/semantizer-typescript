export default interface Changelogable<Key, Value> {

    getChanges(): IterableIterator<Value>;
    getLastChange(key: Key): Value | undefined;

    registerChange(key: Key, change: Value): void;
    unregisterChange(key: Key): void;

    clone(): Changelogable<Key, Value>;

}