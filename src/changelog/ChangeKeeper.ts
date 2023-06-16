export default interface ChangeKeeper<Key, Value> {

    getChanges(): IterableIterator<Value>;
    getLastChange(key: Key): Value | undefined;

    registerChange(key: Key, change: Value): void;
    unregisterChange(key: Key): void;

    //count(): number;
    //isEmpty(): boolean;

    clone(): ChangeKeeper<Key, Value>;

}