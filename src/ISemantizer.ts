import IContext from "./IContext";

export default interface ISemantizer {

    getContext(): IContext;
    setContext(context: IContext): void;

    shorten(uri: string): string;
    expand(uri: string): string;

}