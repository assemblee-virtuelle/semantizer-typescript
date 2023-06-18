import HandlerRequest from "./HandlerRequest";

export default class HandlerRequestDefault<Identifier, Payload, Origin> implements HandlerRequest<Identifier, Payload, Origin> {
    
    private _identifier: Identifier;
    private _origin: Origin;
    private _payload: Payload;

    public constructor(identifier: Identifier, payload: Payload, origin: Origin) {
        this._identifier = identifier;
        this._origin = origin;
        this._payload = payload;
    }

    public getIdentifier(): Identifier {
        return this._identifier;
    }

    public getOrigin(): Origin {
        return this._origin;
    }

    public getPayload(): Payload {
        return this._payload;
    }

    public isIdentifiedBy(identifier: Identifier): boolean {
        return this.getIdentifier() === identifier;
    }
    
}