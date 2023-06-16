import CommandWithTarget from "../command/CommandWithTarget";
import SemanticPropertyInterface from "../property/SemanticPropertyInterface";

export default interface CommandFactory {

    createCommandToAddSemanticProperty<T>(name: string, value: T): CommandWithTarget<SemanticPropertyInterface<T>>;
    createCommandToGetSemanticProperty<T>(name: string): CommandWithTarget<SemanticPropertyInterface<T>>;
    createCommandToSetSemanticProperty<T>(name: string, value: T): CommandWithTarget<SemanticPropertyInterface<T>>;
    createCommandToRemoveSemanticProperty<T>(name: string, value: T): CommandWithTarget<SemanticPropertyInterface<T>>;

}