import Document from "../core/Document";
export interface SynchronizedDocument {
    isLocal(): boolean;
    isDistant(): boolean;
    getDistantUri(): string | undefined;
    getDistantUriAll(): string[];
}
export interface LocalDocument extends SynchronizedDocument {
    save(): void;
}
export interface DistantDocument<T extends Document<any, any>> extends SynchronizedDocument {
    toLocalCopy(): LocalDocument & T;
}
export default SynchronizedDocument;
//# sourceMappingURL=SynchronizedDocument.d.ts.map