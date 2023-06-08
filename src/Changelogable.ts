export default interface Changelogable<Key, Value> {

    getLastChange(key: Key): Value | undefined;

    registerChange(command: Value): void;
    unregisterChange(command: Value): void;

}