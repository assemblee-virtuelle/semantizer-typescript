export default interface SemanticProperty<T> {
    
    getName(): string;
    getValue(): T;
    isReference(): boolean;
    
}