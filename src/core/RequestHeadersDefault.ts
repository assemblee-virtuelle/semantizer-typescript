import RequestHeaders from "./RequestHeaders";

export default class RequestHeadersDefault<Key, Value> implements RequestHeaders<Key, Value> {

    private _headers: Map<Key, Value>;

    constructor() {
        this._headers = new Map<Key, Value>();
    }

    public set(key: Key, value: Value): void {
        this._headers.set(key, value);
    }

    public remove(key: Key): void {
        this._headers.delete(key);
    }

    public has(key: Key): boolean {
        return this._headers.has(key);
    }

    public getValue(key: Key): Value | undefined {
        return this._headers.get(key);
    }

}