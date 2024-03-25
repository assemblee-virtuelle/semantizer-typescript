export class ThingStateDefaultBase {
    constructor(thing, uri) {
        this._thing = thing;
        this._uri = uri;
    }
    getThing() {
        return this._thing;
    }
    getUri() {
        return this._uri;
    }
    getContext() {
        return this.getThing().getContext();
    }
    expand(uri) {
        return this.getThing().expand(uri);
    }
    shorten(uri) {
        return this.getThing().shorten(uri);
    }
}
export default ThingStateDefaultBase;
//# sourceMappingURL=ThingStateDefaultBase.js.map