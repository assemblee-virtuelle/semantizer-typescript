import IdGeneratorInterface from "./IdGeneratorInterface";
import StoreInterface from "./StoreInterface";
export default class StoreMap<Key, Value> implements StoreInterface<Key, Value> {
    private storeObject;
    private idGenerator;
    constructor(idGenerator: IdGeneratorInterface<Key>);
    add<T extends Value>(value: T): Key;
    get<T extends Value>(key: Key): Promise<T | undefined>;
    has(key: Key): boolean;
    set<T extends Value>(key: Key, value: T): void;
    unset<T extends Value>(key: Key): boolean;
}
//# sourceMappingURL=StoreMap.d.ts.map