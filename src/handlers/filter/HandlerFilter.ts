import Handler from "../../core/Handler";
import HandlerAbstract from "../../core/HandlerAbstract.js";
import HandlerFilterStrategy from "./HandlerFilterStrategy";
export default class HandlerFilter<Request> extends HandlerAbstract<Request> {

    private _strategy: HandlerFilterStrategy<Request>;

    constructor(strategy: HandlerFilterStrategy<Request>, nextHandler: Handler<Request> | undefined = undefined) {
        super(nextHandler);
        this._strategy = strategy;
    }

    public getStrategy(): HandlerFilterStrategy<Request> {
        return this._strategy;
    }

    public handle<T>(request: Request): T
    public handle<T>(request: Request): Promise<T | void>;
    public handle<T>(request: Request): T | undefined {
        if (this.getStrategy().accept(request))
            return super.handle(request);
    }

}