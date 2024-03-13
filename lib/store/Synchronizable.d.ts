export default interface Synchronizable {
    getSynchronizedResourceUrl(): string;
    synchronize(resource?: string, options?: {
        fetch: Function;
        methodHint?: "PUT" | "POST" | "PATCH";
    }): Promise<void>;
}
//# sourceMappingURL=Synchronizable.d.ts.map