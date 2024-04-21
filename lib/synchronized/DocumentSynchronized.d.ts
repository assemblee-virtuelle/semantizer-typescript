export interface DocumentSynchronized {
    isLocal(): boolean;
    isDistant(): boolean;
    getDistantUri(): string | undefined;
    getDistantUriAll(): string[];
}
export interface LocalDocument extends DocumentSynchronized {
    saveUpdate(): Promise<void>;
    saveNew(uri: string): Promise<void>;
    saveOverwrite(): Promise<void>;
}
export interface DistantDocument/*<T extends Document<any, any>>*/  extends DocumentSynchronized {
    toLocalCopy(): LocalDocument;
}
export default DocumentSynchronized;
//# sourceMappingURL=DocumentSynchronized.d.ts.map