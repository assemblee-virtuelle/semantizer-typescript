import Subscriber from "../notification/Subscriber";
import SemanticProperty from "./SemanticProperty";

export default class SemanticPropertyBase<T> implements SemanticProperty<T>, Subscriber {

    private name: string;
    private value: T;

    constructor(name: string, value: T) {
        this.name = name;
        this.value = value;
    }
    
    public getName(): string {
        return this.name;
    }
    
    public getValue(): T {
        return this.value;
    }
    
    public isReference(): boolean {
        return this.value instanceof URL;
    }
    
    public update(): void {
        throw new Error("Method not implemented.");
    }

}