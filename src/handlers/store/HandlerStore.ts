import Handler from "../../core/Handler";
import HandlerAbstract from "../../core/HandlerAbstract.js";
import Semanticable from "../../core/Semanticable";
import HandlerRequest from "../../core/HandlerRequest";

export default class HandlerStore extends HandlerAbstract {

    private _store: Array<Semanticable>;

    constructor(nextHandler: Handler | undefined = undefined) {
        super(nextHandler);
        this._store = [];
    }

    public getStore(): Array<Semanticable> {
        return this._store;
    }
    
    public handle<T>(request: HandlerRequest<any, any, any>): T | undefined {
        if (request.isIdentifiedBy("ADD")) {
            this.getStore().push(request.getOrigin());
        }
        return super.handle(request);
    }

}