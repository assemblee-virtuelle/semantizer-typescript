export interface Context {
    expand(uri: string): string;
    shorten(uri: string): string;
}

export default Context;