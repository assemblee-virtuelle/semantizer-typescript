import Command from "./Command.js";
import SemanticObjectMap from "../object/SemanticObjectMap.js";

export default class AddCommand implements Command {
    
    private _map: SemanticObjectMap;
    private _name: string;
    private _value: string;

    constructor(map: SemanticObjectMap, name: string, value: string) {
        this._map = map;
        this._name = name;
        this._value = value;
    }
    
    public getName(): string {
        return 'ADD_SEMANTIC_PROPERTY';
    }

    public getPropertyName(): string {
        return this._name;
    }

    public getPropertyValue(): string {
        return this._value;
    }

    public getMap(): SemanticObjectMap {
        return this._map;
    }

    public execute(): void {
        this.getMap().set(this.getPropertyName(), this.getPropertyValue());
    }

}