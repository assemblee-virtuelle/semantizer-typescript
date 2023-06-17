import Handler from "../core/Handler";
import Command from "../core/Command";
import HandlerAbstract from "../core/HandlerAbstract.js";

export default class HandlerDefault<T> extends HandlerAbstract<T> {

    private _executor: Function;

    constructor(executor: (command: Command<any>) => T | undefined, nextHandler: Handler<T> | undefined = undefined) {
        super(nextHandler);
        this._executor = executor;
    }

    public handle(command: Command<any>): T | undefined {
        super.handle(command);
        return this._executor(command);
    }

}