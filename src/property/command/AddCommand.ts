import SemanticPropertyCommand from "./SemanticPropertyCommand";

export default class AddCommand<T> extends SemanticPropertyCommand<T> {
    
    constructor(property: T) {
        super(property)
    }
    
}