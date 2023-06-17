import Command from "../command/Command.js";
import SemanticObjectMap from "./SemanticObjectMap.js";

export default class GetCommand implements Command {
    
    private _map: SemanticObjectMap;
    private _result: string;
    private _name: string;

    constructor(map: SemanticObjectMap, name: string) {
        this._map = map;
        this._result = "";
        this._name = name;
    }
    
    public getName(): string {
        return 'GET_SEMANTIC_PROPERTY';
    }

    public getPropertyName(): string {
        return this._name;
    }

    public getMap(): SemanticObjectMap {
        return this._map;
    }

    public getResult(): string {
        return this._result;
    }

    public execute(): void {
        this._result = this.getMap().get(this.getPropertyName());
    }

}