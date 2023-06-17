import Handler from "./Handler";
import Command from "./Command";

export default abstract class HandlerAbstract<T> implements Handler<T> {

    private _nextHandler: Handler<T> | undefined;

    constructor(nextHandler: Handler<T> | undefined = undefined) {
        this._nextHandler = nextHandler;
    }

    public handle(command: Command<any, any>): T | undefined {
        if (this._nextHandler)
            return this._nextHandler.handle(command);
    }

    public getNext(): Handler<any> | undefined {
        return this._nextHandler;
    }

    public hasNext(): boolean {
        return this.getNext() !== undefined;
    }

    public setNext(handler: Handler<T>): void {
        this._nextHandler = handler;
    }

}