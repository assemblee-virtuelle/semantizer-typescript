export default interface Changelogable<Key, Value> {

    getChanges(): IterableIterator<Value>;
    getLastChange(key: Key): Value | undefined;

    registerChange(key: Key, change: Value): void;
    unregisterChange(key: Key): void;

    //count(): number;
    //isEmpty(): boolean;

    clone(): Changelogable<Key, Value>;

}