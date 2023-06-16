import CommandWithTarget from "./CommandWithTarget.js";

export default class SetCommand<T> extends CommandWithTarget<T> {
    
    constructor(property: T) {
        super(property)
    }
    
}