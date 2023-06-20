import Request from "./Request";
import Semanticable from "./Semanticable";

export interface SemanticObjectRequest<Payload> extends Request<string, string, Payload, Semanticable> {

    getIdentifier(): string;
    getOrigin(): Semanticable;
    getPayload(): Payload;
    isIdentifiedBy(identifier: string): boolean;

}