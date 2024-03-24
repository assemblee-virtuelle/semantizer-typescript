import ThingState from "./ThingState";

export default class ThingStateRegular implements ThingState {

    private _uri: string;

    constructor(uri: string) {
        this._uri = uri;
    }

    public getUri(): string {
        return this._uri;
    }

    public isAnonymous(): boolean {
        return false;
    }

}