import RequestHandlerAbstract from "./RequestHandlerAbstract.js";
export default class HandlerTest extends RequestHandlerAbstract {
    handle(input) {
        console.log(input);
        return super.handle(input);
    }
}
//# sourceMappingURL=HandlerTest.js.map