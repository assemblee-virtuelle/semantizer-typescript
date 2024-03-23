import Context from "./Context";
export default class ContextDefault implements Context {
    private _prefixes;
    constructor(context?: any);
    addPrefix(prefix: string, uri: string): void;
    expand(uri: string): string;
    shorten(uri: string): string;
}
//# sourceMappingURL=ContextDefault.d.ts.map