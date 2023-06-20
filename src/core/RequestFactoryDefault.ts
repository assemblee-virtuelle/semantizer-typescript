import HandlerRequest from "./HandlerRequest";
import SemanticObjectRequestDefault from "./SemanticObjectRequestDefault.js";
import RequestFactory from "./RequestFactory";
import Semanticable from "./Semanticable";

type Request<Payload> = HandlerRequest<string, string, Payload, Semanticable>;
type PayloadNameValue<Value> = { name: string, value: Value };
type PayloadNameNewValue<Value> = { name: string, newValue: Value, oldValue: Value };

export default class RequestFactoryDefault implements RequestFactory<Semanticable> {

    private _origin: Semanticable;

    public constructor(origin: Semanticable) {
        this._origin = origin;
    }

    public getOrigin(): Semanticable {
        return this._origin;
    }

    public createPayloadNameValue<Value>(name: string, value: Value): PayloadNameValue<Value> {
        return { name: name, value: value };
    }

    public createPayloadNameNewValue<Value>(name: string, newValue: Value, oldValue: Value): PayloadNameNewValue<Value> {
        return { name: name, newValue: newValue, oldValue: oldValue };
    }

    public createDefaultRequest<Payload>(identifier: string, payload: Payload): Request<Payload> {
        return new SemanticObjectRequestDefault(identifier, payload, this.getOrigin());
    }

    public createRequestToAddSemanticProperty<Value>(name: string, value: Value): Request<PayloadNameValue<Value>> {
        return this.createDefaultRequest('ADD', this.createPayloadNameValue<Value>(name, value));
    }
    
    public createRequestToGetSemanticProperty<Value>(name: string): Request<string> {
        return this.createDefaultRequest('GET', name);
    }
    
    public createRequestToGetSemanticPropertyAll<Value>(name: string): Request<void> {
        return this.createDefaultRequest('GET_ALL', name);
    }
    
    public createRequestToSetSemanticProperty<Value>(name: string, newValue: Value, oldValue: Value): Request<PayloadNameNewValue<Value>> {
        return this.createDefaultRequest('SET', this.createPayloadNameNewValue<Value>(name, newValue, oldValue));
    }
    
    public createRequestToRemoveSemanticProperty<Value>(name: string, value: Value): Request<PayloadNameValue<Value>> {
        return this.createDefaultRequest('REMOVE', this.createPayloadNameValue<Value>(name, value));
    }
    
}