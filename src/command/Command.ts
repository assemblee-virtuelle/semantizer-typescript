export default interface Command<T> {

    getName(): string;
    //getDate(): Date;
    execute(): T;

}