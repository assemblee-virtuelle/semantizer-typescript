import Command from "./Command";

export default interface Handler<T> {

    handle(command: Command<any>): T | undefined;
    setNext(handler: Handler<T>): void;

}