import Command from "./Command";

export default class CommandBase<T> implements Command<T> {

    private _name: string;
    private _execute: Function;

    public constructor(name: string, execute: () => T) {
        this._name = name;
        this._execute = execute;
    }

    public getName(): string {
        return this._name;
    }

    public execute(): T {
        return this._execute();
    }

}