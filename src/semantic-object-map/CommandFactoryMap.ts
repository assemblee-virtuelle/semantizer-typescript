import Command from "../core/Command.js";
import CommandBase from "../base/CommandBase.js";
import CommandFactory from "../core/CommandFactory.js";
import SemanticProperty from "../core/SemanticProperty.js";
import SemanticPropertyBase from "../base/SemanticPropertyBase.js";
import SemanticObjectMap from "./SemanticObjectMap.js";
import Semanticable from "../core/Semanticable.js";

export default class CommandFactoryMap implements CommandFactory<Semanticable, SemanticProperty<any> | undefined> {

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

    public createCommandToAddSemanticProperty<T>(name: string, value: T): Command<Semanticable, void> {
        return new CommandBase(this.getMap(), 'ADD', () => this.getMap().add(this.createSemanticProperty<T>(name, value)));
    }

    public createCommandToGetSemanticProperty(name: string): Command<Semanticable, SemanticProperty<any> | undefined> {
        return new CommandBase(this.getMap(), 'GET', () => this.getMap().get(name)?.getValue());
    }

    public createCommandToGetSemanticPropertyAll(name: string): Command<Semanticable, Array<SemanticProperty<any>>> {
        return new CommandBase(this.getMap(), 'GET_ALL', () => this.getMap().getAll(name).map((p: SemanticProperty<any>) => p.getValue()));
    }

    public createCommandToSetSemanticProperty<T>(name: string, oldValue: T, newValue: T): Command<Semanticable, void> {
        return new CommandBase(this.getMap(), 'SET', () => this.getMap().set(name, oldValue, newValue));
    }

    public createCommandToRemoveSemanticProperty<T>(name: string, value: T): Command<Semanticable, void> {
        return new CommandBase(this.getMap(), 'RMV', () => this.getMap().unset<T>(name, value));
    }

}