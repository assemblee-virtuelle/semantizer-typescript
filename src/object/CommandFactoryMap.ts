import AddCommand from "../command/AddCommand.js";
import Command from "../command/Command.js";
import GetCommand from "../command/GetCommand.js";
import RemoveCommand from "../command/RemoveCommand.js";
import SetCommand from "../command/SetCommand.js";
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

    public createCommandToAddSemanticProperty<T>(name: string, value: T): Command {
        return new AddCommand(this.getMap(), name, value!.toString());
    }

    public createCommandToGetSemanticProperty(name: string): Command {
        return new GetCommand(this.getMap(), name);
    }

    public createCommandToSetSemanticProperty<T>(name: string, value: T): Command {
        return new SetCommand(this.getMap(), name, value!.toString());
    }

    public createCommandToRemoveSemanticProperty<T>(name: string, value: T): Command {
        return new RemoveCommand(this.getMap(), name);
    }

}