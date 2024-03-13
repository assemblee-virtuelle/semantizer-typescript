import RequestHandlerAbstract from "../../core/RequestHandlerAbstract.js";
export default class HandlerStore extends RequestHandlerAbstract {
    handle(request) {
        /*if (request.isIdentifiedBy("ADD")) {
            this.getStore().push(request.getOrigin());
        }*/
        return super.handle(request);
    }
}
//# sourceMappingURL=HandlerStore.js.map