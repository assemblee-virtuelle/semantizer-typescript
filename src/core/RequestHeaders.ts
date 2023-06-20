export default interface RequestHeaders<Key, Value> {

    set(key: Key, value: Value): void;
    remove(key: Key): void;
    has(key: Key): boolean;
    getValue(key: Key): Value | undefined;

}