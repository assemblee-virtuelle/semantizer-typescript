export default interface Handler<Request> {

    getNext(): Handler<Request> | undefined;

    handle<T>(request: Request): T;
    handle<T>(request: Request): Promise<T>;
    
    hasNext(): boolean;
    setNext(handler: Handler<Request>): void;

}