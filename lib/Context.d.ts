import IContext from "./IContext";
export default class Context implements IContext {
    private _prefixes;
    constructor(context?: any);
    addPrefix(prefix: string, uri: string): void;
    expand(uri: string): string;
    shorten(uri: string): string;
}
//# sourceMappingURL=Context.d.ts.map