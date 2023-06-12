import StoreInterface from "./StoreInterface";

export default class StoreMap<Key, Value> implements StoreInterface<Key, Value> {

    private storeObject: Map<Key, Value>;

    public constructor() {
        this.storeObject = new Map<Key, Value>();
    }

    public async get<T extends Value>(key: Key): Promise<T | undefined> {
        return <T> this.storeObject.get(key);
    }

    public has(key: Key): boolean {
        return this.storeObject.has(key);
    }

    public set<T extends Value>(key: Key, value: T): void {
        this.storeObject.set(key, value);
    }

}
