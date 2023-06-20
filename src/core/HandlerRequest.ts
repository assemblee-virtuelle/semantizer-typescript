import RequestHeaders from "./RequestHeaders";
export default interface HandlerRequest<HeaderKey, HeaderValue, Payload, Origin> {

    getHeader(key: HeaderKey): HeaderValue | undefined;
    getHeaders(): RequestHeaders<HeaderKey, HeaderValue>;
    getOrigin(): Origin;
    getPayload(): Payload;
    hasHeader(key: HeaderKey): boolean;

    //getIdentifier(): Identifier;
    //isIdentifiedBy(identifier: Identifier): boolean;
}