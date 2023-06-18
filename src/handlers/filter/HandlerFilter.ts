import Handler from "../../core/Handler";
import HandlerAbstract from "../../core/HandlerAbstract.js";
import HandlerFilterStrategy from "./HandlerFilterStrategy";
import HandlerRequest from "../../core/HandlerRequest";

export default class HandlerFilter extends HandlerAbstract {

    private _strategy: HandlerFilterStrategy;

    constructor(strategy: HandlerFilterStrategy, nextHandler: Handler | undefined = undefined) {
        super(nextHandler);
        this._strategy = strategy;
    }

    public getStrategy(): HandlerFilterStrategy {
        return this._strategy;
    }

    public handle<T>(request: HandlerRequest<any, any, any>): T | undefined {
        if (this.getStrategy().accept(request))
            return super.handle(request);
    }

}