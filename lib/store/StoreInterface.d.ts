export default interface StoreInterface<Key, Value> {
    add<T extends Value>(value: T): Key;
    get<T extends Value>(key: Key): Promise<T | undefined>;
    has(key: Key): boolean;
    set<T extends Value>(key: Key, value: T): void;
    unset<T extends Value>(key: Key): boolean;
}
//# sourceMappingURL=StoreInterface.d.ts.map