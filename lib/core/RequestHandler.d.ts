export default interface RequestHandler<Input, Output> {
    getNext(): RequestHandler<Output, any> | undefined;
    handle<T>(request: Input | Output): T | undefined;
    handle<T>(request: Input | Output): Promise<T | undefined>;
    hasNext(): boolean;
    setNext(handler: RequestHandler<Output, any>): void;
}
//# sourceMappingURL=RequestHandler.d.ts.map