import SemanticPropertyCommand from "./SemanticPropertyCommand.js";

export default class AddCommand<T> extends SemanticPropertyCommand<T> {
    
    constructor(property: T) {
        super(property)
    }
    
}