import Handler from "./Handler";
import HandlerRequest from "./HandlerRequest";

export default abstract class HandlerAbstract implements Handler {

    private _nextHandler: Handler | undefined;

    constructor(nextHandler: Handler | undefined = undefined) {
        this._nextHandler = nextHandler;
    }

    public handle<T>(request: HandlerRequest<any, any, any>): T | undefined {
        if (this._nextHandler)
            return this._nextHandler.handle(request);
    }

    public getNext(): Handler | undefined {
        return this._nextHandler;
    }

    public hasNext(): boolean {
        return this.getNext() !== undefined;
    }

    public setNext(handler: Handler): void {
        this._nextHandler = handler;
    }

}