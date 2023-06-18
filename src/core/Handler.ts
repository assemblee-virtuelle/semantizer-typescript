import HandlerRequest from "./HandlerRequest";

export default interface Handler<Result> {

    getNext(): Handler<any> | undefined;
    handle(request: HandlerRequest<any, any, any>): Result;
    hasNext(): boolean;
    setNext(handler: Handler<any>): void;

}