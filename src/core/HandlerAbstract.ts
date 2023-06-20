import Handler from "./Handler";
export default abstract class HandlerAbstract<Request> implements Handler<Request> {

    private _nextHandler: Handler<Request> | undefined;

    constructor(nextHandler: Handler<Request> | undefined = undefined) {
        this._nextHandler = nextHandler;
    }

    public handle<T>(request: Request): T | undefined;
    public handle<T>(request: Request): Promise<T | void>;
    public handle<T>(request: Request): T | undefined {
        if (this._nextHandler)
            return this._nextHandler.handle(request);
        //return Promise.resolve();
    }

    public getNext(): Handler<Request> | undefined {
        return this._nextHandler;
    }

    public hasNext(): boolean {
        return this.getNext() !== undefined;
    }

    public setNext(handler: Handler<Request>): void {
        this._nextHandler = handler;
    }

}