import RequestHandler from "./RequestHandler";
import RequestHandlerAbstract from "./RequestHandlerAbstract.js";
import SemanticObjectRequest from "./SemanticObjectRequest";
import SemanticProperty from "./SemanticProperty";
import SemanticObjectDefault from "./SemanticObjectDefault";

type SemanticableObjectRequest = SemanticObjectRequest<any, void, void, void>;
type PayloadNameValue<T> = { name: string, value: T };
type PayloadNameNewOldValue<T> = { name: string, newValue: T, oldValue: T };

export default class SemanticObjectDefaultHandler extends RequestHandlerAbstract<SemanticableObjectRequest> {

    private _map: SemanticObjectDefault;

    constructor(map: SemanticObjectDefault, nextHandler: RequestHandler<SemanticableObjectRequest> | undefined = undefined) {
        super(nextHandler);
        this._map = map;
    }

    public getMap(): SemanticObjectDefault {
        return this._map;
    }

    private createCommand(request: SemanticableObjectRequest): SemanticObjectDefaultHandlerCommand {
        let command;
        switch (request.getIdentifier()) {
            case 'ADD':
                command = new SemanticObjectDefaultHandlerCommandAdd(this.getMap(), request);    
                break;
    
            case 'GET':
                command = new SemanticObjectDefaultHandlerCommandGet(this.getMap(), request);    
                break;
        
            case 'GET_ALL':
                command = new SemanticObjectDefaultHandlerCommandGetAll(this.getMap(), request);    
                break;
    
            case 'SET':
                command = new SemanticObjectDefaultHandlerCommandSet(this.getMap(), request);    
                break;
    
            case 'REMOVE':
                command = new SemanticObjectDefaultHandlerCommandRemove(this.getMap(), request);    
                break;
    
            default:
                throw new Error("Unable to create command for the request: unknown identifier.");
                break;
        }
        return command;
    }

    public handle<T>(request: SemanticableObjectRequest): T | T[] | undefined | void {
        super.handle(request);
        return this.createCommand(request)?.execute<T>();
    }

}

export abstract class SemanticObjectDefaultHandlerCommand {

    private _semanticObject: SemanticObjectDefault;
    private _request: SemanticableObjectRequest;

    public constructor(semanticObject: SemanticObjectDefault, request: SemanticableObjectRequest) {
        this._semanticObject = semanticObject;
        this._request = request;
    }

    public getSemanticObject(): SemanticObjectDefault {
        return this._semanticObject;
    }

    public getRequest(): SemanticableObjectRequest {
        return this._request;
    }

    public abstract execute<T>(): any;

}

export class SemanticObjectDefaultHandlerCommandAdd extends SemanticObjectDefaultHandlerCommand {

    public execute<T>(): void {
        const payload = <PayloadNameValue<T>> this.getRequest().getPayload();
        return this.getSemanticObject().add(payload.name, payload.value);
    }

}

export class SemanticObjectDefaultHandlerCommandGet extends SemanticObjectDefaultHandlerCommand {

    public execute<T>(): T | undefined {
        const result: SemanticProperty<any> | undefined = this.getSemanticObject().get(this.getRequest().getPayload());
        return result?.getValue();
    }

}

export class SemanticObjectDefaultHandlerCommandGetAll extends SemanticObjectDefaultHandlerCommand {

    public execute<T>(): T[] {
        const properties: SemanticProperty<any>[] = this.getSemanticObject().getAll(this.getRequest().getPayload());
        return properties.map((p: SemanticProperty<any>) => p.getValue());
    }

}

export class SemanticObjectDefaultHandlerCommandSet extends SemanticObjectDefaultHandlerCommand {

    public execute<T>(): void {
        const payload = <PayloadNameNewOldValue<T>> this.getRequest().getPayload();
        return this.getSemanticObject().set(payload.name, payload.newValue, payload.oldValue);
    }

}

export class SemanticObjectDefaultHandlerCommandRemove extends SemanticObjectDefaultHandlerCommand {

    public execute<T>(): void {
        const payload = <PayloadNameValue<T>> this.getRequest().getPayload();
        return this.getSemanticObject().unset(payload.name, payload.value);
    }

}