import RequestHandler from "./RequestHandler";

export default abstract class RequestHandlerAbstract<Request> implements RequestHandler<Request> {

    private _nextHandler: RequestHandler<Request> | undefined;

    constructor(nextHandler: RequestHandler<Request> | undefined = undefined) {
        this._nextHandler = nextHandler;
    }

    public handle<T>(request: Request): T | undefined;
    public handle<T>(request: Request): Promise<T | void>;
    public handle<T>(request: Request): T | undefined {
        if (this._nextHandler)
            return this._nextHandler.handle(request);
        //return Promise.resolve();
    }

    public getNext(): RequestHandler<Request> | undefined {
        return this._nextHandler;
    }

    public hasNext(): boolean {
        return this.getNext() !== undefined;
    }

    public setNext(handler: RequestHandler<Request>): void {
        this._nextHandler = handler;
    }

}