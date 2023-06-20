import HandlerRequest from "./HandlerRequest";
import Semanticable from "./Semanticable";

export interface SemanticObjectRequest<Payload> extends HandlerRequest<string, string, Payload, Semanticable> {

    getIdentifier(): string;
    getOrigin(): Semanticable;
    getPayload(): Payload;
    isIdentifiedBy(identifier: string): boolean;

}