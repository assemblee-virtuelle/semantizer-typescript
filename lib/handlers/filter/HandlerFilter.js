import RequestHandlerAbstract from "../../core/RequestHandlerAbstract.js";
export default class HandlerFilter extends RequestHandlerAbstract {
    handle(request) {
        if (this.getHandled().accept(request))
            return super.handle(request);
    }
}
//# sourceMappingURL=HandlerFilter.js.map