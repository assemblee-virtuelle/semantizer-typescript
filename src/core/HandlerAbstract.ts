import Handler from "./Handler";
import HandlerRequest from "./HandlerRequest";

export default abstract class HandlerAbstract<Result> implements Handler<Result | undefined> {

    private _nextHandler: Handler<Result> | undefined;

    constructor(nextHandler: Handler<Result> | undefined = undefined) {
        this._nextHandler = nextHandler;
    }

    public handle(request: HandlerRequest<any, any, any>): Result | undefined {
        if (this._nextHandler)
            return this._nextHandler.handle(request);
    }

    public getNext(): Handler<any> | undefined {
        return this._nextHandler;
    }

    public hasNext(): boolean {
        return this.getNext() !== undefined;
    }

    public setNext(handler: Handler<Result>): void {
        this._nextHandler = handler;
    }

}