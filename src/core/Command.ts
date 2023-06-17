export default interface Command<T> {

    getName(): string;
    execute(): T;

}