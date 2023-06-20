import Handler from "../core/Handler";
import HandlerAbstract from "../core/HandlerAbstract.js";
export default class HandlerDefault<Request> extends HandlerAbstract<Request> {

    private _executor: Function;

    constructor(executor: (p: Request) => any, nextHandler: Handler<Request> | undefined = undefined) {
        super(nextHandler);
        this._executor = executor;
    }

    public handle<T>(request: Request): Promise<T>;
    public handle<T>(request: Request): T {
        super.handle(request);
        return this._executor(request);
    }

}