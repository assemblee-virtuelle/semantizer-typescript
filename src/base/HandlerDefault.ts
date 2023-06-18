import Handler from "../core/Handler";
import HandlerAbstract from "../core/HandlerAbstract.js";
import HandlerRequest from "../core/HandlerRequest";

export default class HandlerDefault<T> extends HandlerAbstract<T> {

    private _executor: Function;

    constructor(executor: (p: HandlerRequest<any, any, any>) => T | undefined, nextHandler: Handler<T> | undefined = undefined) {
        super(nextHandler);
        this._executor = executor;
    }

    public handle(request: HandlerRequest<any, any, any>): T | undefined {
        super.handle(request);
        return this._executor(request);
    }

}