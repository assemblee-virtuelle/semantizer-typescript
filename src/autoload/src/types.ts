export interface DocumentAutoload {
    isLoaded(): boolean;
    autoload(): Promise<void>;
}