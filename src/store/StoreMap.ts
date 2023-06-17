import IdGeneratorInterface from "./IdGeneratorInterface";
import StoreInterface from "./StoreInterface";

export default class StoreMap<Key, Value> implements StoreInterface<Key, Value> {

    private storeObject: Map<Key, Value>;
    private idGenerator: IdGeneratorInterface<Key>;

    public constructor(idGenerator: IdGeneratorInterface<Key>) {
        this.storeObject = new Map<Key, Value>();
        this.idGenerator = idGenerator;
    }

    public add<T extends Value>(value: T): Key {
        const id = this.idGenerator.generate();
        this.set(id, value);
        return id;
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

    public unset<T extends Value>(key: Key): boolean {
        return this.storeObject.delete(key);
    }

}
