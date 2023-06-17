import Handler from "../../core/Handler";
import Command from "../../core/Command";
import HandlerAbstract from "../../core/HandlerAbstract.js";
import Semanticable from "../../core/Semanticable";

export default class HandlerStore extends HandlerAbstract<void> {

    private _store: Array<Semanticable>;

    constructor(nextHandler: Handler<void> | undefined = undefined) {
        super(nextHandler);
        this._store = [];
    }

    public getStore(): Array<Semanticable> {
        return this._store;
    }

    public handle(command: Command<any, any>): void {
        this.getStore().push(command.getOrigin());
        super.handle(command);
        //return this.getStrategy().filter(this, command);
    }

}