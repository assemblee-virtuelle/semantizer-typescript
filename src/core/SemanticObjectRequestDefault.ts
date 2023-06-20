import RequestHeaders from "./RequestHeaders";
import RequestHeadersDefault from "./RequestHeadersDefault";
import { SemanticObjectRequest } from "./SemanticObjectRequest";
import Semanticable from "./Semanticable";

export default class SemanticObjectRequestDefault<Payload, Add, Set, Remove> implements SemanticObjectRequest<Payload, Add, Set, Remove> {
    
    private _headers: RequestHeaders<string, string>;
    private _identifier: string;
    private _origin: Semanticable<Add, Set, Remove>;
    private _payload: Payload;

    public constructor(identifier: string, payload: Payload, origin: Semanticable<Add, Set, Remove>) {
        this._headers = new RequestHeadersDefault<string, string>();
        this._identifier = identifier;
        this._origin = origin;
        this._payload = payload;
    }

    public getHeader(key: string): string | undefined {
        return this.getHeaders().getValue(key);
    }

    public getHeaders(): RequestHeaders<string, string> {
        return this._headers;
    }

    public hasHeader(key: string): boolean {
        return this.getHeaders().has(key);
    }

    public getIdentifier(): string {
        return this._identifier;
    }

    public getOrigin(): Semanticable<Add, Set, Remove> {
        return this._origin;
    }

    public getPayload(): Payload {
        return this._payload;
    }

    public isIdentifiedBy(identifier: string): boolean {
        return this.getIdentifier() === identifier;
    }
    
}