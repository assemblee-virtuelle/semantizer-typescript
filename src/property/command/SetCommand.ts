import SemanticPropertyCommand from "./SemanticPropertyCommand.js";

export default class SetCommand<T> extends SemanticPropertyCommand<T> {
    
    constructor(property: T) {
        super(property)
    }
    
}