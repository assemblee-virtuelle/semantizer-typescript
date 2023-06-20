import RequestHandler from "./RequestHandler";
import RequestHandlerAbstract from "./RequestHandlerAbstract.js";

export default class HandlerDefault<Request> extends RequestHandlerAbstract<Request> {

    private _executor: Function;

    constructor(executor: (p: Request) => any, nextHandler: RequestHandler<Request> | undefined = undefined) {
        super(nextHandler);
        this._executor = executor;
    }

    public handle<T>(request: Request): Promise<T>;
    public handle<T>(request: Request): T {
        super.handle(request);
        return this._executor(request);
    }

}