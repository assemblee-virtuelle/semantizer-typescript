import RequestHandler from "../core/RequestHandler";
import RequestHandlerAbstract from "../core/RequestHandlerAbstract.js";
import SemanticObjectRequest from "../core/SemanticObjectRequest";
import SemanticProperty from "../core/SemanticProperty";
import SemanticObjectMap from "./SemanticObjectMap";

type SemanticableObjectRequest = SemanticObjectRequest<any, void, void, void>;
type PayloadNameValue<T> = { name: string, value: T };
type PayloadNameNewOldValue<T> = { name: string, newValue: T, oldValue: T };

export default class HandlerMap extends RequestHandlerAbstract<SemanticableObjectRequest> {

    private _map: SemanticObjectMap;

    constructor(map: SemanticObjectMap, nextHandler: RequestHandler<SemanticableObjectRequest> | undefined = undefined) {
        super(nextHandler);
        this._map = map;
    }

    public getMap(): SemanticObjectMap {
        return this._map;
    }

    public handle<T>(request: SemanticableObjectRequest): T | T[] | undefined {
        this.handleAdd<T>(request);

        const get = this.handleGet<T | undefined>(request);
        if (get !== undefined)
            return get;

        const getAll = this.handleGetAll<T>(request);
        if (getAll !== undefined)
            return getAll;

        this.handleSet<T>(request);
        this.handleRemove(request);

        return super.handle(request);
    }

    private handleAdd<T>(request: SemanticableObjectRequest): void {
        if (request.isIdentifiedBy('ADD')) {
            const payload = <PayloadNameValue<T>> request.getPayload();
            this.getMap().add(payload.name, payload.value);
        }
    }

    private handleGet<T>(request: SemanticableObjectRequest): T | undefined {
        if (request.isIdentifiedBy('GET')) {
            const result: SemanticProperty<any> | undefined = this.getMap().get(request.getPayload());
            if (result)
                return result.getValue();
        }
    }

    private handleGetAll<T>(request: SemanticableObjectRequest): T[] | undefined {
        if (request.isIdentifiedBy('GET_ALL')) {
            const properties: SemanticProperty<any>[] = this.getMap().getAll(request.getPayload());
            return properties.map((p: SemanticProperty<any>) => p.getValue());
        }
    }

    private handleSet<T>(request: SemanticableObjectRequest): void {
        if (request.isIdentifiedBy('SET')) {
            const payload = <PayloadNameNewOldValue<T>> request.getPayload();
            this.getMap().set(payload.name, payload.newValue, payload.oldValue);
        }
    }

    private handleRemove<T>(request: SemanticableObjectRequest): void {
        if (request.isIdentifiedBy('REMOVE')) {
            const payload = <PayloadNameValue<T>> request.getPayload();
            this.getMap().unset(payload.name, payload.value);
        }
    }

}