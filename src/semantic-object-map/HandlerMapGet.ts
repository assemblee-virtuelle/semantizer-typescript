import HandlerRequest from "../core/HandlerRequest";
import HandlerMap from "./HandlerMap.js";

export default class HandlerMapGet extends HandlerMap {

    public handle(request: HandlerRequest<any, any, any>): any {
        if (request.isIdentifiedBy('GET')) {
            const result = this.getMap().get(request.getPayload());
            if (result)
                return result.value;
        }
        super.handle(request);
    }

}