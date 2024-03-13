import RequestHandlerAbstract from "../../core/RequestHandlerAbstract.js";
import Semanticable from "../../core/Semanticable";
export default class HandlerStore<Request, Add, Set, Remove> extends RequestHandlerAbstract<Array<Semanticable>, any, any> {
    handle<T>(request: Request): T | undefined;
    handle<T>(request: Request): Promise<T>;
}
//# sourceMappingURL=HandlerStore.d.ts.map