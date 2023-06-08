export default interface SemanticableCommand<T> {

    getTarget(): T;
    execute(): void;
    
}