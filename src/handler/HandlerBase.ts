import Handler from "./Handler";
import Command from "../command/Command";

export default abstract class HandlerBase<T> implements Handler<T> {

    private nextHandler: Handler<T> | undefined;

    constructor(nextHandler: Handler<T> | undefined = undefined) {
        this.nextHandler = nextHandler;
    }

    public handle(command: Command): T | undefined {
        if (this.nextHandler)
            return this.nextHandler.handle(command);
    }

    public setNext(handler: Handler<T>): void {
        this.nextHandler = handler;
    }

}