import SemanticPropertyCommand from "./SemanticPropertyCommand.js";

export default class RemoveCommand<T> extends SemanticPropertyCommand<T> {
    
    constructor(property: T) {
        super(property)
    }
    
}