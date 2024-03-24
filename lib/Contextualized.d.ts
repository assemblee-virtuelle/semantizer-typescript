import Context from "./Context";
export interface Contextualized {
    getContext(): Context | undefined;
    setContext(context: Context): void;
    expand(uri: string): string;
    shorten(uri: string): string;
}
export default Contextualized;
//# sourceMappingURL=Contextualized.d.ts.map