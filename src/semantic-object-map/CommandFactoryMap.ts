import Command from "../core/Command.js";
import CommandBase from "../core/CommandBase.js";
import CommandFactory from "../core/CommandFactory.js";
import SemanticProperty from "../core/SemanticProperty.js";
import SemanticPropertyBase from "../core/SemanticPropertyBase.js";
import SemanticObjectMap from "./SemanticObjectMap.js";

export default class CommandFactoryMap implements CommandFactory<SemanticProperty<any> | undefined> {

    private _map: SemanticObjectMap;

    constructor(map: SemanticObjectMap) {
        this._map = map;
    }

    public getMap(): SemanticObjectMap {
        return this._map;
    }

    public createSemanticProperty<T>(name: string, value: T): SemanticProperty<T> {
        return new SemanticPropertyBase<T>(name, value);
    }

    public createCommandToAddSemanticProperty<T>(name: string, value: T): Command<void> {
        return new CommandBase('ADD', () => this.getMap().add(this.createSemanticProperty<T>(name, value)));
    }

    public createCommandToGetSemanticProperty(name: string): Command<SemanticProperty<any> | undefined> {
        return new CommandBase('GET', () => this.getMap().get(name)?.getValue());
    }

    public createCommandToGetSemanticPropertyAll(name: string): Command<Array<SemanticProperty<any>>> {
        return new CommandBase('GET_ALL', () => this.getMap().getAll(name).map((p: SemanticProperty<any>) => p.getValue()));
    }

    public createCommandToSetSemanticProperty<T>(name: string, oldValue: T, newValue: T): Command<void> {
        return new CommandBase('SET', () => this.getMap().set(name, oldValue, newValue));
    }

    public createCommandToRemoveSemanticProperty<T>(name: string, value: T): Command<void> {
        return new CommandBase('RMV', () => this.getMap().unset<T>(name, value));
    }

}