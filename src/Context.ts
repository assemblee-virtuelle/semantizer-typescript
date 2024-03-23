export default interface Context {
    expand(uri: string): string;
    shorten(uri: string): string;
}