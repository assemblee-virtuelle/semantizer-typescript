import SemanticObjectMap from "../object/SemanticObjectMap.js";
import SemanticPropertyInterface from "../property/SemanticPropertyInterface.js";
import CommandWithTarget from "./CommandWithTarget.js";

export default class AddCommand extends CommandWithTarget<SemanticPropertyInterface<string>> {
    
    private _map: SemanticObjectMap;

    constructor(map: SemanticObjectMap, property: SemanticPropertyInterface<string>) {
        super(property);
        this._map = map;
    }
    
    public getName(): string {
        return 'ADD_SEMANTIC_PROPERTY';
    }

    public getMap(): SemanticObjectMap {
        return this._map;
    }

    public execute(): void {
        this.getMap().set(this.getTarget().getName(), this.getTarget().getValue());
    }

}