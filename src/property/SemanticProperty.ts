import Subscriber from "../common/Subscriber";
import SemanticPropertyInterface from "./SemanticPropertyInterface";

export default class SemanticProperty<T> implements SemanticPropertyInterface<T>, Subscriber {

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