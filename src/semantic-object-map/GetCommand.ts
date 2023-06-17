import Command from "../command/Command.js";
import CommandWithResultBase from "../command/CommandWithResultBase.js";
import SemanticObjectMap from "./SemanticObjectMap.js";

export default class GetCommand extends CommandWithResultBase<string> {
    
    private _map: SemanticObjectMap;
    private _name: string;

    constructor(map: SemanticObjectMap, name: string) {
        super();
        this._map = map;
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

    public execute(): void {
        this.setResult(this.getMap().get(this.getPropertyName()));
    }

}