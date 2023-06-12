import SemanticPropertyCommand from "./SemanticPropertyCommand";

export default class RemoveCommand<T> extends SemanticPropertyCommand<T> {
    
    constructor(property: T) {
        super(property)
    }
    
}