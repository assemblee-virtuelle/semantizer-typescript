import HandlerRequest from "./HandlerRequest";

type Request<Origin> = HandlerRequest<any, any, Origin>;

export default interface RequestFactory<Origin> {

    createRequestToAddSemanticProperty<Value>(name: string, value: Value): Request<Origin>;
    createRequestToGetSemanticProperty<Value>(name: string): Request<Origin>;
    createRequestToGetSemanticPropertyAll<Value>(name: string): Request<Origin>;
    createRequestToSetSemanticProperty<Value>(name: string, newValue: Value, oldValue: Value): Request<Origin>;
    createRequestToRemoveSemanticProperty<Value>(name: string, value: Value): Request<Origin>;

}