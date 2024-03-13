export default interface IContext {
    expand(uri: string): string;
    shorten(uri: string): string;
}