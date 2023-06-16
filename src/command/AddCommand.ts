import CommandWithTarget from "./CommandWithTarget.js";

export default class AddCommand<T> extends CommandWithTarget<T> {
    
    constructor(property: T) {
        super(property)
    }
    
}