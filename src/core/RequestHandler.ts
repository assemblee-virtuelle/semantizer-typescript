export default interface RequestHandler<Request> {

    getNext(): RequestHandler<Request> | undefined;

    handle<T>(request: Request): T;
    handle<T>(request: Request): Promise<T>;
    
    hasNext(): boolean;
    setNext(handler: RequestHandler<Request>): void;

}