import Command from "../command/Command.js";
import CommandBase from "../command/CommandBase.js";
import CommandFactory from "../command/CommandFactory.js";
import SemanticObjectMap from "./SemanticObjectMap.js";

export default class CommandFactoryMap implements CommandFactory<string | undefined> {

    private _map: SemanticObjectMap;

    constructor(map: SemanticObjectMap) {
        this._map = map;
    }

    public getMap(): SemanticObjectMap {
        return this._map;
    }

    public createCommandToAddSemanticProperty<T>(name: string, value: T): Command<void> {
        return new CommandBase('ADD', () => this.getMap().set(name, value!.toString()));
    }

    public createCommandToGetSemanticProperty(name: string): Command<string | undefined> {
        return new CommandBase('GET', () => this.getMap().get(name));
    }

    public createCommandToSetSemanticProperty<T>(name: string, value: T): Command<void> {
        return new CommandBase('SET', () => this.getMap().set(name, value!.toString()));
    }

    public createCommandToRemoveSemanticProperty<T>(name: string, value: T): Command<void> {
        return new CommandBase('RMV', () => this.getMap().unset(name));
    }

}