import RequestHandler from "../../core/RequestHandler";
import RequestHandlerAbstract from "../../core/RequestHandlerAbstract.js";
import Semanticable from "../../core/Semanticable";

export default class HandlerStore<Request> extends RequestHandlerAbstract<Request> {

    private _store: Array<Semanticable>;

    constructor(nextHandler: RequestHandler<Request> | undefined = undefined) {
        super(nextHandler);
        this._store = [];
    }

    public getStore(): Array<Semanticable> {
        return this._store;
    }
    
    public handle<T>(request: Request): T | undefined;
    public handle<T>(request: Request): Promise<T>;
    public handle<T>(request: Request): T | undefined {
        /*if (request.isIdentifiedBy("ADD")) {
            this.getStore().push(request.getOrigin());
        }*/
        return super.handle<T>(request);
    }

}