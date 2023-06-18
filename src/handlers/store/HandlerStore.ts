import Handler from "../../core/Handler";
import HandlerAbstract from "../../core/HandlerAbstract.js";
import Semanticable from "../../core/Semanticable";
import HandlerRequest from "../../core/HandlerRequest";

export default class HandlerStore extends HandlerAbstract<void> {

    private _store: Array<Semanticable>;

    constructor(nextHandler: Handler<void> | undefined = undefined) {
        super(nextHandler);
        this._store = [];
    }

    public getStore(): Array<Semanticable> {
        return this._store;
    }
    
    public handle(request: HandlerRequest<any, any, any>): void {
        if (request.isIdentifiedBy("ADD")) {
            this.getStore().push(request.getOrigin());
        }
        super.handle(request);
    }

}