import SemanticableCommand from "./SemanticableCommand";

export default class AddCommand<T> implements SemanticableCommand<T> {
    
    private property: T;

    constructor(property: T) {
        this.property = property;
    }

    public getTarget(): T {
        return this.property;
    }

    execute(): void {
        throw new Error("Method not implemented.");
    }
    
}