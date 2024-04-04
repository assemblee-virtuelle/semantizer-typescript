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
        var _a, _b;
        return (_b = (_a = this.getThing().getContext()) === null || _a === void 0 ? void 0 : _a.expand(uri)) !== null && _b !== void 0 ? _b : uri;
    }
    shorten(uri) {
        var _a, _b;
        return (_b = (_a = this.getThing().getContext()) === null || _a === void 0 ? void 0 : _a.shorten(uri)) !== null && _b !== void 0 ? _b : uri;
    }
}
export default ThingStateDefaultBase;
//# sourceMappingURL=ThingStateDefaultBase.js.map