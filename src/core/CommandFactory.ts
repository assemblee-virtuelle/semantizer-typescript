import Command from "./Command";

export default interface CommandFactory<Origin, Result> {

    createCommandToAddSemanticProperty<Value>(name: string, value: Value): Command<Origin, void>;
    createCommandToGetSemanticProperty(name: string): Command<Origin, Result>;
    createCommandToGetSemanticPropertyAll(name: string): Command<Origin, Result[]>;
    createCommandToSetSemanticProperty<Value>(name: string,  oldValue: Value, newValue: Value): Command<Origin, void>;
    createCommandToRemoveSemanticProperty<Value>(name: string, value: Value): Command<Origin, void>;

}