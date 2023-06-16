import SemanticObjectMap from "../object/SemanticObjectMap.js";
import SemanticPropertyInterface from "../property/SemanticPropertyInterface.js";
import CommandWithTarget from "./CommandWithTarget.js";

export default class GetCommand extends CommandWithTarget<SemanticPropertyInterface<string>> {
    
    private _map: SemanticObjectMap;
    private _result: string;

    constructor(map: SemanticObjectMap, property: SemanticPropertyInterface<string>) {
        super(property);
        this._map = map;
        this._result = "";
    }
    
    public getName(): string {
        return 'GET_SEMANTIC_PROPERTY';
    }

    public getMap(): SemanticObjectMap {
        return this._map;
    }

    public getResult(): string {
        return this._result;
    }

    public execute(): void {
        this._result = this.getMap().get(this.getTarget().getName());
    }

}