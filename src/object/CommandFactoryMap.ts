import AddCommand from "../command/AddCommand.js";
import CommandWithTarget from "../command/CommandWithTarget.js";
import GetCommand from "../command/GetCommand.js";
import RemoveCommand from "../command/RemoveCommand.js";
import SetCommand from "../command/SetCommand.js";
import SemanticProperty from "../property/SemanticProperty.js";
import SemanticPropertyInterface from "../property/SemanticPropertyInterface";
import CommandFactory from "./CommandFactory";
import SemanticObjectMap from "./SemanticObjectMap.js";

export default class CommandFactoryMap implements CommandFactory {

    private _map: SemanticObjectMap;

    constructor(map: SemanticObjectMap) {
        this._map = map;
    }

    public getMap(): SemanticObjectMap {
        return this._map;
    }

    public createProperty(name: string, value: string): SemanticPropertyInterface<string> {
        return new SemanticProperty<string>(name, value);
    }

    // TODO: fix returning "any"
    public createCommandToAddSemanticProperty<T>(name: string, value: T): CommandWithTarget<SemanticPropertyInterface<any>> {
        const property = this.createProperty(name, value!.toString());
        return new AddCommand(this.getMap(), property);
    }

    public createCommandToGetSemanticProperty<T>(name: string): CommandWithTarget<SemanticPropertyInterface<any>> {
        const property = this.createProperty(name, '');
        return new GetCommand(this.getMap(), property);
    }

    public createCommandToSetSemanticProperty<T>(name: string, value: T): CommandWithTarget<SemanticPropertyInterface<any>> {
        const property = this.createProperty(name, value!.toString());
        return new SetCommand<typeof property>(property);
    }

    public createCommandToRemoveSemanticProperty<T>(name: string, value: T): CommandWithTarget<SemanticPropertyInterface<any>> {
        const property = this.createProperty(name, value!.toString());
        return new RemoveCommand<typeof property>(property);
    }

}