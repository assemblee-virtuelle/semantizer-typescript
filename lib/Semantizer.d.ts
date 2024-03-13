import IContext from "./IContext";
import ISemantizer from "./ISemantizer";
export default class Semantizer implements ISemantizer {
    private _context;
    constructor(context?: any);
    setContext(context: IContext): void;
    getContext(): IContext;
    shorten(uri: string): string;
    expand(uri: string): string;
}
//# sourceMappingURL=Semantizer.d.ts.map