import RequestHandlerAbstract from "../../core/RequestHandlerAbstract.js";
import HandlerFilterStrategy from "./HandlerFilterStrategy";
export default class HandlerFilter<Request> extends RequestHandlerAbstract<HandlerFilterStrategy<Request>, any, any> {
    handle<T>(request: Request): T;
    handle<T>(request: Request): Promise<T | void>;
}
//# sourceMappingURL=HandlerFilter.d.ts.map