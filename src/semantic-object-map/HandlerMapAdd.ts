import HandlerRequest from "../core/HandlerRequest";
import HandlerMap from "./HandlerMap.js";

export default class HandlerMapAdd extends HandlerMap<void> {

    public handle(request: HandlerRequest<any, any, any>): void {
        if (request.isIdentifiedBy('ADD')) {
            const payload = <{ name: string, value: string }> request.getPayload();
            this.getMap().add(payload.name, payload.value);
        }
        super.handle(request);
    }

}