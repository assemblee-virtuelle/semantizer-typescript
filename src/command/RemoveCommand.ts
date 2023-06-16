import CommandWithTarget from "./CommandWithTarget.js";

export default class RemoveCommand<T> extends CommandWithTarget<T> {
    
    constructor(property: T) {
        super(property)
    }
    
}