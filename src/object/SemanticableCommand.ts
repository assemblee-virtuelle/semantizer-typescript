export default interface SemanticableCommand<T> {

    getDate(): Date;
    getTarget(): T;
    execute(): void;
    
}