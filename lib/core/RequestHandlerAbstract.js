export default class RequestHandlerAbstract {
    constructor(param) {
        if (param instanceof RequestHandlerAbstract) {
            this._nextHandler = param;
            param.setPreviousHandler(this);
        }
        else
            this._handled = param;
    }
    getPreviousHandler() {
        return this._previousHandler;
    }
    setPreviousHandler(previousHandler) {
        this._previousHandler = previousHandler;
    }
    handle(request) {
        return this._nextHandler ? this._nextHandler.handle(request) : this.setOutput(request);
    }
    getOutput() {
        return this._output;
    }
    setOutput(output) {
        this._output = output;
        return output;
    }
    getHandled() {
        return this.hasNext() ? this.getNext().getHandled() : this._handled;
    }
    getNext() {
        return this._nextHandler;
    }
    hasNext() {
        return this.getNext() !== undefined;
    }
    setNext(handler) {
        this._nextHandler = handler;
    }
}
//# sourceMappingURL=RequestHandlerAbstract.js.map