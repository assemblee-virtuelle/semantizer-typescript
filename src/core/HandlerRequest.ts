export default interface HandlerRequest<Identifier, Payload, Origin> {

    getIdentifier(): Identifier;
    getOrigin(): Origin;
    getPayload(): Payload;
    isIdentifiedBy(identifier: Identifier): boolean;

}