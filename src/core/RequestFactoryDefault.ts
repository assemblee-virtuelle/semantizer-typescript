import Request from "./Request";
import SemanticObjectRequestDefault from "./SemanticObjectRequestDefault.js";
import RequestFactory from "./RequestFactory";
import Semanticable from "./Semanticable";

type SemanticableDefault = Semanticable<void, void, void>;
type RequestWithPayload<Payload> = Request<string, string, Payload, SemanticableDefault>;
type PayloadNameValue<Value> = { name: string, value: Value };
type PayloadNameNewValue<Value> = { name: string, newValue: Value, oldValue: Value };

export default class RequestFactoryDefault implements RequestFactory<SemanticableDefault> {

    private _origin: SemanticableDefault;

    public constructor(origin: SemanticableDefault) {
        this._origin = origin;
    }

    public getOrigin(): SemanticableDefault {
        return this._origin;
    }

    public createPayloadNameValue<Value>(name: string, value: Value): PayloadNameValue<Value> {
        return { name: name, value: value };
    }

    public createPayloadNameNewValue<Value>(name: string, newValue: Value, oldValue: Value): PayloadNameNewValue<Value> {
        return { name: name, newValue: newValue, oldValue: oldValue };
    }

    public createDefaultRequest<Payload>(identifier: string, payload: Payload): RequestWithPayload<Payload> {
        return new SemanticObjectRequestDefault(identifier, payload, this.getOrigin());
    }

    public createRequestToAddSemanticProperty<Value>(name: string, value: Value): RequestWithPayload<PayloadNameValue<Value>> {
        return this.createDefaultRequest('ADD', this.createPayloadNameValue<Value>(name, value));
    }
    
    public createRequestToGetSemanticProperty<Value>(name: string): RequestWithPayload<string> {
        return this.createDefaultRequest('GET', name);
    }
    
    public createRequestToGetSemanticPropertyAll<Value>(name: string): RequestWithPayload<void> {
        return this.createDefaultRequest('GET_ALL', name);
    }
    
    public createRequestToSetSemanticProperty<Value>(name: string, newValue: Value, oldValue: Value): RequestWithPayload<PayloadNameNewValue<Value>> {
        return this.createDefaultRequest('SET', this.createPayloadNameNewValue<Value>(name, newValue, oldValue));
    }
    
    public createRequestToRemoveSemanticProperty<Value>(name: string, value: Value): RequestWithPayload<PayloadNameValue<Value>> {
        return this.createDefaultRequest('REMOVE', this.createPayloadNameValue<Value>(name, value));
    }
    
}