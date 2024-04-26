
export interface DocumentSynchronized {
    isLocal(): boolean;
    isDistant(): boolean;
    getDistantUri(): string | undefined;
    getDistantUriAll(): string[];
    // getLastFechedDateTime();
}

export interface LocalDocument extends DocumentSynchronized {
    saveUpdate(): Promise<void>; // or update for PATCH
    saveNew(uri: string): Promise<void>; // create() for POST method
    saveOverwrite(): Promise<void>; // overwrite() for PUT method
}

export interface DistantDocument/*<T extends Document<any, any>>*/ extends DocumentSynchronized {
    toLocalCopy(): LocalDocument;// & T;
}

export default DocumentSynchronized;