import Command from "./Command";

export default interface CommandFactory<Result> {

    createCommandToAddSemanticProperty<Value>(name: string, value: Value): Command<void>;
    createCommandToGetSemanticProperty(name: string): Command<Result>;
    createCommandToSetSemanticProperty<Value>(name: string, value: Value): Command<void>;
    createCommandToRemoveSemanticProperty<Value>(name: string, value: Value): Command<void>;

}