export default interface Changelogable<Key, Value> {

    getLastChange(key: Key): Value | undefined;

    registerChange(key: Key, change: Value): void;
    unregisterChange(key: Key): void;

}