import SemanticPropertyCommand from "./SemanticPropertyCommand";

export default class SetCommand<T> extends SemanticPropertyCommand<T> {
    
    constructor(property: T) {
        super(property)
    }
    
}