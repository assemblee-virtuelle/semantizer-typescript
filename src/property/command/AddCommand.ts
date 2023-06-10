import SemanticableCommand from "../../object/SemanticableCommand";

export default class AddCommand<T> implements SemanticableCommand<T> {
    
    private property: T;
    private datetime: Date;

    constructor(property: T) {
        this.property = property;
        this.datetime = new Date();
    }

    public getDate(): Date {
        return this.datetime;
    }

    public getTarget(): T {
        return this.property;
    }

    public execute(): void {
        throw new Error("Method not implemented.");
    }
    
}