import Request from "./Request";

type RequestWithOrigin<Origin> = Request<any, any, any, Origin>;

export default interface RequestFactory<Origin> {

    createRequestToAddSemanticProperty<Value>(name: string, value: Value): RequestWithOrigin<Origin>;
    createRequestToGetSemanticProperty<Value>(name: string): RequestWithOrigin<Origin>;
    createRequestToGetSemanticPropertyAll<Value>(name: string): RequestWithOrigin<Origin>;
    createRequestToSetSemanticProperty<Value>(name: string, newValue: Value, oldValue: Value): RequestWithOrigin<Origin>;
    createRequestToRemoveSemanticProperty<Value>(name: string, value: Value): RequestWithOrigin<Origin>;

}