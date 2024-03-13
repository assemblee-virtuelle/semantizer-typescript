import Context from "./Context.js";
import IContext from "./IContext";
import ISemantizer from "./ISemantizer";

export default class Semantizer implements ISemantizer {

    private _context: IContext;

    public constructor(context: any = {}) {
        this._context = new Context(context);
    }

    public setContext(context: IContext): void {
        this._context = context;
    }

    public getContext(): IContext {
        return this._context;
    }

    /*public getPrefix(uri: string): string | undefined {
        return uri.startsWith("http")? undefined: uri.split(':')[0];
    }*/

    public shorten(uri: string): string {
        return this.getContext()? this.getContext().shorten(uri): uri;
    }

    public expand(uri: string): string {
        return this.getContext()? this.getContext().expand(uri): uri;
    }

}