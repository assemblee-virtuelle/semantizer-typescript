export interface Resource {
    getUri(): string;
    setUri(uri: string): void;
}

export default Resource;