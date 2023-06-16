import Command from "../command/Command";

export default interface Handler<T> {

    handle(command: Command): T | undefined;
    setNext(handler: Handler<T>): void;

}