export default interface SemanticPropertyInterface<T> {
    
    getName(): string;
    getValue(): T;
    isReference(): boolean;
    
}