export default interface Command {

    getName(): string;
    getDate(): Date;
    execute(): void;

}