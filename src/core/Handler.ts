import Command from "./Command";

export default interface Handler<T> {

    handle(command: Command<any>): T | undefined;
    getNext(): Handler<any> | undefined;
    hasNext(): boolean;
    setNext(handler: Handler<T>): void;

}