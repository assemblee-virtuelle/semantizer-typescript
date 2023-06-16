import CommandWithTarget from "./CommandWithTarget.js";

export default class SetCommand<T> extends CommandWithTarget<T> {
    
    constructor(property: T) {
        super(property)
    }

    public getName(): string {
        return 'SET_SEMANTIC_PROPERTY';
    }
    
}