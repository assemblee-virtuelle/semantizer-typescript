import Command from "./Command";

export default interface CommandWithResult<T> extends Command {
    
    getResult(): T | undefined;
    
}