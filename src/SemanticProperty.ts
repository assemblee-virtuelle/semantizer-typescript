import SemanticPropertyInterface from "./SemanticPropertyInterface";

export default class SemanticProperty<T> implements SemanticPropertyInterface<T> {

    private name: string;
    private value: T;

    constructor(name: string, value: T) {
        this.name = name;
        this.value = value;
    }

    getName(): string {
        return this.name;
    }

    getValue(): T {
        return this.value;
    }

}