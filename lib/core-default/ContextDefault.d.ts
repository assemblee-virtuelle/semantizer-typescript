import Context from "../core/Context";
export declare class ContextDefault implements Context {
    private _prefixes;
    constructor(context?: any);
    addPrefix(prefix: string, uri: string): void;
    expand(uri: string): string;
    shorten(uri: string): string;
}
export default ContextDefault;
//# sourceMappingURL=ContextDefault.d.ts.map