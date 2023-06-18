import HandlerRequest from "../core/HandlerRequest";
import HandlerMap from "./HandlerMap.js";

export default class HandlerMapAdd extends HandlerMap {

    public handle<T>(request: HandlerRequest<any, any, any>): T | undefined {
        if (request.isIdentifiedBy('ADD')) {
            const payload = <{ name: string, value: string }> request.getPayload();
            this.getMap().add(payload.name, payload.value);
        }
        return super.handle(request);
    }

}