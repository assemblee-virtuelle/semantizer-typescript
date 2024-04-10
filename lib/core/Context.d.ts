export interface Context {
    expand(uri: string): string;
    shorten(uri: string): string;
}
export declare class ContextDefault implements Context {
    private _prefixes;
    constructor(context?: any);
    addPrefix(prefix: string, uri: string): void;
    expand(uri: string): string;
    shorten(uri: string): string;
}
//# sourceMappingURL=Context.d.ts.map