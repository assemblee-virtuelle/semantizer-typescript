import Handler from "../../core/Handler";
import Command from "../../core/Command";
import HandlerAbstract from "../../core/HandlerAbstract.js";
import HandlerFilterStrategy from "./HandlerFilterStrategy";

export default class HandlerFilter<T> extends HandlerAbstract<T> {

    private _strategy: HandlerFilterStrategy<T>;

    constructor(strategy: HandlerFilterStrategy<T>, nextHandler: Handler<T> | undefined = undefined) {
        super(nextHandler);
        this._strategy = strategy;
    }

    public getStrategy(): HandlerFilterStrategy<T> {
        return this._strategy;
    }

    public handle(command: Command<any>): T | undefined {
        super.handle(command);
        return this.getStrategy().filter(this, command);
    }

}