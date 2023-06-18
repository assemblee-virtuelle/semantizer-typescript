import HandlerRequest from "../core/HandlerRequest";
import HandlerMap from "./HandlerMap.js";

export default class HandlerMapAddAsync extends HandlerMap {

    public async handle<T>(request: HandlerRequest<any, any, any>): Promise<T | undefined> {
        if (request.isIdentifiedBy('ADD')) {
            await new Promise(r => setTimeout(r, 2000));
            const payload = <{ name: string, value: string }> request.getPayload();
            this.getMap().add(payload.name, payload.value);
        }
        return super.handle(request);
    }

}