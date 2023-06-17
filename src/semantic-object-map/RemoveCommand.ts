import Command from "../command/Command.js";
import SemanticObjectMap from "./SemanticObjectMap.js";

export default class RemoveCommand implements Command {
    
    private _map: SemanticObjectMap;
    private _name: string;

    constructor(map: SemanticObjectMap, name: string) {
        this._map = map;
        this._name = name;
    }
    
    public getName(): string {
        return 'REMOVE_SEMANTIC_PROPERTY';
    }

    public getPropertyName(): string {
        return this._name;
    }

    public getMap(): SemanticObjectMap {
        return this._map;
    }

    public execute(): void {
        this.getMap().unset(this.getPropertyName());
    }

}