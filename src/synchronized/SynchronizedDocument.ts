export interface SynchronizedDocument {
    isLocal(): boolean;
    isDistant(): boolean;
    getDistantUri(): string | undefined;
    getDistantUriAll(): string[];
    // getLastFechedDateTime();
}

export interface LocalDocument extends SynchronizedDocument {
    save(): void;
}

export interface DistantDocument<T> extends SynchronizedDocument {
    toLocalCopy(): LocalDocument & T;
}

export default SynchronizedDocument;