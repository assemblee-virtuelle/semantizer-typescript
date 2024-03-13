import RequestHandlerAbstract from "./RequestHandlerAbstract.js";
import SemanticObjectDefault from "./SemanticObjectDefault.js";
export default class HandlerTest extends RequestHandlerAbstract<SemanticObjectDefault, any, any> {
    handle<T>(input: any): void;
    handle<T>(input: any): Promise<void>;
}
//# sourceMappingURL=HandlerTest.d.ts.map