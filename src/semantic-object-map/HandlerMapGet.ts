import HandlerRequest from "../core/HandlerRequest";
import HandlerMap from "./HandlerMap.js";

export default class HandlerMapGet extends HandlerMap {

    public handle<T>(request: HandlerRequest<any, any, any>): T;
    public handle<T>(request: HandlerRequest<any, any, any>): Promise<T>;
    public handle<T>(request: HandlerRequest<any, any, any>): T | undefined {
        if (request.isIdentifiedBy('GET')) {
            const result = this.getMap().get(request.getPayload());
            if (result)
                return result.value;
        }
        return super.handle(request);
    }

}