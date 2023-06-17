import Command from "./Command";

export default interface CommandFactory {

    createCommandToAddSemanticProperty<T>(name: string, value: T): Command;
    createCommandToGetSemanticProperty(name: string): Command;
    createCommandToSetSemanticProperty<T>(name: string, value: T): Command;
    createCommandToRemoveSemanticProperty<T>(name: string, value: T): Command;

}