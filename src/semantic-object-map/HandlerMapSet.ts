import HandlerRequest from "../core/HandlerRequest";
import HandlerMap from "./HandlerMap.js";

type Payload = { name: string, newValue: string, oldValue: string };

export default class HandlerMapSet extends HandlerMap {

    public handle<T>(request: HandlerRequest<any, any, any>): T;
    public handle<T>(request: HandlerRequest<any, any, any>): Promise<T>;
    public handle<T>(request: HandlerRequest<any, any, any>): T | undefined {
        if (request.isIdentifiedBy('SET')) {
            const payload = <Payload> request.getPayload();
            this.getMap().set(payload.name, payload.newValue, payload.oldValue);
        }
        return super.handle(request);
    }

}