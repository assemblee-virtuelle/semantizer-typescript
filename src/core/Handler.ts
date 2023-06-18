import HandlerRequest from "./HandlerRequest";

export default interface Handler {

    getNext(): Handler | undefined;
    handle<T>(request: HandlerRequest<any, any, any>): T | undefined;
    hasNext(): boolean;
    setNext(handler: Handler): void;

}