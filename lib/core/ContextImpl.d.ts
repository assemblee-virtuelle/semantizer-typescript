import { Context } from "./Common";
export declare class ContextDefault implements Context {
    private _prefixes;
    constructor(context?: any);
    addPrefix(prefix: string, uri: string): void;
    expand(uri: string): string;
    shorten(uri: string): string;
}
//# sourceMappingURL=ContextImpl.d.ts.map