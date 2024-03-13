import Context from "./Context";
export default class Semantizer {
    constructor(context = {}) {
        this._context = new Context(context);
    }
    setContext(context) {
        this._context = context;
    }
    getContext() {
        return this._context;
    }
    /*public getPrefix(uri: string): string | undefined {
        return uri.startsWith("http")? undefined: uri.split(':')[0];
    }*/
    shorten(uri) {
        return this.getContext() ? this.getContext().shorten(uri) : uri;
    }
    expand(uri) {
        return this.getContext() ? this.getContext().expand(uri) : uri;
    }
}
//# sourceMappingURL=Semantizer.js.map