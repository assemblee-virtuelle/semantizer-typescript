import Handler from "../../core/Handler";
import HandlerAbstract from "../../core/HandlerAbstract.js";
import Semanticable from "../../core/Semanticable";

export default class HandlerStore<Request> extends HandlerAbstract<Request> {

    private _store: Array<Semanticable>;

    constructor(nextHandler: Handler<Request> | undefined = undefined) {
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