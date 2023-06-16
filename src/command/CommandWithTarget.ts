import Command from "./Command";

export default abstract class CommandWithTarget<T> implements Command {
    
    private target: T;
    private datetime: Date;

    constructor(property: T) {
        this.target = property;
        this.datetime = new Date();
    }

    public abstract getName(): string;

    public getDate(): Date {
        return this.datetime;
    }

    public getTarget(): T {
        return this.target;
    }

    public execute(): void {
        throw new Error("Method not implemented.");
    }
    
}