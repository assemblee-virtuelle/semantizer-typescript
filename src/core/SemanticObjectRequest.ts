import Request from "./Request";
import Semanticable from "./Semanticable";

export default interface SemanticObjectRequest<Payload, Add, Set, Remove> extends Request<string, string, Payload, Semanticable<Add, Set, Remove>> {

    getIdentifier(): string;
    getOrigin(): Semanticable<Add, Set, Remove>;
    getPayload(): Payload;
    isIdentifiedBy(identifier: string): boolean;

}