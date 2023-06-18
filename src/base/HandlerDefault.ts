import Handler from "../core/Handler";
import HandlerAbstract from "../core/HandlerAbstract.js";
import HandlerRequest from "../core/HandlerRequest";

export default class HandlerDefault extends HandlerAbstract {

    private _executor: Function;

    constructor(executor: (p: HandlerRequest<any, any, any>) => any, nextHandler: Handler | undefined = undefined) {
        super(nextHandler);
        this._executor = executor;
    }

    public handle<T>(request: HandlerRequest<any, any, any>): T | undefined {
        super.handle(request);
        return this._executor(request);
    }

}