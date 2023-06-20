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

    private createCommand<T>(request: SemanticableObjectRequest): SemanticObjectDefaultHandlerCommand {
        let command, payload;
        switch (request.getIdentifier()) {
            case 'ADD':
                payload = <PayloadNameValue<T>> request.getPayload();
                command = new SemanticObjectDefaultHandlerCommandAdd(this.getMap(), payload.name, payload.value);    
                break;
    
            case 'GET':
                payload = <string> request.getPayload();
                command = new SemanticObjectDefaultHandlerCommandGet(this.getMap(), payload);    
                break;
        
            case 'GET_ALL':
                payload = <string> request.getPayload();
                command = new SemanticObjectDefaultHandlerCommandGetAll(this.getMap(), payload);    
                break;
    
            case 'SET':
                payload = <PayloadNameNewOldValue<T>> request.getPayload();
                command = new SemanticObjectDefaultHandlerCommandSet(this.getMap(), payload.name, payload.newValue, payload.oldValue);    
                break;
    
            case 'REMOVE':
                payload = <PayloadNameValue<T>> request.getPayload();
                command = new SemanticObjectDefaultHandlerCommandRemove(this.getMap(), payload.name, payload.value);    
                break;
    
            default:
                throw new Error("Unable to create command for the request: unknown identifier.");
                break;
        }
        return command;
    }

    public handle<T>(request: SemanticableObjectRequest): T | T[] | undefined | void {
        super.handle(request);
        return this.createCommand<T>(request)?.execute<T>();
    }

}

export abstract class SemanticObjectDefaultHandlerCommand {

    private _name: string;
    private _semanticObject: SemanticObjectDefault;

    public constructor(semanticObject: SemanticObjectDefault, name: string) {
        this._name = name;
        this._semanticObject = semanticObject;
    }

    public getSemanticObject(): SemanticObjectDefault {
        return this._semanticObject;
    }
    
    public getName(): string {
        return this._name;
    }

    public abstract execute<T>(): any;

}

export abstract class SemanticObjectDefaultHandlerCommandWithValue<T> extends SemanticObjectDefaultHandlerCommand {

    private _value: T;

    public constructor(semanticObject: SemanticObjectDefault, name: string, value: T) {
        super(semanticObject, name);
        this._value = value;
    }

    public getValue(): T {
        return this._value;
    }

}

export abstract class SemanticObjectDefaultHandlerCommandWithOldValue<T> extends SemanticObjectDefaultHandlerCommandWithValue<T> {

    private _oldValue: T;

    public constructor(semanticObject: SemanticObjectDefault, name: string, newValue: T, oldValue: T) {
        super(semanticObject, name, newValue);
        this._oldValue = oldValue;
    }

    public getOldValue(): T {
        return this._oldValue;
    }

}

export class SemanticObjectDefaultHandlerCommandAdd<T> extends SemanticObjectDefaultHandlerCommandWithValue<T> {

    public execute<T>(): void {
        return this.getSemanticObject().add(this.getName(), this.getValue());
    }

}

export class SemanticObjectDefaultHandlerCommandGet extends SemanticObjectDefaultHandlerCommand {

    public execute<T>(): T | undefined {
        return this.getSemanticObject().get(this.getName())?.getValue();
    }

}

export class SemanticObjectDefaultHandlerCommandGetAll extends SemanticObjectDefaultHandlerCommand {

    public execute<T>(): T[] {
        const properties: SemanticProperty<any>[] = this.getSemanticObject().getAll(this.getName());
        return properties.map((p: SemanticProperty<any>) => p.getValue());
    }

}

export class SemanticObjectDefaultHandlerCommandSet<T> extends SemanticObjectDefaultHandlerCommandWithOldValue<T> {

    public execute<T>(): void {
        return this.getSemanticObject().set(this.getName(), this.getValue(), this.getOldValue());
    }

}

export class SemanticObjectDefaultHandlerCommandRemove<T> extends SemanticObjectDefaultHandlerCommandWithValue<T> {

    public execute<T>(): void {
        return this.getSemanticObject().unset(this.getName(), this.getValue());
    }

}