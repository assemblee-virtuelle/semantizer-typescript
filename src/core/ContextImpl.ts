import { Context } from "./Common";

interface Prefix {
    prefix: string;
    uri: string;
}

export class ContextDefault implements Context {

    private _prefixes: Prefix[];

    constructor(context: any = {}) {
        this._prefixes = [];
        Object.keys(context).forEach((prefix: string) => this.addPrefix(prefix, context[prefix]));
    }

    public addPrefix(prefix: string, uri: string) {
        this._prefixes.push({ prefix, uri });
    }

    public expand(uri: string): string {
        for (const prefix of this._prefixes) {
            if (uri.startsWith(prefix.prefix + ":")) {
                return prefix.uri + uri.substring(prefix.prefix.length + 1);
            }
        }
        return uri;
    }

    public shorten(uri: string): string {
        for (const prefix of this._prefixes) {
            if (uri.startsWith(prefix.uri)) {
                return prefix.prefix + ":" + uri.substring(prefix.uri.length);
            }
        }
        return uri;
    }

}