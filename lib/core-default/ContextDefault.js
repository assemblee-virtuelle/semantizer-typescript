export class ContextDefault {
    constructor(context = {}) {
        this._prefixes = [];
        Object.keys(context).forEach((prefix) => this.addPrefix(prefix, context[prefix]));
    }
    addPrefix(prefix, uri) {
        this._prefixes.push({ prefix, uri });
    }
    expand(uri) {
        for (const prefix of this._prefixes) {
            if (uri.startsWith(prefix.prefix + ":")) {
                return prefix.uri + uri.substring(prefix.prefix.length + 1);
            }
        }
        return uri;
    }
    shorten(uri) {
        for (const prefix of this._prefixes) {
            if (uri.startsWith(prefix.uri)) {
                return prefix.prefix + ":" + uri.substring(prefix.uri.length);
            }
        }
        return uri;
    }
}
export default ContextDefault;
//# sourceMappingURL=ContextDefault.js.map